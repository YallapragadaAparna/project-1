import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const FlightResultsPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const flights = state?.flights || [];

  return (
    <div className="results-container">
      <h2>📋 Available Flights</h2>

      {flights.length === 0 ? (
        <p>No results found.</p>
      ) : (
        flights.map((flight, index) => (
          <div
            key={index}
            className="flight-card"
            onClick={() => navigate('/book', { state: { flight } })}
            style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px', cursor: 'pointer' }}
          >
            <strong>{flight.FlightName} ({flight.FlightCode})</strong><br />
            {flight.DepartingCity} ➡ {flight.ArrivingCity}<br />
            Departure: {new Date(flight.DepartingTime).toLocaleString()}<br />
            Arrival: {new Date(flight.ArrivingTime).toLocaleString()}<br />
            Duration: {flight.Duration}<br />
            Price: ₹{flight.Price}
          </div>
        ))
      )}
    </div>
  );
};

export default FlightResultsPage;
