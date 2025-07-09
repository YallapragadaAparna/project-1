/*import React, { useState } from 'react';
import { getFlights } from '../services/api';
const FlightPage = () => {
  const [criteria, setCriteria] = useState({
    DepartingCity: '',
    ArrivingCity: '',
    FlightName: '',
    FlightCode: '',
    DepartingTime: '',
    ArrivingTime: '',
    Duration: '',
    Price: ''
  });

  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!criteria.DepartingCity || !criteria.ArrivingCity) {
      alert('⚠️ Please enter both Departing City and Arriving City');
      return;
    }

    setLoading(true);

    try {
      const res = await getFlights(criteria);
      let data;

      try {
        data = await res.json(); // ✅ parse as JSON
      } catch (jsonError) {
        console.error('❌ Failed to parse JSON:', jsonError);
         const text = await res.text();
         console.error('🚨 Raw response:', text);
        alert('❌ Invalid or malformed JSON response from the server');
        return;
      }

      if (res.ok) {
        if (Array.isArray(data)) {
          setFlights(data);
        } else {
          alert('⚠️ Unexpected response format. Expected a list of flights.');
          console.warn('Server response:', data);
        }
      } else {
        console.error('❌ Server responded with error:', res.status, res.statusText);
        alert(data?.message || '❌ Failed to fetch flights');
      }

    } catch (error) {
      console.error('❌ Network or server error:', error);
      alert('❌ Network or server error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>✈️ Flight Search</h2>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ fontWeight: 'bold' }}>
  Departing City <span style={{ color: 'red' }}>*</span>
</label>
        <input
          placeholder="Departing City"
          value={criteria.DepartingCity}
          onChange={(e) => setCriteria({ ...criteria, DepartingCity: e.target.value })}
          style={{ marginBottom: '10px', display: 'block', padding: '8px' }}
        />
        <label style={{ fontWeight: 'bold' }}>
  Arriving City <span style={{ color: 'red' }}>*</span>
        </label>
        <input
          placeholder="Arriving City"
          value={criteria.ArrivingCity}
          onChange={(e) => setCriteria({ ...criteria, ArrivingCity: e.target.value })}
          style={{ marginBottom: '10px', display: 'block', padding: '8px' }}
        />

        {['FlightName', 'FlightCode', 'DepartingTime', 'ArrivingTime', 'Duration', 'Price'].map((field) => (
          <input
            key={field}
            type={
              field.toLowerCase().includes('time') ? 'datetime-local' :
              field === 'Price' ? 'number' : 'text'
            }
            placeholder={field}
            value={criteria[field]}
            onChange={(e) => setCriteria({ ...criteria, [field]: e.target.value })}
            style={{ marginBottom: '10px', display: 'block', padding: '8px' }}
          />
        ))}

        <button
          onClick={handleSearch}
          style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff' }}
        >
          {loading ? 'Searching...' : 'Search Flights'}
        </button>
      </div>

      {flights.length > 0 && (
        <div>
          <h3>📋 Search Results</h3>
          {flights.map((flight, index) => (
            <div key={index} style={{ border: '1px solid #ccc', padding: '12px', marginBottom: '10px' }}>
              <strong>{flight.FlightName} ({flight.FlightCode})</strong><br />
              {flight.DepartingCity} ➡ {flight.ArrivingCity}<br />
              Departure: {new Date(flight.DepartingTime).toLocaleString()}<br />
              Arrival: {new Date(flight.ArrivingTime).toLocaleString()}<br />
              Duration: {flight.Duration}<br />
              Price: ₹{flight.Price}<br />
              Source: {flight.source || 'N/A'}
            </div>
          ))}
        </div>
      )}

      {flights.length === 0 && !loading && (
        <p style={{ color: 'gray' }}>No results found.</p>
      )}
    </div>
  );
};

export default FlightPage;*/
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFlights } from '../services/api';

