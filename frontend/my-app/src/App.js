/*import React from 'react';
//import FlightComponent from './components/FlightComponent';
import SearchFlightsComponent from './components/SearchFlightsComponent';
function App() {
  return (
    <div className="App">
      <h1>✈️ Travel Booking</h1>
    
        <SearchFlightsComponent />
    </div>
  );
}

export default App;*/
/*import React, { useState } from 'react';
import './App.css';

// 🧩 AUTH (User)
import LoginComponent from './auth/loginComponent';
import RegisterComponent from './auth/registerComponent';

// 🧩 ADMIN
import AdminLogin from './admin/adminLogin';
import AdminRegister from './admin/adminRegister';
import AdminProfile from './admin/adminProfile';
import AddFlight from './admin/addFlight';

// 🧩 FLIGHT
import FlightSearchComponent from './flight/flightSearchComponent';

// 🧩 BOOKING
import BookingComponent from './booking/bookingComponent';

// 🧩 PAYMENT
import PaymentComponent from './payment/paymentComponent';

const App = () => {
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [token, setToken] = useState(''); // JWT token (for admin or user)

  return (
    <div style={{ padding: '20px' }}>
      <h1>✈️ Travel Booking System</h1>

      {/* USER AUTH *
      <h2>User Registration</h2>
      <RegisterComponent />

      <h2>User Login</h2>
      <LoginComponent />

      {/* ADMIN AUTH *
      <h2>Admin Registration</h2>
      <AdminRegister setToken={setToken} />

      <h2>Admin Login</h2>
      <AdminLogin setToken={setToken} />

      {/* ADMIN PROFILE + FLIGHT ADD *
      <h2>Admin Profile</h2>
      <AdminProfile token={token} />

      <h2>Add New Flight</h2>
      <AddFlight token={token} />

      {/* SEARCH FLIGHT *
      <h2>Search Flights</h2>
      <FlightSearchComponent onFlightSelect={setSelectedFlight} />

      {/* BOOKING *
      {selectedFlight && (
        <>
          <h2>Book Selected Flight</h2>
          <BookingComponent selectedFlight={selectedFlight} />
        </>
      )}

      {/* PAYMENT *
      {selectedFlight && (
        <>
          <h2>Payment</h2>
          <PaymentComponent selectedFlight={selectedFlight} />
        </>
      )}
    </div>
  );
};

export default App;*/
/* src/App.js
import React from 'react';
import './App.css';
import UserLoginPage from './pages/UserLoginPage';
import UserRegisterPage from './pages/UserRegisterPage';
function App() {
  return (
    <div className="App">
      <h1>✈️ Travel Booking System</h1>
      <UserLoginPage />
      <UserRegisterPage/>
    </div>
  );
}

export default App;*/
// App.js
import { Routes, Route,Navigate } from 'react-router-dom';
import './App.css';
import UserRegisterPage from './pages/UserRegisterPage';
import UserLoginPage from './pages/UserLoginPage';
import AdminRegisterPage from './pages/AdminRegisterPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AddFlightPage from './pages/AddFlightPage';
import FlightSearchPage from './pages/FlightSearchPage';
import BookingComponent from './pages/BookingComponent';
function App() {
   const token = localStorage.getItem('token');
  return (
    <div className="App">
      <h1 style={{ textAlign: 'center' }}>✈️ Travel Booking System</h1>
      <Routes>
        <Route path="/" element={<h2>Welcome to the Travel Booking System</h2>} />
        <Route path="/register" element={<UserRegisterPage />} />
         <Route path="/login" element={<UserLoginPage />} /> 
         <Route path="/admin/register" element={<AdminRegisterPage />} />
         <Route path="/admin/login" element={<AdminLoginPage />} />
         <Route
            path="/admin/flights/add"
            element={
              token ? (
                <AddFlightPage token={token} />
              ) : (
                <Navigate to="/admin/login" />)
              }/>
              <Route path="/search-flights" element={<FlightSearchPage />} />
        <Route path="/book" element={token ? <BookingComponent /> : <Navigate to="/login" />}/>
      </Routes>
    </div>
  );
}

export default App;
