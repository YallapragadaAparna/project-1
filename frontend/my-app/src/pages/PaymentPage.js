/*
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { payNow } from '../services/api'; // Ensure this function POSTs to /api/payment/pay
import './PaymentPage.css'; // Custom styling

const PaymentPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    card_number: '',
    card_holder: '',
    expiry_date: '',
    cvv: ''
  });

  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (state?.flight && state?.total_passengers) {
      const cost = state.flight.Price * state.total_passengers;
      setPrice(cost);
    }
  }, [state]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    const payload = {
      FlightCode: state.flight.FlightCode,
      Price: price,
      ...form
    };

    try {
      const res = await payNow(payload);
      const data = await res.json();

      if (res.ok) {
        alert(data.message || 'Payment Successful!');
        navigate('/confirmation', { state: { booking_id: state.booking_id } });
      } else {
        alert(data.error || 'Payment failed');
      }
    } catch (err) {
      console.error('❌ Payment error:', err);
      alert('❌ Payment processing error');
    }
  };

  return (
    <div className="payment-container">
      <h2>💳 Payment Details</h2>

      {state?.flight && (
        <div className="summary-box">
          <p><strong>Flight:</strong> {state.flight.FlightName} ({state.flight.FlightCode})</p>
          <p><strong>Passengers:</strong> {state.total_passengers}</p>
          <p><strong>Total Amount:</strong> ₹{price}</p>
        </div>
      )}

      <form onSubmit={handlePayment} className="payment-form">
        <input
          type="text"
          name="card_holder"
          placeholder="Card Holder Name"
          value={form.card_holder}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="card_number"
          placeholder="Card Number"
          value={form.card_number}
          onChange={handleChange}
          required
        />
        <input
          type="month"
          name="expiry_date"
          placeholder="Expiry Date"
          value={form.expiry_date}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="cvv"
          placeholder="CVV"
          maxLength={4}
          value={form.cvv}
          onChange={handleChange}
          required
        />
        <button type="submit">Pay ₹{price}</button>
      </form>
    </div>
  );
};

export default PaymentPage;*/
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { payNow } from '../services/api';
import './PaymentPage.css';

const PaymentPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    card_number: '4111111111111111',
    card_holder: 'John Doe',
    expiry_date: '2025-12',
    cvv: '123'
  });

  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (state?.flight && state?.total_passengers) {
      const total = Number(state.flight.Price.replace(",","")) * state.total_passengers;
      console.log(state.flight.Price);
      console.log(state.total_passengers);
    console.log(typeof state.flight.Price);
      console.log(typeof state.total_passengers);
    
      console.log("total is",total);
      setPrice(total);
    }
    
  }, [state]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    const payload = {
      FlightCode: state.flight.FlightCode,
      Price: price,
      ...form
    };

    try {
      const res = await payNow(payload);
      const data = await res.json();

      if (res.ok) {
        alert('✅ Payment Successful!');
        navigate('/confirmation', {
          state: {
            booking_id: state.booking_id,
            amount_paid: price,
            flight: state.flight
          }
        });
      } else {
        alert(data.error || '❌ Payment failed');
      }
    } catch (err) {
      console.error('Payment error:', err);
      alert('❌ Network or server error');
    }
  };

  return (
    <div className="payment-container">
      <h2>💳 Payment Details</h2>

      {state?.flight && (
        <div className="summary-box">
          <p><strong>Flight:</strong> {state.flight.FlightName} ({state.flight.FlightCode})</p>
          <p><strong>Passengers:</strong> {state.total_passengers}</p>
          <p><strong>Total Amount:</strong> ₹{price}</p>
        </div>
      )}

      <form onSubmit={handlePayment} className="payment-form">
        <input type="text" name="card_holder" value={form.card_holder} onChange={handleChange} required />
        <input type="text" name="card_number" value={form.card_number} onChange={handleChange} required />
        <input type="month" name="expiry_date" value={form.expiry_date} onChange={handleChange} required />
        <input type="password" name="cvv" value={form.cvv} onChange={handleChange} maxLength="4" required />
        <button type="submit">Pay ₹{price}</button>
      </form>
    </div>
  );
};

export default PaymentPage;


