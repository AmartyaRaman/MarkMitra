# 🧠 VedaAI — Academic Intelligence Platform

> A full-stack EdTech SaaS clone of [VedaAI](https://myvedaai.com) (incubated at NSRCEL, IIM Bangalore), built with the **PERN stack** (PostgreSQL, Express, React, Node.js), **Vite + Tailwind CSS**, and **Docker multi-stage builds**.

---

## 📸 Features

| Module | Description |
|---|---|
| 🔐 **Role-Based Auth** | JWT login for Admin / Teacher / Student |
| 📋 **Assessment Manager** | Create, track, and manage academic evaluations |
| 🤖 **AI Grader** | Upload answer sheets → auto-graded by Gemini 1.5 Flash |
| 📚 **Teacher's Toolkit** | AI-generated lesson plans, question papers, rubrics, worksheets |
| 📊 **Student Analytics** | Bar/Radar charts, at-risk alerts, performance tables |
| 🏛️ **Admin Panel** | Manage users, roles, and institutional settings |

---

## 🗂️ Project Structure

```
minor-project/
├── frontend/                   # React + Vite + Tailwind CSS
│   ├── src/
│   │   ├── components/         # Sidebar, Topbar
│   │   ├── contexts/           # AuthContext (JWT)
│   │   ├── layouts/            # AppLayout (shell)
│   │   ├── lib/                # Axios API instance
│   │   └── pages/              # Dashboard, Assessments, Grader, Toolkit, Analytics, Admin
│   ├── Dockerfile              # Multi-stage: Node builder → Nginx runner
│   └── nginx.conf              # SPA + API proxy config
│
├── backend/                    # Node.js + Express + PostgreSQL
│   ├── src/
│   │   ├── config/             # database.js, migrate.js
│   │   ├── middleware/         # auth.js, errorHandler.js
│   │   └── routes/             # auth, users, assessments, grader, ai, dashboard
│   ├── Dockerfile              # Multi-stage: deps → runner (non-root)
│   └── .env.example            # Environment template
│
├── docker-compose.yml          # Orchestrates postgres + backend + frontend
└── README.md
```

---

## 🚀 Quick Start

### Option A — Docker Compose (Recommended)

```bash
# 1. Clone and navigate
cd minor-project

# 2. Add your Gemini API key (optional, demo mode works without it)
echo "GEMINI_API_KEY=your_key_here" >> backend/.env

# 3. Start all services
docker compose up --build

# App: http://localhost:80
# API: http://localhost:5000/api/health
```

### Option B — Local Development

```bash
# Terminal 1: PostgreSQL (or use local install)
docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=postgres123 -e POSTGRES_DB=vedaai postgres:16-alpine

# Terminal 2: Backend
cd backend
cp .env.example .env        # Edit DB_HOST=localhost and add GEMINI_API_KEY
npm install
npm run dev                  # http://localhost:5000

# Terminal 3: Frontend
cd frontend
npm install
npm run dev                  # http://localhost:3000
```

---

## 🔑 Demo Accounts

| Role | Email | Password |
|---|---|---|
| Admin | admin@vedaai.in | admin123 |
| Teacher | teacher@vedaai.in | teacher123 |
| Student | student@vedaai.in | student123 |

---

## 🐳 Docker Architecture

```
                    ┌─────────────────────────────┐
                    │      docker-compose.yml      │
                    └──────────────┬──────────────┘
                                   │
              ┌────────────────────┼────────────────────┐
              │                    │                    │
    ┌─────────▼─────────┐ ┌───────▼────────┐ ┌────────▼────────┐
    │   postgres:16      │ │    backend     │ │    frontend     │
    │   (Alpine)         │ │  (Node Alpine) │ │ (Nginx Alpine)  │
    │   Port: 5432       │ │  Port: 5000    │ │  Port: 80       │
    │   Volume: pg_data  │ │  2-stage build │ │  2-stage build  │
    │   Healthcheck ✅   │ │  Non-root user │ │  Gzip + Cache   │
    └───────────────────┘ └────────────────┘ └────────────────-┘
              │                    │                    │
              └────────────────────┴────────────────────┘
                                vedaai-net (bridge)
```

### Multi-Stage Build Strategy
- **Frontend**: Stage 1 (Node 20 Alpine) → `npm run build` → Stage 2 (Nginx Alpine) serves `/dist`
- **Backend**: Stage 1 (Node 20 Alpine) → `npm ci --only=production` → Stage 2 (Node 20 Alpine) runs as `vedaai` non-root user

---

## 🤖 Gemini AI Integration

Set your API key in `backend/.env`:
```
GEMINI_API_KEY=your_key_from_aistudio.google.com
```

Features powered by Gemini 1.5 Flash:
- **AI Grader**: Vision API analyzes uploaded answer sheet images
- **Lesson Plans**: Curriculum-aligned, NEP 2020 ready
- **Question Papers**: Balanced MCQ + descriptive format  
- **Rubrics & Worksheets**: Structured markdown output

Without a key, the platform runs in **demo mode** with realistic mock responses.

---

## 📡 API Reference

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/login` | ❌ | Login → JWT |
| GET | `/api/auth/me` | ✅ | Current user |
| GET | `/api/assessments` | ✅ | List assessments |
| POST | `/api/assessments` | Teacher+ | Create assessment |
| POST | `/api/grader/analyze` | Teacher+ | AI grade answer sheet |
| POST | `/api/ai/generate` | Teacher+ | Generate content |
| GET | `/api/ai/library` | ✅ | User's content library |
| GET | `/api/users` | Admin | List all users |
| POST | `/api/users` | Admin | Create user |
| GET | `/api/dashboard/stats` | ✅ | KPI stats |
| GET | `/api/health` | ❌ | Health check |

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite 6, Tailwind CSS v4, React Router, TanStack Query, Recharts, Framer Motion, Lucide React
- **Backend**: Node.js 20, Express 4, PostgreSQL 16, bcryptjs, JWT, Multer, @google/generative-ai
- **DevOps**: Docker multi-stage builds, Docker Compose, Nginx

---

*Built as a minor project — inspired by VedaAI (NSRCEL, IIM Bangalore)*
