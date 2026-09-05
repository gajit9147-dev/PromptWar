# PromptWar Backend API

Production-ready Node.js/Express backend server for **PromptWar** — an AI-powered platform for competitive prompt engineering, hackathon project scoring, and domain-specialized mentor guidance.

---

## Directory Structure

```
server/
│
├── src/
│   ├── controllers/
│   │   ├── projectController.js     # Project CRUD, score triggers & leaderboard
│   │   └── mentorController.js      # Mentor roster & consultation Q&A
│   │
│   ├── routes/
│   │   ├── projectRoutes.js         # /api/projects route definitions
│   │   └── mentorRoutes.js          # /api/mentors route definitions
│   │
│   ├── services/
│   │   ├── aiService.js             # Gemini AI integration + heuristic fallback engine
│   │   ├── scoringService.js        # Multi-dimensional scoring & badge algorithms
│   │   ├── projectService.js        # Repository and business logic
│   │   └── mentorService.js         # Mentor personas and contextual guidance
│   │
│   ├── middleware/
│   │   ├── rateLimiter.js           # API rate limiter & AI burst protection
│   │   ├── validation.js            # express-validator result runner
│   │   └── errorHandler.js          # Centralized error management
│   │
│   ├── validators/
│   │   └── projectValidator.js      # Schema validation rules
│   │
│   └── app.js                       # Express app configuration & middleware mounts
│
├── server.js                        # Server entry point & graceful shutdown
├── package.json                     # Dependencies and scripts
├── .env.example                     # Environment configuration template
└── README.md                        # Documentation
```

---

## Quick Start

### 1. Install Dependencies
```bash
cd server
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
PORT=5000
NODE_ENV=development
GEMINI_API_KEY=your_gemini_api_key_here # Optional: automatically falls back to offline heuristic engine
CORS_ORIGIN=*
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Run Automated Test Suite
```bash
npm test
```

---

## API Endpoints

### Health Check
- `GET /api/health` — Check server status, uptime, and service health.

### Projects (`/api/projects`)
- `GET /api/projects` — List all projects (supports query params `?search=...`, `?tag=...`, `?sortBy=score|newest|oldest`).
- `POST /api/projects` — Submit a new project and prompt (automatically evaluated and scored).
- `GET /api/projects/leaderboard` — Get top-ranked projects with badge breakdown (`?limit=10`).
- `GET /api/projects/:id` — Retrieve details, prompt, and score data for a specific project.
- `POST /api/projects/:id/score` — Trigger re-evaluation with optional `customCriteria: string[]`.

### Mentors (`/api/mentors`)
- `GET /api/mentors` — Get roster of 4 specialized mentors (`architect`, `promptCraft`, `pitchCoach`, `codeReviewer`).
- `POST /api/mentors/feedback` — Request tailored feedback on a project or prompt draft.
- `POST /api/mentors/:mentorType/chat` — Directly consult a specific mentor persona.

---

## Scoring Dimensions

Each project is evaluated across:
1. **Prompt Engineering (35%)**: Precision, constraints, few-shot examples, JSON adherence.
2. **Innovation (25%)**: Novelty and creativity of concept.
3. **Feasibility (20%)**: Practical implementation readiness.
4. **Technical Depth (10%)**: Architectural complexity.
5. **Clarity (10%)**: Specification and documentation quality.

Badges awarded include: `Prompt Maestro 🪄`, `Trailblazer 🚀`, `Rock Solid 🛡️`, `Deep Tech ⚙️`, and `Top Tier Finalist 🏆`.
