import React, { useState, useEffect } from 'react';
import { bookFlight } from '../services/api';
import { useLocation, useNavigate } from 'react-router-dom';
import './BookingComponent.css'; // ✅ Add custom CSS (style below)

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
    const updated = Array.from({ length: count }, (_, i) => form.passengers[i] || { name: '', age: '', gender: '', relation: '' });
    setForm({ ...form, total_passengers: count, passengers: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form };

    try {
      const res = await bookFlight(payload);
      const data = await res.json();

      if (res.ok) {
        navigate('/payment', {
          state: {
            flight: state.flight,
            total_passengers: form.total_passengers,
            booking_id: data.booking_id
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

        <input type="number" name="total_passengers" min="1" value={form.total_passengers} onChange={handlePassengerCount} required />
        <input name="contact_name" placeholder="Your Name" value={form.contact_name} onChange={handleChange} required />
        <input type="email" name="contact_email" placeholder="Your Email" value={form.contact_email} onChange={handleChange} required />
        <input name="contact_phone" placeholder="Your Phone" value={form.contact_phone} onChange={handleChange} required />

        <h4>Passenger Details</h4>
        {form.passengers.map((p, i) => (
          <div key={i} className="passenger-box">
            <input placeholder="Name" value={p.name} onChange={(e) => handlePassengerChange(i, 'name', e.target.value)} required />
            <input placeholder="Age" value={p.age} onChange={(e) => handlePassengerChange(i, 'age', e.target.value)} required />
            <select value={p.gender} onChange={(e) => handlePassengerChange(i, 'gender', e.target.value)} required>
              <option value="">Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            <input placeholder="Relation" value={p.relation} onChange={(e) => handlePassengerChange(i, 'relation', e.target.value)} />
          </div>
        ))}

        <button type="submit">✅ Confirm Booking</button>
      </form>
    </div>
  );
};

export default BookingComponent;
