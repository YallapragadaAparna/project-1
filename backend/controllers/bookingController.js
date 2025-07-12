/*const db = require('../db');

exports.createBooking = (req, res) => {
  const {
    FlightCode,
    trip_type,
    booking_date,
    return_date,
    total_passengers,
    contact_name,
    contact_email,
    contact_phone,
    passengers
  } = req.body;

  // Validation
  if (!FlightCode|| !trip_type || !booking_date || !total_passengers || !contact_name || !contact_phone || !passengers) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const bookingQuery = `
    INSERT INTO bookings 
    (flight_id, trip_type, booking_date, return_date, total_passengers, contact_name, contact_email, contact_phone)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const bookingValues = [
    FlightCode,
    trip_type,
    booking_date,
    return_date || null,
    total_passengers,
    contact_name,
    contact_email || null,
    contact_phone
  ];

  db.query(bookingQuery, bookingValues, (err, result) => {
    if (err) {
      console.error('❌ Booking error:', err);
      return res.status(500).json({ message: 'Error while booking' });
    }

    const bookingId = result.insertId;

    const passengerQuery = `
      INSERT INTO passengers (booking_id, name, age, gender, relation)
      VALUES ?
    `;

    const passengerValues = passengers.map(p => [
      bookingId,
      p.name,
      p.age,
      p.gender,
      total_passengers === 1 ? 'Self' : p.relation
    ]);

    db.query(passengerQuery, [passengerValues], (err2) => {
      if (err2) {
        console.error('❌ Passenger insert error:', err2);
        return res.status(500).json({ message: 'Error while saving passenger details' });
      }

      return res.status(201).json({ message: '✅ Booking completed', booking_id: bookingId });
    });
  });
}; */
/*const db = require('../db');

exports.createBooking = (req, res) => {
  const {
    FlightCode,
    trip_type,
    booking_date,
    return_date,
    total_passengers,
    contact_name,
    contact_email,
    contact_phone,
    passengers // array of passenger objects (if more than 1)
  } = req.body;

  if (!FlightCode || !trip_type || !booking_date || !total_passengers || !contact_name || !contact_email || !contact_phone) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const sql = `
    INSERT INTO bookings 
    (FlightCode, trip_type, booking_date, return_date, total_passengers, contact_name, contact_email, contact_phone)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    FlightCode,
    trip_type,
    booking_date,
    return_date || null,
    total_passengers,
    contact_name,
    contact_email,
    contact_phone
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('❌ Booking error:', err);
      return res.status(500).json({ message: 'Error saving booking' });
    }

    const bookingId = result.insertId;

    if (total_passengers > 1 && Array.isArray(passengers)) {
      const passengerSql = `
        INSERT INTO passengers (booking_id, name, age, gender, relation)
        VALUES ?
      `;

      const passengerValues = passengers.map(p => [
        bookingId,
        p.name,
        p.age,
        p.gender,
        p.relation || null
      ]);

      db.query(passengerSql, [passengerValues], (err2) => {
        if (err2) {
          console.error('❌ Passenger insert error:', err2);
          return res.status(500).json({ message: 'Booking saved, but failed to save passengers' });
        }

        res.status(201).json({
          message: '✅ Booking and passengers saved successfully',
          booking_id: bookingId
        });
      });
    } else {
      res.status(201).json({
        message: '✅ Booking saved successfully',
        booking_id: bookingId
      });
    }
  });
};*/
/*const db = require('../db');
const { sendConfirmationEmail } = require('../utils/email'); // ✅ Correct import

exports.createBooking = (req, res) => {
  const {
    FlightCode,
    trip_type,
    booking_date,
    return_date,
    total_passengers,
    contact_name,
    contact_email,
    contact_phone,
    passengers // array of passenger objects (if more than 1)
  } = req.body;

  if (!FlightCode || !trip_type || !booking_date || !total_passengers || !contact_name || !contact_email || !contact_phone) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const sql = `
    INSERT INTO bookings 
    (FlightCode, trip_type, booking_date, return_date, total_passengers, contact_name, contact_email, contact_phone)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    FlightCode,
    trip_type,
    booking_date,
    return_date || null,
    total_passengers,
    contact_name,
    contact_email,
    contact_phone
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('❌ Booking error:', err);
      return res.status(500).json({ message: 'Error saving booking' });
    }

    const bookingId = result.insertId;

    if (total_passengers > 1 && Array.isArray(passengers)) {
      const passengerSql = `
        INSERT INTO passengers (booking_id, name, age, gender, relation)
        VALUES ?
      `;

      const passengerValues = passengers.map(p => [
        bookingId,
        p.name,
        p.age,
        p.gender,
        p.relation || null
      ]);

      db.query(passengerSql, [passengerValues], async (err2) => {
        if (err2) {
          console.error('❌ Passenger insert error:', err2);
          return res.status(500).json({ message: 'Booking saved, but failed to save passengers' });
        }

        // ✅ Await email after successful insert
        await sendConfirmationEmail(contact_email, bookingId, passengers);

        res.status(201).json({
          message: '✅ Booking and passengers saved successfully',
          booking_id: bookingId
        });
      });
    } else {
      // ✅ Await email for single passenger
      sendConfirmationEmail(contact_email, bookingId, []);

      res.status(201).json({
        message: '✅ Booking saved successfully',
        booking_id: bookingId
      });
    }
  });
};*/
const db = require('../db');
const { sendConfirmationEmail } = require('../utils/email');