const FlightSearchPage = () => {
  const [criteria, setCriteria] = useState({
    DepartingCity: '',
    ArrivingCity: '',
    FlightName: '',
    FlightCode: '',
    DepartingTime: '',
    ArrivingTime: '',
    Duration: '',
    Price: ''
  });

  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!criteria.DepartingCity || !criteria.ArrivingCity) {
      alert('⚠️ Please enter both Departing City and Arriving City');
      return;
    }

    setLoading(true);

    try {
      const res = await getFlights(criteria);
      let data;

      try {
        data = await res.json();
      } catch (jsonError) {
        console.error('❌ Failed to parse JSON:', jsonError);
        const text = await res.text();
        console.error('🚨 Raw response:', text);
        alert('❌ Invalid or malformed JSON response from the server');
        return;
      }

      if (res.ok) {
        if (Array.isArray(data)) {
          setFlights(data);
        } else {
          alert('⚠️ Unexpected response format. Expected a list of flights.');
        }
      } else {
        console.error('❌ Server responded with error:', res.status, res.statusText);
        alert(data?.message || '❌ Failed to fetch flights');
      }

    } catch (error) {
      console.error('❌ Network or server error:', error);
      alert('❌ Network or server error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>✈️ Flight Search</h2>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ fontWeight: 'bold' }}>
          Departing City <span style={{ color: 'red' }}>*</span>
        </label>
        <input
          placeholder="Departing City"
          value={criteria.DepartingCity}
          onChange={(e) => setCriteria({ ...criteria, DepartingCity: e.target.value })}
          style={{ marginBottom: '10px', display: 'block', padding: '8px' }}
        />

        <label style={{ fontWeight: 'bold' }}>
          Arriving City <span style={{ color: 'red' }}>*</span>
        </label>
        <input
          placeholder="Arriving City"
          value={criteria.ArrivingCity}
          onChange={(e) => setCriteria({ ...criteria, ArrivingCity: e.target.value })}
          style={{ marginBottom: '10px', display: 'block', padding: '8px' }}
        />

        {['FlightName', 'FlightCode', 'DepartingTime', 'ArrivingTime', 'Duration', 'Price'].map((field) => (
          <input
            key={field}
            type={
              field.toLowerCase().includes('time') ? 'datetime-local' :
              field === 'Price' ? 'number' : 'text'
            }
            placeholder={field}
            value={criteria[field]}
            onChange={(e) => setCriteria({ ...criteria, [field]: e.target.value })}
            style={{ marginBottom: '10px', display: 'block', padding: '8px' }}
          />
        ))}

        <button
          onClick={handleSearch}
          style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff' }}
        >
          {loading ? 'Searching...' : 'Search Flights'}
        </button>
      </div>

      {flights.length > 0 && (
        <div>
          <h3>📋 Search Results</h3>
          {flights.map((flight, index) => (
            <div
              key={index}
              //onClick={() => navigate('/book', { state: { FlightCode: flight.FlightCode } })}
              onClick={() => navigate('/book', { state: { flight } })}

                    style={{
                border: '1px solid #ccc',
                padding: '12px',
                marginBottom: '10px',
                cursor: 'pointer',
                backgroundColor: '#f9f9f9'
              }}
            >
              <strong>{flight.FlightName} ({flight.FlightCode})</strong><br />
              {flight.DepartingCity} ➡ {flight.ArrivingCity}<br />
              Departure: {new Date(flight.DepartingTime).toLocaleString()}<br />
              Arrival: {new Date(flight.ArrivingTime).toLocaleString()}<br />
              Duration: {flight.Duration}<br />
              Price: ₹{flight.Price}<br />
              Source: {flight.source || 'N/A'}
            </div>
          ))}
        </div>
      )}

      {flights.length === 0 && !loading && (
        <p style={{ color: 'gray' }}>No results found.</p>
      )}
    </div>
  );
};

export default FlightSearchPage;
