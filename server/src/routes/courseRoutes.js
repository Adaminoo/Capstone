const express = require('express');
const router = express.Router();
const { isAuth } = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/isAdmin'); // Importing the isAdmin middleware
const {
    getCoursesForUser,
    registerForCourse,
    unregisterFromCourse,
    adminRegisterUserForCourse,
    adminUnregisterUserFromCourse,
} = require('../controllers/courseController');

// User routes to get, register, and unregister from courses
router.get('/courses', isAuth, getCoursesForUser); // Get courses the user is registered for
router.post('/courses/:course_id/register', isAuth, registerForCourse); // Register for a course
router.delete('/courses/:course_id/unregister', isAuth, unregisterFromCourse); // Unregister from a course

// Admin routes to manage user registrations for courses
router.post('/admin/courses/register/:user_id/:course_id', isAuth, isAdmin, adminRegisterUserForCourse); // Admin registers a user
router.delete('/admin/courses/unregister/:user_id/:course_id', isAuth, isAdmin, adminUnregisterUserFromCourse); // Admin unregisters a user

module.exports = router;
