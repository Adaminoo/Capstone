const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

// Hash pass
async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

// Compare pass
async function comparePassword(password, hash) {
  const isMatch = await bcrypt.compare(password, hash);
  return isMatch;
}

// Generate Token
function generateToken(user_id) {
  return jwt.sign({ user_id }, process.env.JWT_SECRET, { expiresIn: "1h" });
}

// Goes to authController.js
module.exports = { hashPassword, comparePassword, generateToken };
