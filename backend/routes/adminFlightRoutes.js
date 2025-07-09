const express = require('express');
const router = express.Router();
const adminFlightController = require('../controllers/adminFlightController');
const verifyToken = require('../middleware/verifyToken');

// 🔒 Admin adds a new flight (requires token)
router.post('/add', verifyToken, adminFlightController.addFlight);

module.exports = router;
