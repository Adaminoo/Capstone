const jwt = require("jsonwebtoken");
const db = require("../config/db");

const isAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Get token from Authorization header

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if decoded token contains user_id and attach it to request
    if (decoded && decoded.user_id) {
      req.user_id = decoded.user_id;
      console.log("Decoded Token:", decoded); 
      console.log("User ID from token:", req.user_id); 
      next();
    } else {
      return res.status(400).json({ message: "Invalid token structure (missing user_id)" });
    }
  } catch (error) {
    console.error("JWT Error:", error);
    return res.status(401).json({ message: "Invalid token", error: error.message });
  }
};

const isAdmin = async (req, res, next) => {
  const user_id = req.user_id;

  try {
    // Check if user is an admin
    const result = await db.query("SELECT isAdmin FROM users WHERE user_id = $1", [
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