exports.createBooking = (req, res) => {
  const {
    FlightCode,
    trip_type,
    booking_date,
    return_date,
    total_passengers,
    contact_name,
    contact_email,
    contact_phone,
    passengers // array of passenger objects
  } = req.body;

  // Required field validation
  if (
    !FlightCode ||
    !trip_type ||
    !booking_date ||
    !total_passengers ||
    !contact_name ||
    !contact_email ||
    !contact_phone
  ) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const sql = `
    INSERT INTO bookings 
    (FlightCode, trip_type, booking_date, return_date, total_passengers, contact_name, contact_email, contact_phone)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    FlightCode,
    trip_type,
    booking_date,
    return_date || null,
    total_passengers,
    contact_name,
    contact_email,
    contact_phone
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('❌ Booking error:', err);
      return res.status(500).json({ message: 'Error saving booking' });
    }

    const bookingId = result.insertId;

    // Handle multiple passengers
    if (total_passengers > 1 && Array.isArray(passengers) && passengers.length > 1) {
      const passengerSql = `
        INSERT INTO passengers (booking_id, name, age, gender, relation)
        VALUES ?
      `;

      const passengerValues = passengers.map(p => [
        bookingId,
        p.name,
        p.age,
        p.gender,
        p.relation || null
      ]);

      db.query(passengerSql, [passengerValues], async (err2) => {
        if (err2) {
          console.error('❌ Passenger insert error:', err2);
          return res.status(500).json({ message: 'Booking saved, but failed to save passengers' });
        }

        await sendConfirmationEmail(contact_email, bookingId, passengers);

        return res.status(201).json({
          message: '✅ Booking and passengers saved successfully',
          booking_id: bookingId
        });
      });

    // Handle single passenger
    } else if (total_passengers === 1 && Array.isArray(passengers) && passengers.length === 1) {
      const p = passengers[0];

      const singleSql = `
        INSERT INTO passengers (booking_id, name, age, gender, relation)
        VALUES (?, ?, ?, ?, ?)
      `;

      const singleValues = [
        bookingId,
        p.name,
        p.age,
        p.gender,
        p.relation || null
      ];

      db.query(singleSql, singleValues, async (err3) => {
        if (err3) {
          console.error('❌ Single passenger insert error:', err3);
          return res.status(500).json({ message: 'Booking saved, but failed to save passenger' });
        }

        await sendConfirmationEmail(contact_email, bookingId, [p]);

        return res.status(201).json({
          message: '✅ Booking and passenger saved successfully',
          booking_id: bookingId
        });
      });

    // No passenger data provided
    } else {
      return res.status(201).json({
        message: '✅ Booking saved (no passenger info provided)',
        booking_id: bookingId
      });
    }
  });
};
