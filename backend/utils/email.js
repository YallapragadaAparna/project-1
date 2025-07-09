// utils/email.js

const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // your Gmail address
    pass: process.env.EMAIL_PASS  // your App Password (NOT your Gmail password)
  }
});

exports.sendConfirmationEmail = (toEmail, bookingId, passengers = []) => {
  const passengerList = passengers.map((p, index) => {
    return `<li>${index + 1}. ${p.name} (${p.age}, ${p.gender})${p.relation ? ` - ${p.relation}` : ''}</li>`;
  }).join('');

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: toEmail,
    subject: `✅ Flight Booking Confirmation - Booking ID ${bookingId}`,
    html: `
      <h2>Thank you for booking with us!</h2>
      <p>Your booking (ID: <strong>${bookingId}</strong>) was successful.</p>
      <p><strong>Passenger(s):</strong></p>
      <ul>${passengerList}</ul>
      <p>You will receive further updates as your travel date approaches.</p>
      <br/>
      <p>Safe travels! ✈️</p>
    `
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error('❌ Error sending email:', err);
    } else {
      console.log('✅ Email sent:', info.response);
    }
  });
};
