const express = require('express');
const router = express.Router();
const { isAuth } = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/isAdmin'); // Importing the isAdmin middleware
const { getProfile, updateProfile, deleteProfile } = require('../controllers/profileController');

// Routes for the authenticated user's profile (only the user or an admin can modify their profile)
router.get('/profile', isAuth, getProfile); // Get the authenticated user's profile
router.put('/profile', isAuth, updateProfile); // Update the authenticated user's profile
router.delete('/profile', isAuth, deleteProfile); // Delete the authenticated user's profile (self-delete)

// Admin routes - to manage all users' profiles (admins can edit or delete any user's profile)
router.delete('/profile/:id', isAuth, isAdmin, deleteProfile); // Admin can delete any user by ID
router.put('/profile/:id', isAuth, isAdmin, updateProfile); // Admin can update any user's profile by ID

module.exports = router;
