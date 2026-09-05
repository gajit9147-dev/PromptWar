const express = require('express');
const router = express.Router();
const mentorController = require('../controllers/mentorController');
const { mentorFeedbackRules } = require('../validators/projectValidator');
const { validate } = require('../middleware/validation');
const { aiLimiter } = require('../middleware/rateLimiter');

// List mentor roster
router.get('/', mentorController.getAvailableMentors);

// Request feedback on project or prompt draft
router.post('/feedback', aiLimiter, mentorFeedbackRules, validate, mentorController.getMentorFeedback);

// Direct consultation with a specific mentor persona
router.post('/:mentorType/chat', aiLimiter, mentorController.askMentorQuestion);
router.post('/:mentorType/ask', aiLimiter, mentorController.askMentorQuestion);

module.exports = router;
