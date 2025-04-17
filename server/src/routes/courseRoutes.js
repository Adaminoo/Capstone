const express = require("express");
const router = express.Router();
const { isAuth } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/isAdmin"); // ✅ Fix here

const {
  getCoursesForUser,
  registerForCourse,
  unregisterFromCourse,
  adminRegisterUserForCourse,
  adminUnregisterUserFromCourse,
  getAllCourses,
} = require("../controllers/courseController");

// User routes
router.get("/courses", isAuth, getCoursesForUser); // Get all courses for authenticated user
router.post("/courses/:course_id/register", isAuth, registerForCourse); // Register user for a course
router.delete("/courses/:course_id/unregister", isAuth, unregisterFromCourse); // Unregister user from a course
router.get("/allcourses", isAuth, getAllCourses); // Get a list of all courses - Adam 

// Admin routes
router.post(
  "/admin/courses/register/:user_id/:course_id",
  isAuth,
  isAdmin,
  adminRegisterUserForCourse
);

router.delete(
  "/admin/courses/unregister/:user_id/:course_id",
  isAuth,
  isAdmin,
  adminUnregisterUserFromCourse
);

module.exports = router;
