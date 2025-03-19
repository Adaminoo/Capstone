const express = require("express");
const router = express.Router();
const { isAuth } = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin"); // Importing the isAdmin middleware
const {
  getProfile,
  updateProfile,
  deleteProfile,
} = require("../controllers/profileController");

router.get("/profile", isAuth, getProfile); 
router.put("/profile", isAuth, updateProfile);
router.delete("/profile", isAuth, deleteProfile); 

router.delete("/profile/:id", isAuth, isAdmin, deleteProfile); 
router.put("/profile/:id", isAuth, isAdmin, updateProfile); 

module.exports = router;
