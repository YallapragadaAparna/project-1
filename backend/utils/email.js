// utils/email.js
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// 📧 General Email Sender
const sendEmail = async (to, subject, body) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text: body
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent:', info.response);
  } catch (error) {
    console.error('❌ Email error:', error);
  }
};

// 📧 Booking Confirmation
const sendConfirmationEmail = (toEmail, bookingId, passengers = []) => {
  const passengerList = passengers.map((p, i) => (
    `<li>${i + 1}. ${p.name} (${p.age}, ${p.gender})${p.relation ? ` - ${p.relation}` : ''}</li>`
  )).join('');

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: toEmail,
    subject: `✅ Flight Booking Confirmation - Booking ID ${bookingId}`,
    html: `
      <h2>Thank you for booking with us!</h2>
      <p>Your booking (ID: <strong>${bookingId}</strong>) was successful.</p>
      <ul>${passengerList}</ul>
      <p>Safe travels! ✈️</p>
    `
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error('❌ Booking email failed:', err);
    } else {
      console.log('✅ Booking email sent:', info.response);
    }
  });
};

module.exports = { sendEmail, sendConfirmationEmail };
