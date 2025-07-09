const express = require('express');
const router = express.Router();
const forgotPasswordController = require('../controllers/forgotPasswordController');

// Route to request password reset
router.post('/forgot-password', forgotPasswordController.forgotPassword);

// Route to reset password using token
router.post('/reset-password/:token', forgotPasswordController.resetPassword);

module.exports = router;
