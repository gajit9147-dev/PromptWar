const { body, param } = require('express-validator');

/**
 * VentureMind student profile generation
 */
const createProjectRules = [
  body('skills')
    .optional()
    .isArray()
    .withMessage('Skills must be an array'),

  body('interests')
    .optional()
    .isArray()
    .withMessage('Interests must be an array'),

  body('experience')
    .optional()
    .isString()
    .isLength({ max: 100 })
    .withMessage('Experience must not exceed 100 characters'),

  body('domain')
    .optional()
    .isString()
    .isLength({ min: 2, max: 100 })
    .withMessage('Domain must be between 2 and 100 characters'),

  body('teamSize')
    .optional()
    .isString()
    .isLength({ max: 30 })
    .withMessage('Team size is invalid'),

  body('timeline')
    .optional()
    .isString()
    .isLength({ max: 50 })
    .withMessage('Timeline is invalid'),

  body('ambition')
    .optional()
    .isString()
    .isLength({ max: 100 })
    .withMessage('Ambition is invalid'),

  body('preferredTechnologies')
    .optional()
    .isArray()
    .withMessage('Preferred technologies must be an array'),

  /*
   * Backward compatibility:
   * Existing PromptWar project submissions can still use
   * title/description/prompt.
   */
  body('title')
    .optional()
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Title must be between 3 and 100 characters'),

  body('description')
    .optional()
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage(
      'Description must be between 10 and 2000 characters'
    ),

  body('prompt')
    .optional()
    .trim()
    .isLength({ min: 10, max: 5000 })
    .withMessage(
      'Prompt must be between 10 and 5000 characters'
    ),

  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array of strings'),

  body('repoUrl')
    .optional({ nullable: true })
    .trim()
    .isURL()
    .withMessage('Repository URL must be a valid URL'),

  body('demoUrl')
    .optional({ nullable: true })
    .trim()
    .isURL()
    .withMessage('Demo URL must be a valid URL'),

  body('author')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage(
      'Author name must not exceed 50 characters'
    ),
];

/**
 * Project scoring
 */
const scoreProjectRules = [
  param('id')
    .notEmpty()
    .withMessage('Project ID is required'),

  body('customCriteria')
    .optional()
    .isArray()
    .withMessage(
      'Custom criteria must be an array of criteria descriptions'
    ),
];

/**
 * Mentor feedback
 */
const mentorFeedbackRules = [
  body('projectId')
    .optional()
    .isString()
    .withMessage('Project ID must be a string'),

  body('question')
    .trim()
    .notEmpty()
    .withMessage(
      'A specific question or guidance query is required'
    )
    .isLength({ min: 5, max: 1000 })
    .withMessage(
      'Question must be between 5 and 1000 characters'
    ),

  body('mentorType')
    .optional()
    .isIn([
      'architect',
      'promptCraft',
      'pitchCoach',
      'codeReviewer',
    ])
    .withMessage(
      'Invalid mentorType. Must be one of: architect, promptCraft, pitchCoach, codeReviewer'
    ),

  body('context')
    .optional()
    .isObject()
    .withMessage(
      'Context must be an object containing project or prompt state'
    ),
];

module.exports = {
  createProjectRules,
  scoreProjectRules,
  mentorFeedbackRules,
};
