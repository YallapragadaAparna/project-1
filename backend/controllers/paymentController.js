exports.processPayment = (req, res) => {
  const {
    FlightCode,
    Price,
    card_number,
    card_holder,
    expiry_date,
    cvv
  } = req.body;

  if (!FlightCode || !Price || !card_number || !card_holder || !expiry_date || !cvv) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Simulate payment success
  res.status(200).json({
    message: 'Payment Successful',
    FlightCode,
    paid_amount: Price
  });
};


