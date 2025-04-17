const db = require("../config/db");

// Helper functions to check if a user or course exists, and if the user is already registered
const checkUserExists = async (user_id) => {
  const userQuery = "SELECT * FROM users WHERE user_id = $1";
  const result = await db.query(userQuery, [user_id]);
  return result.rowCount > 0;
};

const checkCourseExists = async (course_id) => {
  const courseQuery = "SELECT * FROM courses WHERE course_id = $1";
  const result = await db.query(courseQuery, [course_id]);
  return result.rowCount > 0;
};

const checkUserRegistration = async (user_id, course_id) => {
  const checkQuery =
    "SELECT COUNT(*) FROM user_courses WHERE user_id = $1 AND course_id = $2";
  const result = await db.query(checkQuery, [user_id, course_id]);
  return result.rows[0].count > 0;
};

const getAllCourses = async (req, res) => {
  const query = `
  SELECT * FROM courses`;
  try {
    const result = await db.query(query)
    res.json(result.rows);
  } catch (err) {
    console.error("Error in getAllCourses: ", err);
    return res.status(500).json({ message: "Database error"});
  }
}

// Get courses for the authenticated user
const getCoursesForUser = async (req, res) => {
  const user_id = req.user_id;
  const query = `
    SELECT c.course_id, c.name, c.description
    FROM courses c
    JOIN user_courses uc ON c.course_id = uc.course_id
    WHERE uc.user_id = $1
  `;
  try {
    const results = await db.query(query, [user_id]);
    res.json(results.rows);
  } catch (err) {
    console.error("Error in getCoursesForUser:", err);
    return res.status(500).json({ message: "Database error" });
  }
};

// Register a user for a course
const registerForCourse = async (req, res) => {
  const user_id = req.user_id;
  const { course_id } = req.params;

  try {
    console.log("Attempting to register user:", user_id, "for course:", course_id);

    // Check if the user is already registered for the course
    if (await checkUserRegistration(user_id, course_id)) {
      return res.status(400).json({ message: "You are already registered for this course" });
    }

    // Check if the course exists
    if (!(await checkCourseExists(course_id))) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Check course capacity
    // const capacityQuery =
    //   "SELECT maximum_capacity, COUNT(*) AS current_registration FROM user_courses WHERE course_id = $1 GROUP BY course_id";
    // const capacityResult = await db.query(capacityQuery, [course_id]);

    // let courseCapacity = null;
    // let currentRegistrationCount = 0;

    // if (capacityResult.rows.length > 0) {
    //   courseCapacity = capacityResult.rows[0].maximum_capacity;
    //   currentRegistrationCount = capacityResult.rows[0].current_registration;
    // }

    // if (currentRegistrationCount >= courseCapacity) {
    //   return res.status(400).json({ message: "Course is full, cannot register" });
    // }

    // Register the user for the course
    const insertQuery =
      "INSERT INTO user_courses (user_id, course_id) VALUES ($1, $2)";
    await db.query(insertQuery, [user_id, course_id]);

    console.log(`User ${user_id} successfully registered for course ${course_id}`);
    res.status(201).json({ message: "Successfully registered for the course" });
  } catch (err) {
    console.error("Error in registerForCourse:", err);
    return res.status(500).json({ message: "Database error" });
  }
};

// Unregister a user from a course
const unregisterFromCourse = async (req, res) => {
  const user_id = req.user_id;
  const { course_id } = req.params;

  try {
    // Delete the registration entry for the user and course
    const deleteQuery =
      "DELETE FROM user_courses WHERE user_id = $1 AND course_id = $2";
    const result = await db.query(deleteQuery, [user_id, course_id]);

    // Check if the deletion was successful
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "You are not registered for this course" });
    }

    res.json({ message: "Successfully unregistered from the course" });
  } catch (err) {
    console.error("Error in unregisterFromCourse:", err);
    return res.status(500).json({ message: "Database error" });
  }
};

// Admin register a user for a course
const adminRegisterUserForCourse = async (req, res) => {
  const { user_id, course_id } = req.params;

  try {
    // Check if the user exists
    if (!(await checkUserExists(user_id))) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the course exists
    if (!(await checkCourseExists(course_id))) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Check if the user is already registered for the course
    if (await checkUserRegistration(user_id, course_id)) {
      return res.status(400).json({ message: "User is already registered for this course" });
    }

    // Register the user for the course
    const insertQuery =
      "INSERT INTO user_courses (user_id, course_id) VALUES ($1, $2)";
    await db.query(insertQuery, [user_id, course_id]);

    res.status(201).json({ message: "User successfully registered for the course" });
  } catch (err) {
    console.error("Error in adminRegisterUserForCourse:", err);
    return res.status(500).json({ message: "Database error" });
  }
};

// Admin unregister a user from a course
const adminUnregisterUserFromCourse = async (req, res) => {
  const { user_id, course_id } = req.params;

  try {
    // Check if the user exists
    if (!(await checkUserExists(user_id))) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the course exists
    if (!(await checkCourseExists(course_id))) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Delete the registration entry for the user and course
    const deleteQuery =
      "DELETE FROM user_courses WHERE user_id = $1 AND course_id = $2";
    const result = await db.query(deleteQuery, [user_id, course_id]);

    // Check if the deletion was successful
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "User is not registered for this course" });
    }

    res.json({ message: "User successfully unregistered from the course" });
  } catch (err) {
    console.error("Error in adminUnregisterUserFromCourse:", err);
    return res.status(500).json({ message: "Database error" });
  }
};

module.exports = {
  getCoursesForUser,
  registerForCourse,
  unregisterFromCourse,
  adminRegisterUserForCourse,
  adminUnregisterUserFromCourse,
  getAllCourses,
};
