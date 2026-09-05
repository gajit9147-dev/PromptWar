const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const { apiLimiter } = require('./middleware/rateLimiter');
const { errorHandler, AppError } = require('./middleware/errorHandler');

const projectRoutes = require('./routes/projectRoutes');
const mentorRoutes = require('./routes/mentorRoutes');

const app = express();

/* =========================================================
   SECURITY
========================================================= */

app.disable('x-powered-by');

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

/* =========================================================
   CORS
========================================================= */

const allowedOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173';

app.use(
  cors({
    origin: allowedOrigin === '*' ? true : allowedOrigin,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: allowedOrigin !== '*',
  })
);

/* =========================================================
   LOGGING
========================================================= */

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

/* =========================================================
   BODY PARSING
========================================================= */

app.use(
  express.json({
    limit: '1mb',
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: '1mb',
  })
);

/* =========================================================
   API RATE LIMITING
========================================================= */

app.use('/api', apiLimiter);

/* =========================================================
   HEALTH CHECK
========================================================= */

app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    service: 'venturemind-api',
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: Math.round(process.uptime()),
  });
});

/* =========================================================
   API ROUTES
========================================================= */

// Project generation / adaptation
app.use('/api/projects', projectRoutes);

// AI Mentor
app.use('/api/mentor', mentorRoutes);

/* =========================================================
   API 404 HANDLER
========================================================= */

app.use('/api', (req, res, next) => {
  next(
    new AppError(
      `API endpoint not found: ${req.method} ${req.originalUrl}`,
      404
    )
  );
});

/* =========================================================
   GLOBAL 404 HANDLER
========================================================= */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    path: req.originalUrl,
    method: req.method,
  });
});

/* =========================================================
   CENTRALIZED ERROR HANDLER
========================================================= */

app.use(errorHandler);

module.exports = app;