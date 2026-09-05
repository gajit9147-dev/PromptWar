const { validationResult } = require('express-validator');
const { AppError } = require('./errorHandler');

/**
 * Middleware to evaluate express-validator rules and abort on errors
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = errors.array().map((err) => ({
    field: err.path || err.param,
    message: err.msg,
    value: err.value,
  }));

  return next(new AppError('Validation failed', 400, extractedErrors));
};

module.exports = {
  validate,
};
