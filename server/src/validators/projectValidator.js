const { body, param, query } = require('express-validator');

const createProjectRules = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Project title is required')
    .isLength({ min: 3, max: 100 })
    .withMessage('Title must be between 3 and 100 characters'),

  body('description')
    .trim()
    .notEmpty()
    .withMessage('Project description is required')
    .isLength({ min: 10, max: 2000 })
    .withMessage('Description must be between 10 and 2000 characters'),

  body('prompt')
    .trim()
    .notEmpty()
    .withMessage('System/User prompt used for the project is required')
    .isLength({ min: 10, max: 5000 })
    .withMessage('Prompt must be between 10 and 5000 characters'),

  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array of strings'),

  body('repoUrl')
    .optional()
    .trim()
    .isURL()
    .withMessage('Repository URL must be a valid URL'),

  body('demoUrl')
    .optional()
    .trim()
    .isURL()
    .withMessage('Demo URL must be a valid URL'),

  body('author')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Author name must not exceed 50 characters'),
];

const scoreProjectRules = [
  param('id')
    .notEmpty()
    .withMessage('Project ID is required'),

  body('customCriteria')
    .optional()
    .isArray()
    .withMessage('Custom criteria must be an array of criteria descriptions'),
];

const mentorFeedbackRules = [
  body('projectId')
    .optional()
    .isString()
    .withMessage('Project ID must be a string'),

  body('question')
    .trim()
    .notEmpty()
    .withMessage('A specific question or guidance query is required')
    .isLength({ min: 5, max: 1000 })
    .withMessage('Question must be between 5 and 1000 characters'),

  body('mentorType')
    .optional()
    .isIn(['architect', 'promptCraft', 'pitchCoach', 'codeReviewer'])
    .withMessage('Invalid mentorType. Must be one of: architect, promptCraft, pitchCoach, codeReviewer'),

  body('context')
    .optional()
    .isObject()
    .withMessage('Context must be an object containing project or prompt state'),
];

module.exports = {
  createProjectRules,
  scoreProjectRules,
  mentorFeedbackRules,
};
