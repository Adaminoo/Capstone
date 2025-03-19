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

router.get("/courses", isAuth, getCoursesForUser); 
router.post("/courses/:course_id/register", isAuth, registerForCourse); 
router.delete("/courses/:course_id/unregister", isAuth, unregisterFromCourse); 

router.post(
  "/admin/courses/register/:user_id/:course_id",
  isAuth,
  isAdmin,
  adminRegisterUserForCourse
); // Admin registers a user
router.delete(
  "/admin/courses/unregister/:user_id/:course_id",
  isAuth,
  isAdmin,
  adminUnregisterUserFromCourse
); // Admin unregisters a user

module.exports = router;
