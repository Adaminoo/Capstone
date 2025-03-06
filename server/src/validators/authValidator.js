const { check, validationResult } = require('express-validator');

// Big Rules for siging up
const validateSignup = [
  check('username').notEmpty().withMessage('Username is required'),
  check('firstName').notEmpty().withMessage('First name is required'),
  check('lastName').notEmpty().withMessage('Last name is required'),
  check('email').isEmail().withMessage('Please provide a valid email address'),
  check('birthday').isDate().withMessage('Birthday is required'),
  check('password').notEmpty().withMessage('Password is required'),
  check('isAdmin').isBoolean().optional().default(false).withMessage('isAdmin must be a boolean')
];

// Resutls 
const handleValidationResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Goes to authroutes.js
module.exports = { validateSignup, handleValidationResult };
