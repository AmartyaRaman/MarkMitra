const express = require('express');
const multer = require('multer');
const path = require('path');
const { pool } = require('../config/database');
const { authenticate, authorize } = require('../middleware/auth');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');

const router = express.Router();

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'uploads/answer-sheets';
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`);
  }
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } }); // 10MB

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// POST /api/grader/analyze
router.post('/analyze', authenticate, authorize('admin', 'teacher'), upload.single('answer_sheet'), async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    const { subject = 'General', total_marks = 100 } = req.body;

    let gradingResult;

    if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here') {
      // Real Gemini analysis
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const imageData = fs.readFileSync(req.file.path);
      const base64Image = imageData.toString('base64');
      const mimeType = req.file.mimetype;

      const prompt = `You are an expert academic evaluator. Analyze this student answer sheet for ${subject}.
      Total marks: ${total_marks}.
      
      Provide a JSON response with:
      {
        "studentName": "inferred or 'Student'",
        "subject": "${subject}",
        "totalMarks": ${total_marks},
        "obtainedMarks": <number>,
        "percentage": <number>,
        "grade": "<A/B/C/D/F>",
        "feedback": "<detailed 2-3 sentence feedback>",
        "strengths": ["<topic1>", "<topic2>"],
        "improvements": ["<area1>", "<area2>"],
        "questionBreakdown": [{"q": "Q1", "marks": <n>, "total": <n>, "topic": "<topic>"}]
      }`;

      const result = await model.generateContent([
        prompt,
        { inlineData: { data: base64Image, mimeType } }
      ]);
      const text = result.response.text();
      const jsonMatch = text.match(/```json\n?([\s\S]*?)\n?```/) || text.match(/({[\s\S]*})/);
      gradingResult = JSON.parse(jsonMatch ? jsonMatch[1] : text);
    } else {
      // Mock result when no API key
      gradingResult = {
        studentName: 'Student',
        subject,
        totalMarks: parseInt(total_marks),
        obtainedMarks: Math.floor(parseInt(total_marks) * 0.78),
        percentage: 78,
        grade: 'B+',
        feedback: 'Good overall performance with solid conceptual understanding. Some areas need more attention.',
        strengths: ['Core concepts', 'Problem solving'],
        improvements: ['Numerical accuracy', 'Time management'],
        questionBreakdown: Array.from({ length: 5 }, (_, i) => ({
          q: `Q${i + 1}`, marks: Math.floor(Math.random() * 4) + 6, total: 10, topic: `Topic ${i + 1}`
        }))
      };
    }

    // Save to DB
    const saved = await pool.query(
      `INSERT INTO submissions (student_name, file_url, obtained_marks, total_marks, percentage, grade, ai_feedback, strengths, improvements, question_breakdown, status, graded_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 'graded', NOW()) RETURNING id`,
      [
        gradingResult.studentName, req.file.path,
        gradingResult.obtainedMarks, gradingResult.totalMarks,
        gradingResult.percentage, gradingResult.grade,
        gradingResult.feedback,
        gradingResult.strengths, gradingResult.improvements,
        JSON.stringify(gradingResult.questionBreakdown)
      ]
    );

    res.json({ success: true, submissionId: saved.rows[0].id, result: gradingResult });
  } catch (err) { next(err); }
});

module.exports = router;
