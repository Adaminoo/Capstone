const jwt = require("jsonwebtoken");
const db = require("../config/db");

const isAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user_id = decoded.user_id;

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
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = isAdmin;
