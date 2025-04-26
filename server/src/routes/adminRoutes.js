const express = require("express");
const router = express.Router();
const { isAdmin } = require("../middleware/isAdmin");
const {
  getCourses,
  addCourse,
  updateCourse,
  deleteCourse,
  getAllStudents
} = require("../controllers/isAdminController");

router.get("/courses", isAdmin, getCourses);
router.post("/courses", isAdmin, addCourse);
router.put("/courses/:id", isAdmin, updateCourse);
router.delete("/courses/:id", isAdmin, deleteCourse);

router.get("/students", isAdmin, getAllStudents);

module.exports = router;
