const express = require('express');
const { registerUser, loginUser, getUserProfile } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', registerUser); // User Registration
router.post('/login', loginUser); // User Login
router.get('/profile', authMiddleware, getUserProfile); // Get User Profile

module.exports = router;
