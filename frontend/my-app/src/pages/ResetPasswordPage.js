import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { resetPassword } from '../services/api';
import './ResetPasswordPage.css'; // ✅ Or use 'ResetPasswordPage.css' if you created a separate file

const ResetPasswordPage = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = async () => {
    try {
      const res = await resetPassword(token, { newPassword });
      const data = await res.json();
      if (res.ok) {
        setMessage(data.message);
      } else {
        setMessage(data.error || '❌ Reset failed');
      }
    } catch (error) {
      setMessage('❌ Error resetting password');
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Reset Password</h2>
      <input
        type="password"
        placeholder="Enter your new password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button onClick={handleReset}>Reset Password</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPasswordPage;
