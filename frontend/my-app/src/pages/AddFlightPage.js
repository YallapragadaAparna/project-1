// src/pages/AddFlightPage.js
import React, { useState } from 'react';
import { addFlight } from '../services/api';

const AddFlightPage = ({ token }) => {
  const [flight, setFlight] = useState({
    FlightName: '',
    FlightCode: '',
    DepartingCity: '',
    DepartingTime: '',
    ArrivingCity: '',
    ArrivingTime: '',
    Duration: '',
    Price: ''
  });

  const handleAddFlight = async () => {
    try {
      // Ensure price is a number
      const flightData = { ...flight, Price: parseFloat(flight.Price) };

      const res = await addFlight(flightData, token);
      const data = await res.json();

      if (res.ok) {
        alert('✅ Flight added successfully');
        setFlight({
          FlightName: '',
          FlightCode: '',
          DepartingCity: '',
          DepartingTime: '',
          ArrivingCity: '',
          ArrivingTime: '',
          Duration: '',
          Price: ''
        });
      } else {
        alert(`❌ Failed to add flight: ${data.message}`);
      }
    } catch (error) {
      alert('❌ Server or network error');
      console.error(error);
    }
  };

  return (
   <div className="page-box">
  <div className="component-box">
    <h2 className="form-title">🛫 Add New Flight</h2>
        {Object.entries(flight).map(([key, value]) => (
          <input
            key={key}
            type={key === 'Price' ? 'number' : 'text'}
            placeholder={key.replace(/([A-Z])/g, ' $1').trim()}
            value={value}
            onChange={(e) => setFlight({ ...flight, [key]: e.target.value })}
            style={{ display: 'block', marginBottom: '10px', padding: '8px' }}
          />
        ))}
        <button onClick={handleAddFlight} style={{ padding: '10px 20px' }}>
          Add Flight
        </button>
      </div>
    </div>
  );
};

export default AddFlightPage;
