const jwt = require("jsonwebtoken");
const db = require("../config/db");

const isAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);

    const user_id = decoded.user_id;

    // Query the database to check if the user is an admin
    const result = await db.query(
      "SELECT isadmin FROM users WHERE user_id = $1",
      [user_id]
    );

    console.log("Database query result:", result.rows);
    console.log("Checking exact key for isadmin:", result.rows[0]);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "User not found" });
    }

    const userIsAdmin = result.rows[0]["isadmin"];
    console.log("User admin status from DB:", userIsAdmin);

    if (!userIsAdmin) {
      return res.status(403).json({ message: "Access denied" });
    }

    next();
  } catch (error) {
    console.error("Error in admin middleware:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = {
  isAdmin,
};
