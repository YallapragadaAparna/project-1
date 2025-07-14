const db = require('../db');

exports.getFlights = (req, res) => {
  const {
    DepartingCity,
    ArrivingCity,
    FlightName,
    FlightCode,
    DepartingTime,
    ArrivingTime,
    Duration,
    Price
  } = req.body;

  // ✅ Mandatory fields check
  if (!DepartingCity || !ArrivingCity) {
    return res.status(400).json({ message: 'DepartingCity and ArrivingCity are required' });
  }

  // ✅ WHERE clause and values
  let whereClause = `WHERE DepartingCity = ? AND ArrivingCity = ?`;
  let values = [DepartingCity, ArrivingCity];

  const filters = {
    FlightName,
    FlightCode,
    DepartingTime,
    ArrivingTime,
    Duration,
    Price
  };

  for (const key in filters) {
    if (filters[key]) {
      whereClause += ` AND ${key} = ?`;
      values.push(filters[key]);
    }
  }

  // ✅ Use UNION with matching columns
  const sql = `
    SELECT 
      FlightName, FlightCode, DepartingCity, DepartingTime,
      ArrivingCity, ArrivingTime, Duration, Price, 'flights' AS source
    FROM flights ${whereClause}
    UNION
    SELECT 
      FlightName, FlightCode, DepartingCity, DepartingTime,
      ArrivingCity, ArrivingTime, Duration, Price, 'flight_data' AS source
    FROM flight_data ${whereClause}
  `;

  // ✅ Duplicate values for second WHERE clause
  db.query(sql, [...values, ...values], (err, results) => {
    if (err) {
      console.error('❌ Query error:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    res.json(results);
  });
};


