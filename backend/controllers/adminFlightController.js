const db = require('../db');

exports.addFlight = (req, res) => {
  const {
    FlightName,
    FlightCode,
    DepartingCity,
    DepartingTime,
    ArrivingCity,
    ArrivingTime,
    Duration,
    Price
  } = req.body;

  // Check required fields
  if (!FlightName || !FlightCode || !DepartingCity || !DepartingTime || !ArrivingCity || !ArrivingTime || !Price) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const sql = `
    INSERT INTO flights 
    (FlightName, FlightCode, DepartingCity, DepartingTime, ArrivingCity, ArrivingTime, Duration, Price)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [FlightName, FlightCode, DepartingCity, DepartingTime, ArrivingCity, ArrivingTime, Duration, Price];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('❌ Error adding flight:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    res.status(201).json({ message: '✅ Flight added successfully' });
  });
};
