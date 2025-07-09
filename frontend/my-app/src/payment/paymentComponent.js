import React, { useState } from 'react';

const PaymentComponent = ({ selectedFlight }) => {
  const [paymentInfo, setPaymentInfo] = useState({
    card_number: '',
    card_holder: '',
    expiry_date: '',
    cvv: ''
  });

  const handleChange = (e) => {
    setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });
  };

  const handlePayment = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/payment/pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          flight_id: selectedFlight.id,
          total_price: selectedFlight.price,
          ...paymentInfo
        })
      });

      const data = await res.json();
      if (data.message === 'Payment Successful') {
        alert(`✅ ${data.message}\nAmount Paid: ₹${data.paid_amount}`);
      } else {
        alert(`❌ Payment failed: ${data.error}`);
      }
    } catch (err) {
      console.error(err);
      alert('❌ Error occurred during payment');
    }
  };

  return (
    <div>
      <h3>Enter Payment Details</h3>
      <input
        type="text"
        name="card_number"
        placeholder="Card Number"
        value={paymentInfo.card_number}
        onChange={handleChange}
      /><br />
      <input
        type="text"
        name="card_holder"
        placeholder="Card Holder Name"
        value={paymentInfo.card_holder}
        onChange={handleChange}
      /><br />
      <input
        type="text"
        name="expiry_date"
        placeholder="Expiry Date (MM/YY)"
        value={paymentInfo.expiry_date}
        onChange={handleChange}
      /><br />
      <input
        type="password"
        name="cvv"
        placeholder="CVV"
        value={paymentInfo.cvv}
        onChange={handleChange}
      /><br />
      <button onClick={handlePayment}>Pay ₹{selectedFlight.price}</button>
    </div>
  );
};

export default PaymentComponent;

