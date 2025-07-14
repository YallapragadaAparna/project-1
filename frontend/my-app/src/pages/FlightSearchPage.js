import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFlights } from '../services/api';
import './FlightSearchPage.css';

const FlightSearchPage = () => {
  const [criteria, setCriteria] = useState({
    DepartingCity: '',
    ArrivingCity: ''
  });

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
        console.error('❌ JSON Error:', jsonError);
        const text = await res.text();
        console.error('Raw response:', text);
        alert('❌ Invalid response from server');
        return;
      }

      if (res.ok) {
        if (Array.isArray(data) && data.length > 0) {
          navigate('/results', { state: { flights: data } }); // ✅ NEW PAGE
        } else {
          alert('No flights found');
        }
      } else {
        alert(data?.message || '❌ Failed to fetch flights');
      }

    } catch (err) {
      console.error('❌ Error:', err);
      alert('❌ Network or server error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flight-search-container">
      <h2>✈️ Flight Search</h2>

      <div className="flight-form-box">
        <div className="flight-form">
          <label>Departing City *</label>
          <input
            placeholder="From"
            value={criteria.DepartingCity}
            onChange={(e) => setCriteria({ ...criteria, DepartingCity: e.target.value })}
          />

          <label>Arriving City *</label>
          <input
            placeholder="To"
            value={criteria.ArrivingCity}
            onChange={(e) => setCriteria({ ...criteria, ArrivingCity: e.target.value })}
          />

          <button onClick={handleSearch} disabled={loading}>
            {loading ? 'Searching...' : 'Search Flights'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlightSearchPage;
