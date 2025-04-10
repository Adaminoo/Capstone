const express = require("express");
const router = express.Router();
const { isAuth } = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");
const {
  getCoursesForUser,
  registerForCourse,
  unregisterFromCourse,
  adminRegisterUserForCourse,
  adminUnregisterUserFromCourse,
} = require("../controllers/courseController");

// User routes
router.get("/courses", isAuth, getCoursesForUser); // Get all courses for authenticated user
router.post("/courses/:course_id/register", isAuth, registerForCourse); // Register user for a course
router.delete("/courses/:course_id/unregister", isAuth, unregisterFromCourse); // Unregister user from a course

// Admin routes
router.post(
  "/admin/courses/register/:user_id/:course_id", // Admin register user for course
  isAuth,
  isAdmin,
  adminRegisterUserForCourse
);

router.delete(
  "/admin/courses/unregister/:user_id/:course_id", // Admin unregister user from course
  isAuth,
  isAdmin,
  adminUnregisterUserFromCourse
);

module.exports = router;
