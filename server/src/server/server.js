const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const authRoutes = require("../routes/authRoutes");
const errorHandler = require("../middleware/errorMiddleware");
const profileRoutes = require("../routes/profileRoutes");
const courseRoutes = require("../routes/courseRoutes");
const adminRoutes = require("../routes/adminRoutes");

dotenv.config();

const app = express();

app.use(express.static(path.resolve(__dirname, "../../../client/dist")));


app.use(express.json());
// Sends index.html for any other route
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../../../client/dist/index.html"));
});
// Auth Routes
app.use("/api", authRoutes);

// Profile Routes
app.use("/api", profileRoutes);

//Course Routes
app.use("/api", courseRoutes);

// Error Middleware
app.use(errorHandler);

app.use("/admin", adminRoutes);

app.get("/api/message", (req, res) => {
  res.json({ message: "Hello from server!" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(__dirname)
});
