const express = require('express');
const { pool } = require('../config/database');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

// GET /api/assessments
router.get('/', authenticate, async (req, res, next) => {
  try {
    const result = await pool.query(
      `SELECT a.*, u.name as created_by_name,
              COUNT(s.id)::int as submissions
       FROM assessments a
       LEFT JOIN users u ON a.created_by = u.id
       LEFT JOIN submissions s ON a.id = s.assessment_id
       GROUP BY a.id, u.name
       ORDER BY a.created_at DESC`
    );
    res.json(result.rows);
  } catch (err) { next(err); }
});

// POST /api/assessments
router.post('/', authenticate, authorize('admin', 'teacher'), async (req, res, next) => {
  try {
    const { title, subject, class: cls, total_marks, due_date, instructions } = req.body;
    if (!title || !subject || !cls) return res.status(400).json({ message: 'Title, subject, and class are required' });
    const result = await pool.query(
      `INSERT INTO assessments (title, subject, class, total_marks, due_date, instructions, created_by)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [title, subject, cls, total_marks || 100, due_date || null, instructions || null, req.user.id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) { next(err); }
});

// PATCH /api/assessments/:id/status
router.patch('/:id/status', authenticate, authorize('admin', 'teacher'), async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!['draft', 'active', 'graded'].includes(status)) return res.status(400).json({ message: 'Invalid status' });
    const result = await pool.query(
      'UPDATE assessments SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
      [status, req.params.id]
    );
    if (!result.rows[0]) return res.status(404).json({ message: 'Assessment not found' });
    res.json(result.rows[0]);
  } catch (err) { next(err); }
});

// DELETE /api/assessments/:id
router.delete('/:id', authenticate, authorize('admin'), async (req, res, next) => {
  try {
    await pool.query('DELETE FROM assessments WHERE id = $1', [req.params.id]);
    res.json({ message: 'Assessment deleted' });
  } catch (err) { next(err); }
});

module.exports = router;
