const express = require('express');
const router = express.Router();

// Middleware
const { isAuth } = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/isAdmin');

// Controllers
const {
  getProfile,
  updateProfile,
  deleteProfile
} = require('../controllers/profileController');


// Get own profile
router.get('/profile', isAuth, getProfile);

// Update own profile
router.put('/profile', isAuth, updateProfile);

// Delete own profile
router.delete('/profile', isAuth, deleteProfile);

// Admin: delete any user's profile by ID
router.delete('/profile/:id', isAuth, isAdmin, deleteProfile);

// Admin: update any user's profile by ID
router.put('/profile/:id', isAuth, isAdmin, updateProfile);

module.exports = router;
