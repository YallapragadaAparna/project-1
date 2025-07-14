// import React from 'react';
// import { useLocation } from 'react-router-dom';

// const ConfirmationPage = () => {
//   const { state } = useLocation();

//   return (
//     <div style={{ textAlign: 'center', padding: '40px' }}>
//       <h2>🎉 Payment Successful!</h2>
//       <p><strong>Booking ID:</strong> {state?.booking_id}</p>
//       <p><strong>Flight:</strong> {state?.flight?.FlightName} ({state?.flight?.FlightCode})</p>
//       <p><strong>Amount Paid:</strong> ₹{state?.amount_paid}</p>
//       <p>✅ Your ticket is confirmed. Thank you for booking with us!</p>
//     </div>
//   );
// };

// export default ConfirmationPage;


import React from 'react';
import { useLocation } from 'react-router-dom';
import './ConfirmationPage.css'; // Import the new CSS

const ConfirmationPage = () => {
  const { state } = useLocation();

  return (
    <div className="confirmation-container">
      <div className="success-icon">🎉</div>
      <h2>Payment Successful!</h2>
      <div className="confirmation-details">
        <p><strong>Booking ID:</strong> {state?.booking_id}</p>
        <p><strong>Flight:</strong> {state?.flight?.FlightName} ({state?.flight?.FlightCode})</p>
        <p><strong>Amount Paid:</strong> ₹{state?.amount_paid}</p>
      </div>
      <p className="thank-you">✅ Your ticket is confirmed. Thank you for booking with us!</p>
    </div>
  );
};

export default ConfirmationPage;
