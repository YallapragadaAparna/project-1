/*
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
      <div className="text-center">
        {/* Title *}
        <h1 className="text-5xl font-bold text-gray-800 mb-2 flex justify-center items-center gap-2">
          ✈️ Travel Booking System
        </h1>
        <h2 className="text-2xl text-gray-600 mb-8">Choose your category</h2>

        {/* Login Options *}
        <div className="flex flex-col sm:flex-row gap-10 justify-center items-center">
          {/* Admin Login Block *}
          <div
            className="w-72 h-72 bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all flex flex-col justify-center items-center cursor-pointer"
            onClick={() => navigate('/admin/login')}
          >
            <div className="text-5xl mb-4">🛡️</div>
            <h3 className="text-xl font-bold text-blue-600 mb-1">Admin Login</h3>
            <p className="text-gray-600 text-sm px-6 text-center">
              Manage flights, users, and bookings.
            </p>
          </div>

          {/* User Login Block *}
          <div
            className="w-72 h-72 bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all flex flex-col justify-center items-center cursor-pointer"
            onClick={() => navigate('/login')}
          >
            <div className="text-5xl mb-4">👤</div>
            <h3 className="text-xl font-bold text-green-600 mb-1">User Login</h3>
            <p className="text-gray-600 text-sm px-6 text-center">
              Book flights and view travel info.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;*/
import React from 'react';
import styles from './LandingPage.module.css';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.landingWrapper}>
      <h1 className={styles.blinkingHeading}>Welcome to Flight Booking</h1>
      <h2 className={styles.category}>Choose your category</h2>

      <div className={styles.cardContainer}>
        <div className={`${styles.card} ${styles.adminCard}`} onClick={() => navigate('/admin/login')}>
          <span role="img" aria-label="shield" className={styles.icon}>🛡️</span>
          <h3>Admin Login</h3>
          <p>Manage flights, users, and bookings.</p>
        </div>

        <div className={`${styles.card} ${styles.userCard}`} onClick={() => navigate('/login')}>
          <span role="img" aria-label="user" className={styles.icon}>🧑‍💼</span>
          <h3>User Login</h3>
          <p>Book flights and view travel info.</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;