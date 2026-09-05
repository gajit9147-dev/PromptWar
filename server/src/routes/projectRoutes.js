const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { createProjectRules, scoreProjectRules } = require('../validators/projectValidator');
const { validate } = require('../middleware/validation');
const { aiLimiter } = require('../middleware/rateLimiter');

// List projects & Leaderboard
router.get('/', projectController.getProjects);
router.get('/leaderboard', projectController.getLeaderboard);

// Create new project
router.post('/', aiLimiter, createProjectRules, validate, projectController.createProject);

// Single project operations
router.get('/:id', projectController.getProjectById);
router.post('/:id/score', aiLimiter, scoreProjectRules, validate, projectController.scoreProject);

module.exports = router;
