const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
//const forgotPasswordController = require('../controllers/forgotPasswordController');

//router.post('/forgot-password', forgotPasswordController.forgotPassword);
//router.post('/reset-password/:token', forgotPasswordController.resetPassword);

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
