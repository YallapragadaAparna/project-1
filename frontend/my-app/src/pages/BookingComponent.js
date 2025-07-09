// src/pages/BookingComponent.js
/*import React, { useState } from 'react';
import { bookFlight } from '../services/api';

const BookingComponent = () => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handlePassengerChange = (index, field, value) => {
    const updatedPassengers = [...form.passengers];
    updatedPassengers[index][field] = value;
    setForm({ ...form, passengers: updatedPassengers });
  };

  const handlePassengerCount = (e) => {
    const count = parseInt(e.target.value);
    const updatedPassengers = Array.from({ length: count }, (_, i) => form.passengers[i] || { name: '', age: '', gender: '', relation: '' });
    setForm({ ...form, total_passengers: count, passengers: updatedPassengers });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form };

    // Don't send passenger data if only one passenger
    if (form.total_passengers <=0) delete payload.passengers;

    try {
      const res = await bookFlight(payload);
      const data = await res.json();
      alert(data.message || 'Booking successful');
    } catch (error) {
      alert('❌ Failed to submit booking');
      console.error(error);
    }
  };

  return (
    <div className="component-box" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center' }}>✈️ Book Flight</h2>
      <form onSubmit={handleSubmit}>
        <input name="FlightCode" placeholder="Flight Code" value={form.FlightCode} onChange={handleChange} required />
        <select name="trip_type" value={form.trip_type} onChange={handleChange}>
          <option value="One-way">One-way</option>
          <option value="Round-trip">Round-trip</option>
        </select>
        <input name="booking_date" type="date" value={form.booking_date} onChange={handleChange} required />
        {form.trip_type === 'Round-trip' && (
          <input name="return_date" type="date" value={form.return_date} onChange={handleChange} />
        )}
        <input
          type="number"
          name="total_passengers"
          placeholder="Total Passengers"
          value={form.total_passengers}
          onChange={handlePassengerCount}
          min="1"
          required
        />
        <input name="contact_name" placeholder="Your Name" value={form.contact_name} onChange={handleChange} required />
        <input type="email" name="contact_email" placeholder="Your Email" value={form.contact_email} onChange={handleChange} required />
        <input name="contact_phone" placeholder="Your Phone" value={form.contact_phone} onChange={handleChange} required />

        {form.total_passengers > 1 && (
          <>
            <h4>Passenger Details</h4>
            {form.passengers.map((p, i) => (
              <div key={i} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
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
          </>
        )}

        <button type="submit" style={{ marginTop: '20px', padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none' }}>
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default BookingComponent;*/
/*import React, { useState } from 'react';
import { bookFlight } from '../services/api';
import { useLocation } from 'react-router-dom';


const BookingComponent = () => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handlePassengerChange = (index, field, value) => {
    const updatedPassengers = [...form.passengers];
    updatedPassengers[index][field] = value;
    setForm({ ...form, passengers: updatedPassengers });
  };

  const handlePassengerCount = (e) => {
    const count = parseInt(e.target.value);
    const updatedPassengers = Array.from({ length: count }, (_, i) => form.passengers[i] || { name: '', age: '', gender: '', relation: '' });
    setForm({ ...form, total_passengers: count, passengers: updatedPassengers });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form };

    // Remove passengers if invalid count
    if (form.total_passengers <= 0) delete payload.passengers;

    try {
      const res = await bookFlight(payload);
      const data = await res.json();
      alert(data.message || 'Booking successful');
    } catch (error) {
      alert('❌ Failed to submit booking');
      console.error(error);
    }
  };

  return (
    <div className="component-box" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center' }}>✈️ Book Flight</h2>
      <form onSubmit={handleSubmit}>
        <input name="FlightCode" placeholder="Flight Code" value={form.FlightCode} onChange={handleChange} required />
        <select name="trip_type" value={form.trip_type} onChange={handleChange}>
          <option value="One-way">One-way</option>
          <option value="Round-trip">Round-trip</option>
        </select>
        <input name="booking_date" type="date" value={form.booking_date} onChange={handleChange} required />
        {form.trip_type === 'Round-trip' && (
          <input name="return_date" type="date" value={form.return_date} onChange={handleChange} />
        )}
        <input
          type="number"
          name="total_passengers"
          placeholder="Total Passengers"
          value={form.total_passengers}
          onChange={handlePassengerCount}
          min="1"
          required
        />
        <input name="contact_name" placeholder="Your Name" value={form.contact_name} onChange={handleChange} required />
        <input type="email" name="contact_email" placeholder="Your Email" value={form.contact_email} onChange={handleChange} required />
        <input name="contact_phone" placeholder="Your Phone" value={form.contact_phone} onChange={handleChange} required />

        {/* 🟡 Passenger Info *}
        {form.total_passengers >= 1 && (
          <>
            <div
              style={{
                backgroundColor: '#fff3cd',
                color: '#856404',
                padding: '10px',
                marginBottom: '10px',
                border: '1px solid #ffeeba'
              }}
            >
              <strong>Note:</strong> The contact person (you) is <u>not automatically added</u> to the passenger list.
              <br />
              Please fill in details for <strong>each passenger individually</strong>, including yourself if you're traveling.
            </div>

            <h4>Passenger Details</h4>
            {form.passengers.map((p, i) => (
              <div key={i} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                <input
                  placeholder="Name"
                  value={p.name}
                  onChange={(e) => handlePassengerChange(i, 'name', e.target.value)}
                  required
                />
                <input
                  placeholder="Age"
                  value={p.age}
                  onChange={(e) => handlePassengerChange(i, 'age', e.target.value)}
                  required
                />
                <select
                  value={p.gender}
                  onChange={(e) => handlePassengerChange(i, 'gender', e.target.value)}
                  required
                >
                  <option value="">Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
                <input
                  placeholder="Relation"
                  value={p.relation}
                  onChange={(e) => handlePassengerChange(i, 'relation', e.target.value)}
                />
              </div>
            ))}
          </>
        )}

        <button
          type="submit"
          style={{
            marginTop: '20px',
            padding: '10px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none'
          }}
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default BookingComponent;*/
import React, { useState, useEffect } from 'react';
import { bookFlight } from '../services/api';
import { useLocation } from 'react-router-dom';

