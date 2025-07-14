import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import UserRegisterPage from './pages/UserRegisterPage';
import UserLoginPage from './pages/UserLoginPage';
import AdminRegisterPage from './pages/AdminRegisterPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AddFlightPage from './pages/AddFlightPage';
import FlightSearchPage from './pages/FlightSearchPage';
import FlightResultsPage from './pages/FlightResultsPage'; // ✅ Added
import BookingComponent from './pages/BookingComponent';
import LandingPage from './pages/LandingPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';

import PaymentPage from './pages/PaymentPage';
import ConfirmationPage from './pages/ConfirmationPage';

function App() {
  const token = localStorage.getItem('token');

  return (
    <div className="App">
      <h1 style={{ textAlign: 'center' }}>✈️ Travel Booking System</h1>
      <Routes>
        <Route path="/" element={<LandingPage />} />
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
              <Navigate to="/admin/login" />
            )
          }
        />
        <Route path="/search-flights" element={<FlightSearchPage />} />
        <Route path="/results" element={<FlightResultsPage />} /> {/* ✅ New Route */}
        <Route
          path="/book"
          element={token ? <BookingComponent /> : <Navigate to="/login" />}
        />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
      </Routes>
    </div>
  );
}

export default App;
