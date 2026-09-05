const rateLimit = require('express-rate-limit');

/**
 * Standard API rate limiter (100 requests per 15 minutes)
 */
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: {
      message: 'Too many requests from this IP, please try again after 15 minutes',
      statusCode: 429,
    },
  },
});

/**
 * Strict limiter for AI generation / scoring endpoints (20 requests per 5 minutes)
 */
const aiLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: {
      message: 'AI request limit reached. Please wait a few moments before trying again.',
      statusCode: 429,
    },
  },
});

module.exports = {
  apiLimiter,
  aiLimiter,
};
