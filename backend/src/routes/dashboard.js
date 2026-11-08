const express = require('express');
const { pool } = require('../config/database');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// GET /api/dashboard/stats
router.get('/stats', authenticate, async (req, res, next) => {
  try {
    const [students, assessments, submissions, pending] = await Promise.all([
      pool.query("SELECT COUNT(*) FROM users WHERE role = 'student' AND is_active = true"),
      pool.query("SELECT COUNT(*) FROM assessments WHERE created_at > NOW() - INTERVAL '7 days'"),
      pool.query("SELECT ROUND(AVG(percentage), 1) as avg_score FROM submissions WHERE status = 'graded'"),
      pool.query("SELECT COUNT(*) FROM submissions WHERE status = 'pending'"),
    ]);

    res.json({
      totalStudents: parseInt(students.rows[0].count),
      assessmentsThisWeek: parseInt(assessments.rows[0].count),
      avgScore: parseFloat(submissions.rows[0].avg_score) || 0,
      pendingReviews: parseInt(pending.rows[0].count),
    });
  } catch (err) { next(err); }
});

module.exports = router;
