// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { payNow } from '../services/api';
// import './PaymentPage.css';

// const PaymentPage = () => {
//   const { state } = useLocation();
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     card_number: '4111111111111111',
//     card_holder: 'John Doe',
//     expiry_date: '2030-12',
//     cvv: '123'
//   });

//   const [price, setPrice] = useState(0);

//   useEffect(() => {
//     if (state?.flight && state?.total_passengers) {
//       const total = Number(state.flight.Price.replace(",","")) * state.total_passengers;
//       console.log(state.flight.Price);
//       console.log(state.total_passengers);
//     console.log(typeof state.flight.Price);
//       console.log(typeof state.total_passengers);
    
//       console.log("total is",total);
//       setPrice(total);
//     }
    
//   }, [state]);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handlePayment = async (e) => {
//     e.preventDefault();

//     const payload = {
//       FlightCode: state.flight.FlightCode,
//       Price: price,
//       ...form
//     };

//     try {
//       const res = await payNow(payload);
//       const data = await res.json();

//       if (res.ok) {
//         alert('✅ Payment Successful!');
//         navigate('/confirmation', {
//           state: {
//             booking_id: state.booking_id,
//             amount_paid: price,
//             flight: state.flight
//           }
//         });
//       } else {
//         alert(data.error || '❌ Payment failed');
//       }
//     } catch (err) {
//       console.error('Payment error:', err);
//       alert('❌ Network or server error');
//     }
//   };

//   return (
//     <div className="payment-container">
//       <h2>💳 Payment Details</h2>

//       {state?.flight && (
//         <div className="summary-box">
//           <p><strong>Flight:</strong> {state.flight.FlightName} ({state.flight.FlightCode})</p>
//           <p><strong>Passengers:</strong> {state.total_passengers}</p>
//           <p><strong>Total Amount:</strong> ₹{price}</p>
//         </div>
//       )}

//       <form onSubmit={handlePayment} className="payment-form">
//         <input type="text" name="card_holder" value={form.card_holder} onChange={handleChange} required />
//         <input type="text" name="card_number" value={form.card_number} onChange={handleChange} required />
//         <input type="month" name="expiry_date" value={form.expiry_date} onChange={handleChange} required />
//         <input type="password" name="cvv" value={form.cvv} onChange={handleChange} maxLength="4" required />
//         <button type="submit">Pay ₹{price}</button>
//       </form>
//     </div>
//   );
// };

// export default PaymentPage;

import React, { useState, useEffect } from 'react';
import { bookFlight } from '../services/api';
import { useLocation, useNavigate } from 'react-router-dom';
import './BookingComponent.css';

const BookingComponent = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    FlightCode: '',
    trip_type: 'One-way',
    booking_date: '',
    return_date: '',
    total_passengers: 1,
    contact_name: '',
    contact_email: '',
    contact_phone: '',
    passengers: [{ name: '', age: '', gender: '', relation: '' }]
  });

  useEffect(() => {
    if (state?.flight) {
      setForm((prev) => ({
        ...prev,
        FlightCode: state.flight.FlightCode
      }));
    }
  }, [state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handlePassengerChange = (index, field, value) => {
    const updated = [...form.passengers];
    updated[index][field] = value;
    setForm({ ...form, passengers: updated });
  };

  const handlePassengerCount = (e) => {
    const count = parseInt(e.target.value);
    const updated = Array.from({ length: count }, (_, i) =>
      form.passengers[i] || { name: '', age: '', gender: '', relation: '' }
    );
    setForm({ ...form, total_passengers: count, passengers: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await bookFlight(form);
      const data = await res.json();

      if (res.ok) {
        navigate('/payment', {
          state: {
            flight: state.flight,
            total_passengers: form.total_passengers,
            booking_id: data.booking_id,
            contact_email: form.contact_email  // ✅ PASS EMAIL
          }
        });
      } else {
        alert(data.message || 'Booking failed');
      }
    } catch (error) {
      alert('❌ Booking error');
      console.error(error);
    }
  };

  return (
    <div className="booking-container">
      <h2>✈️ Book Flight</h2>

      {state?.flight && (
        <div className="flight-summary">
          <strong>Flight:</strong> {state.flight.FlightName} ({state.flight.FlightCode})<br />
          {state.flight.DepartingCity} ➡ {state.flight.ArrivingCity}<br />
          Duration: {state.flight.Duration}<br />
          Price: ₹{state.flight.Price} per passenger
        </div>
      )}

      <form className="booking-form" onSubmit={handleSubmit}>
        <input name="FlightCode" value={form.FlightCode} readOnly />

        <select name="trip_type" value={form.trip_type} onChange={handleChange}>
          <option value="One-way">One-way</option>
          <option value="Round-trip">Round-trip</option>
        </select>

        <input type="date" name="booking_date" value={form.booking_date} onChange={handleChange} required />

        {form.trip_type === 'Round-trip' && (
          <input type="date" name="return_date" value={form.return_date} onChange={handleChange} />
        )}

        <input type="number" name="total_passengers" min="1"
          value={form.total_passengers}
          onChange={handlePassengerCount}
          required
        />

        <input name="contact_name" placeholder="Your Name"
          value={form.contact_name}
          onChange={handleChange}
          required
        />

        <input type="email" name="contact_email"
          placeholder="Your Email"
          value={form.contact_email}
          onChange={handleChange}
          required
        />

        <input name="contact_phone"
          placeholder="Your Phone"
          value={form.contact_phone}
          onChange={handleChange}
          required
        />

        <h4>Passenger Details</h4>
        {form.passengers.map((p, i) => (
          <div key={i} className="passenger-box">
            <input placeholder="Name"
              value={p.name}
              onChange={(e) => handlePassengerChange(i, 'name', e.target.value)}
              required
            />
            <input placeholder="Age"
              value={p.age}
              onChange={(e) => handlePassengerChange(i, 'age', e.target.value)}
              required
            />
            <select value={p.gender}
              onChange={(e) => handlePassengerChange(i, 'gender', e.target.value)}
              required
            >
              <option value="">Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            <input placeholder="Relation"
              value={p.relation}
              onChange={(e) => handlePassengerChange(i, 'relation', e.target.value)}
            />
          </div>
        ))}

        <button type="submit">✅ Confirm Booking</button>
      </form>
    </div>
  );
};

export default BookingComponent;
