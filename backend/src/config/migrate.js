const { pool } = require('../config/database');

const initDB = async () => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Users table
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(20) CHECK (role IN ('admin', 'teacher', 'student')) NOT NULL DEFAULT 'student',
        institution VARCHAR(255),
        avatar_url TEXT,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);

    // Assessments
    await client.query(`
      CREATE TABLE IF NOT EXISTS assessments (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(255) NOT NULL,
        subject VARCHAR(100) NOT NULL,
        class VARCHAR(50) NOT NULL,
        total_marks INTEGER NOT NULL DEFAULT 100,
        due_date DATE,
        status VARCHAR(20) CHECK (status IN ('draft', 'active', 'graded')) DEFAULT 'draft',
        created_by UUID REFERENCES users(id) ON DELETE SET NULL,
        instructions TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);

    // Submissions / Grading Results
    await client.query(`
      CREATE TABLE IF NOT EXISTS submissions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        assessment_id UUID REFERENCES assessments(id) ON DELETE CASCADE,
        student_id UUID REFERENCES users(id) ON DELETE SET NULL,
        student_name VARCHAR(255),
        file_url TEXT,
        obtained_marks INTEGER,
        total_marks INTEGER,
        percentage DECIMAL(5,2),
        grade VARCHAR(5),
        ai_feedback TEXT,
        strengths TEXT[],
        improvements TEXT[],
        question_breakdown JSONB,
        status VARCHAR(20) DEFAULT 'pending',
        approved_by UUID REFERENCES users(id),
        submitted_at TIMESTAMPTZ DEFAULT NOW(),
        graded_at TIMESTAMPTZ
      );
    `);

    // AI Generated Content Library
    await client.query(`
      CREATE TABLE IF NOT EXISTS ai_content (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        type VARCHAR(50) NOT NULL,
        subject VARCHAR(100),
        grade VARCHAR(50),
        topic TEXT,
        content TEXT NOT NULL,
        created_by UUID REFERENCES users(id) ON DELETE SET NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);

    await client.query('COMMIT');
    console.log('[DB] Tables initialized successfully');

    // Seed demo users
    await seedDemoUsers();
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('[DB] Migration failed:', err.message);
    throw err;
  } finally {
    client.release();
  }
};

const seedDemoUsers = async () => {
  const bcrypt = require('bcryptjs');

  const demoUsers = [
    { name: 'Dr. Ramesh Kumar', email: 'admin@markmitra.in', password: 'admin123', role: 'admin', institution: 'MAIT, Rohini' },
    { name: 'Mrs. Ananya Singh', email: 'teacher@markmitra.in', password: 'teacher123', role: 'teacher', institution: 'MAIT, Rohini' },
    { name: 'Arjun Sharma', email: 'student@markmitra.in', password: 'student123', role: 'student', institution: 'MAIT, Rohini' },
  ];

  for (const u of demoUsers) {
    const existing = await pool.query('SELECT id FROM users WHERE email = $1', [u.email]);
    if (existing.rows.length === 0) {
      const hash = await bcrypt.hash(u.password, 12);
      await pool.query(
        'INSERT INTO users (name, email, password_hash, role, institution) VALUES ($1, $2, $3, $4, $5)',
        [u.name, u.email, hash, u.role, u.institution]
      );
      console.log(`[Seed] Created ${u.role}: ${u.email}`);
    }
  }
};

module.exports = { initDB };
