const db = require("../config/db");

// Get all courses
const getCourses = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM courses");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: "Failed to retrieve courses" });
  }
};

// Add a new course
const addCourse = async (req, res) => {
  const { name, description } = req.body;
  try {
    const result = await db.query(
      "INSERT INTO courses (name, description) VALUES ($1, $2) RETURNING id",
      [name, description]
    );
    res.status(201).json({
      message: "Course added successfully",
      course_id: result.rows[0].id,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to add course" });
  }
};

// Update a course
const updateCourse = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const result = await db.query(
      "UPDATE courses SET name = $1, description = $2 WHERE user_id = $3 RETURNING *",
      [name, description, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json({
      message: "Course updated successfully",
      course: result.rows[0],
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to update course" });
  }
};

// Delete a course
const deleteCourse = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query("DELETE FROM courses WHERE id = $1", [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json({ message: "Course deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete course" });
  }
};

// Get all registered students
const getAllStudents = async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM users"
    );
    res.status(200).json(result.rows);
    console.log("Students fetched from DB:", result.rows);
  } catch (err) {
    console.error("Failed to retrieve students:", err);
    res.status(500).json({ message: "Failed to retrieve students" });
  }
};

module.exports = {
  getCourses,
  addCourse,
  updateCourse,
  deleteCourse,
  getAllStudents,
};
