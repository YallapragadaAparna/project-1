const express = require('express');
const cors = require('cors');
const flightRoutes = require('./routes/flightRoutes');
const authRoutes = require('./routes/authRoutes');
const { verifyToken, isAdmin } = require('./middleware/authMiddleware');
const adminRoutes = require('./routes/adminRoutes');
const adminFlightRoutes = require('./routes/adminFlightRoutes');
//const flightSearchRoutes = require('./routes/flightSearchRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const { sendConfirmationEmail } = require('./utils/email.js');
const paymentRoutes = require('./routes/paymentRoutes');
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', flightRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/admin/flights', adminFlightRoutes);
app.use('/api/flights', flightRoutes); 
//app.use('/api/flights', flightSearchRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/payment', paymentRoutes);
//sendConfirmationEmail(contact_email, bookingId, passengers);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});  