const BookingComponent = () => {
  const { state } = useLocation();

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

  // ✅ Autofill from flight search
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
    const updatedPassengers = [...form.passengers];
    updatedPassengers[index][field] = value;
    setForm({ ...form, passengers: updatedPassengers });
  };

  const handlePassengerCount = (e) => {
    const count = parseInt(e.target.value);
    const updatedPassengers = Array.from({ length: count }, (_, i) => form.passengers[i] || { name: '', age: '', gender: '', relation: '' });
    setForm({ ...form, total_passengers: count, passengers: updatedPassengers });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form };

    if (form.total_passengers <= 0) delete payload.passengers;

    try {
      const res = await bookFlight(payload);
      const data = await res.json();
      alert(data.message || 'Booking successful');
    } catch (error) {
      alert('❌ Failed to submit booking');
      console.error(error);
    }
  };

  return (
    <div className="component-box" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center' }}>✈️ Book Flight</h2>

      {/* ✅ Show flight details passed */}
      {state?.flight && (
        <div
          style={{
            backgroundColor: '#e3f2fd',
            padding: '10px',
            marginBottom: '20px',
            borderRadius: '8px',
            border: '1px solid #90caf9'
          }}
        >
          <strong>Selected Flight:</strong><br />
          ✈️ {state.flight.FlightName} ({state.flight.FlightCode})<br />
          {state.flight.DepartingCity} ➡ {state.flight.ArrivingCity}<br />
          Departure: {new Date(state.flight.DepartingTime).toLocaleString()}<br />
          Arrival: {new Date(state.flight.ArrivingTime).toLocaleString()}<br />
          Duration: {state.flight.Duration}, Price: ₹{state.flight.Price}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input name="FlightCode" placeholder="Flight Code" value={form.FlightCode} onChange={handleChange} readOnly />

        <select name="trip_type" value={form.trip_type} onChange={handleChange}>
          <option value="One-way">One-way</option>
          <option value="Round-trip">Round-trip</option>
        </select>

        <input name="booking_date" type="date" value={form.booking_date} onChange={handleChange} required />

        {form.trip_type === 'Round-trip' && (
          <input name="return_date" type="date" value={form.return_date} onChange={handleChange} />
        )}

        <input
          type="number"
          name="total_passengers"
          placeholder="Total Passengers"
          value={form.total_passengers}
          onChange={handlePassengerCount}
          min="1"
          required
        />

        <input name="contact_name" placeholder="Your Name" value={form.contact_name} onChange={handleChange} required />
        <input type="email" name="contact_email" placeholder="Your Email" value={form.contact_email} onChange={handleChange} required />
        <input name="contact_phone" placeholder="Your Phone" value={form.contact_phone} onChange={handleChange} required />

        {/* 🟡 Passenger Info */}
        {form.total_passengers >= 1 && (
          <>
            <div
              style={{
                backgroundColor: '#fff3cd',
                color: '#856404',
                padding: '10px',
                marginBottom: '10px',
                border: '1px solid #ffeeba'
              }}
            >
              <strong>Note:</strong> The contact person (you) is <u>not automatically added</u> to the passenger list.
              <br />
              Please fill in details for <strong>each passenger individually</strong>, including yourself if you're traveling.
            </div>

            <h4>Passenger Details</h4>
            {form.passengers.map((p, i) => (
              <div key={i} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                <input
                  placeholder="Name"
                  value={p.name}
                  onChange={(e) => handlePassengerChange(i, 'name', e.target.value)}
                  required
                />
                <input
                  placeholder="Age"
                  value={p.age}
                  onChange={(e) => handlePassengerChange(i, 'age', e.target.value)}
                  required
                />
                <select
                  value={p.gender}
                  onChange={(e) => handlePassengerChange(i, 'gender', e.target.value)}
                  required
                >
                  <option value="">Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
                <input
                  placeholder="Relation"
                  value={p.relation}
                  onChange={(e) => handlePassengerChange(i, 'relation', e.target.value)}
                />
              </div>
            ))}
          </>
        )}

        <button
          type="submit"
          style={{
            marginTop: '20px',
            padding: '10px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none'
          }}
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default BookingComponent;
