import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const BookingSuccessPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation(); // contains booking_id and contact_email from booking

  const handleProceed = () => {
    navigate('/payment', { state });
  };

  return (
    <div style={{ textAlign: 'center', padding: '40px' }}>
      <h2>✅ Booking Completed</h2>
      <p>Your booking was successful!</p>
      <p><strong>Booking ID:</strong> {state?.booking_id}</p>
      <p><strong>Email:</strong> {state?.contact_email}</p>

      <button
        onClick={handleProceed}
        style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none' }}
      >
        Proceed to Payment
      </button>
    </div>
  );
};

export default BookingSuccessPage;
