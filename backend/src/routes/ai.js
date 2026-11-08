const express = require('express');
const { pool } = require('../config/database');
const { authenticate, authorize } = require('../middleware/auth');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const promptTemplates = {
  lesson_plan: (subject, grade, topic) => `
You are an expert curriculum designer aligned with CBSE/NEP 2020 standards.
Create a detailed lesson plan for:
- Subject: ${subject}
- Grade: ${grade}
- Topic: ${topic}

Format in markdown with sections: Learning Objectives, Introduction, Main Content (with timing), Assessment Activities, Homework.
Make it practical and engaging for Indian classroom contexts.`,

  question_paper: (subject, grade, topic) => `
Create a balanced question paper for:
- Subject: ${subject}  
- Grade: ${grade}
- Topic: ${topic}

Include: Section A (MCQs, 1 mark each), Section B (Short answers, 3 marks), Section C (Long answers, 10 marks).
Total should be 100 marks. Format clearly in markdown.`,

  rubric: (subject, grade, topic) => `
Create a detailed grading rubric for evaluating ${grade} ${subject} answers on "${topic}".
Include criteria: Understanding, Application, Analysis, Communication.
Format as a markdown table with 4 levels: Excellent (90-100%), Good (75-89%), Average (60-74%), Needs Work (<60%).`,

  worksheet: (subject, grade, topic) => `
Create an engaging practice worksheet for ${grade} students on "${topic}" in ${subject}.
Include: warm-up questions, concept practice, problem-solving, and reflection questions.
Provide answers at the end. Format in markdown.`,
};

// POST /api/ai/generate
router.post('/generate', authenticate, authorize('admin', 'teacher'), async (req, res, next) => {
  try {
    const { type, subject, grade, topic } = req.body;
    if (!type || !subject || !topic) return res.status(400).json({ message: 'type, subject, and topic are required' });
    if (!promptTemplates[type]) return res.status(400).json({ message: 'Invalid generation type' });

    const prompt = promptTemplates[type](subject, grade || 'appropriate', topic);
    let content;

    if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here') {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const result = await model.generateContent(prompt);
      content = result.response.text();
    } else {
      content = `# ${type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}: ${topic}\n\n**Subject:** ${subject} | **Grade:** ${grade}\n\n> ⚠️ Demo mode: Set GEMINI_API_KEY in backend .env for real AI-generated content.\n\nThis is where Gemini AI would generate rich, curriculum-aligned ${type.replace('_', ' ')} content for "${topic}".`;
    }

    // Save to library
    await pool.query(
      'INSERT INTO ai_content (type, subject, grade, topic, content, created_by) VALUES ($1, $2, $3, $4, $5, $6)',
      [type, subject, grade, topic, content, req.user.id]
    );

    res.json({ success: true, content });
  } catch (err) { next(err); }
});

// GET /api/ai/library — User's generated content
router.get('/library', authenticate, async (req, res, next) => {
  try {
    const result = await pool.query(
      'SELECT id, type, subject, grade, topic, created_at FROM ai_content WHERE created_by = $1 ORDER BY created_at DESC LIMIT 50',
      [req.user.id]
    );
    res.json(result.rows);
  } catch (err) { next(err); }
});

module.exports = router;
