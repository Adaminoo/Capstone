const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
const { hashPassword, comparePassword } = require("../utils/authUtils");
const { generateToken } = require("../utils/authUtils");

//THEY BOTH GO TO AUTHROUTES.js

// LOGIN ROUTE
// When logging in, it only checks for the usernmae and password.
exports.login = async (req, res) => {
  const { username, password } = req.body;

  const sql = "SELECT * FROM users WHERE username = $1";
  try {
    const result = await db.query(sql, [username]);
    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const user = result.rows[0];
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = generateToken(user.user_id); 
    console.log("Generated Token:", token);  // Debugging line
    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(500).json({ message: "Failed to log in" });
  }
};
// REGISTER ROUTE (POST)
// This is for basic signup, I will make another one for Admins signing up other Admins.
exports.signup = async (req, res) => {
  const { username, firstName, lastName, email, birthday, password, isAdmin } = req.body;

  // Validate fields
  if (!username || !firstName || !lastName || !email || !birthday || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check if username and email already exist
  const checkUsername = "SELECT * FROM users WHERE username = $1";
  const checkEmail = "SELECT * FROM users WHERE email = $1";

  try {
    const usernameResult = await db.query(checkUsername, [username]);
    if (usernameResult.rows.length > 0) {
      return res.status(400).json({ message: "Username is already taken" });
    }

    const emailResult = await db.query(checkEmail, [email]);
    if (emailResult.rows.length > 0) {
      return res.status(400).json({ message: "Email is already taken" });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    const sql = `
      INSERT INTO users (username, firstName, lastName, email, birthday, password, isAdmin) 
      VALUES ($1, $2, $3, $4, $5, $6, $7) 
      RETURNING user_id
    `;

    const result = await db.query(sql, [
      username,
      firstName,
      lastName,
      email,
      birthday,
      hashedPassword,
      isAdmin,
    ]);

    // Return the user_id (not just id)
    res.status(201).json({
      message: "User created successfully",
      user_id: result.rows[0].user_id, 
    });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ message: "Failed to create user" });
  }
};
