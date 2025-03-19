const express = require("express");
const { login, signup } = require("../controllers/authController");
const {
  validateSignup,
  handleValidationResult,
} = require("../validators/authValidator");
const router = express.Router();

// Routes for login/signup
router.post("/login", login);
router.post("/signup", validateSignup, handleValidationResult, signup);


// Export to server.js
module.exports = router;
