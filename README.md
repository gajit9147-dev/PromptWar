# PromptWar ⚔️🤖

PromptWar is an AI-powered platform for competitive prompt engineering, hackathon project scoring, and domain-specialized mentor guidance.

## Architecture

- **`client/`**: Modern React + Vite frontend interface featuring glassmorphic UI, real-time leaderboard, project submission forms, and mentor consultation panels.
- **`server/`**: Robust Node.js & Express REST API powered by Google Gemini AI with heuristic fallback scoring, rate limiting, and project analytics.

## Getting Started

### Prerequisites
- Node.js (v18 or newer recommended)
- npm or yarn

### 1. Server Setup
```bash
cd server
npm install
cp .env.example .env
npm run dev
```
The server runs by default on `http://localhost:5000`.

### 2. Client Setup
```bash
cd client
npm install
npm run dev
```
The client runs by default on `http://localhost:5173`.
