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