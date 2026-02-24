// exports.processPayment = (req, res) => {
//   const {
//     FlightCode,
//     Price,
//     card_number,
//     card_holder,
//     expiry_date,
//     cvv
//   } = req.body;

//   if (!FlightCode || !Price || !card_number || !card_holder || !expiry_date || !cvv) {
//     return res.status(400).json({ error: 'All fields are required' });
//   }

//   // Simulate payment success
//   res.status(200).json({
//     message: 'Payment Successful',
//     FlightCode,
//     paid_amount: Price
//   });
// };
// controllers/paymentController.js

const nodemailer = require("nodemailer");

exports.processPayment = async (req, res) => {
  const {
    FlightCode,
    Price,
    card_number,
    card_holder,
    expiry_date,
    cvv,
    contact_email   // 👈 IMPORTANT
  } = req.body;

  if (
    !FlightCode ||
    Price === undefined ||
    !card_number ||
    !card_holder ||
    !expiry_date ||
    !cvv ||
    !contact_email
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // ✅ Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // ✅ Send email (wrapped safely)
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: contact_email,
        subject: "Flight Payment Successful ✈️",
        text: `Your payment of ₹${Price} for flight ${FlightCode} was successful.\n\nThank you for booking with us!`
      });

      console.log("Payment email sent");
    } catch (emailError) {
      console.log("Email failed but payment continues:", emailError.message);
    }

    // ✅ Always return success
    res.status(200).json({
      message: "Payment Successful",
      FlightCode,
      paid_amount: Price
    });

  } catch (err) {
    console.error("Payment error:", err);
    res.status(500).json({ error: "Payment failed" });
  }
};
