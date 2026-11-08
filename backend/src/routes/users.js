const express = require('express');
const bcrypt = require('bcryptjs');
const { pool } = require('../config/database');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

// GET /api/users — Admin only
router.get('/', authenticate, authorize('admin'), async (req, res, next) => {
  try {
    const result = await pool.query(
      'SELECT id, name, email, role, institution, is_active, created_at FROM users ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (err) { next(err); }
});

// POST /api/users — Admin only
router.post('/', authenticate, authorize('admin'), async (req, res, next) => {
  try {
    const { name, email, password, role, institution } = req.body;
    if (!name || !email || !password || !role) return res.status(400).json({ message: 'All fields required' });
    const hash = await bcrypt.hash(password, 12);
    const result = await pool.query(
      'INSERT INTO users (name, email, password_hash, role, institution) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, role, institution',
      [name, email.toLowerCase(), hash, role, institution]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    if (err.code === '23505') return res.status(409).json({ message: 'Email already exists' });
    next(err);
  }
});

// DELETE /api/users/:id — Admin only
router.delete('/:id', authenticate, authorize('admin'), async (req, res, next) => {
  try {
    await pool.query('UPDATE users SET is_active = false WHERE id = $1', [req.params.id]);
    res.json({ message: 'User deactivated' });
  } catch (err) { next(err); }
});

module.exports = router;
