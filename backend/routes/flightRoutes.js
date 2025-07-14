const express = require('express');
const router = express.Router();
const { getFlights } = require('../controllers/flightController');

// ✅ GET /api/flights/search
router.post('/search', getFlights);

module.exports = router;
