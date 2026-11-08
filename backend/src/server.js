require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

const { connectDB } = require('./config/database');
const { initDB } = require('./config/migrate');
const errorHandler = require('./middleware/errorHandler');

const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const assessmentsRouter = require('./routes/assessments');
const graderRouter = require('./routes/grader');
const aiRouter = require('./routes/ai');
const dashboardRouter = require('./routes/dashboard');

const app = express();
const PORT = process.env.PORT || 5000;

// Security
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));

// CORS
const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:3000').split(',');
app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
    cb(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));

// Body parsing
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('[:date[iso]] :method :url :status :response-time ms'));
}

// Static uploads
app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

// Health check
app.get('/api/health', (req, res) => res.json({
  status: 'ok',
  service: 'MarkMitra Backend',
  version: '1.0.0',
  timestamp: new Date().toISOString(),
}));

// Routes
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/assessments', assessmentsRouter);
app.use('/api/grader', graderRouter);
app.use('/api/ai', aiRouter);
app.use('/api/dashboard', dashboardRouter);

// 404
app.use((req, res) => res.status(404).json({ message: `Route ${req.method} ${req.path} not found` }));

// Error handler
app.use(errorHandler);

// Boot
const start = async () => {
  try {
    await connectDB();
    await initDB();
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`\n🧠 MarkMitra Backend running on http://0.0.0.0:${PORT}`);
      console.log(`   Environment: ${process.env.NODE_ENV}`);
      console.log(`   Gemini AI: ${process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here' ? '✅ Connected' : '⚠️  Not configured (demo mode)'}\n`);
    });
  } catch (err) {
    console.error('[Fatal]', err.message);
    process.exit(1);
  }
};

start();
