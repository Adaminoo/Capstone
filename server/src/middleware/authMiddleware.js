const jwt = require("jsonwebtoken");
const db = require("../config/db");

// Authentication middleware to check if user is logged in
const isAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Get token from Authorization header

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user_id = decoded.user_id; // Store user_id in request for later use
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token", error });
  }
};

// Admin middleware to check if the user is an admin
const isAdmin = async (req, res, next) => {
  const user_id = req.user_id;

  try {
    // Check if user is an admin
    const result = await db.query("SELECT isAdmin FROM users WHERE id = $1", [
      user_id,
    ]);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "User not found" });
    }

    const isAdmin = result.rows[0].isAdmin;

    if (!isAdmin) {
      return res.status(403).json({ message: "Access denied" });
    }

    next();
  } catch (error) {
    console.error("Error in admin middleware:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { isAuth, isAdmin };
