import React, { useState } from 'react';
import { registerAdmin } from '../services/api';
import './AdminRegisterPage.css'; // Import your CSS file

const AdminRegisterPage = () => {
  const [form, setForm] = useState({
    admin_name: '',
    password: '',
    email: '',
    airport_code: '',
    airport_name: '',
    city: '',
    country: ''
  });

  const handleRegister = async () => {
    try {
      const res = await registerAdmin(form);
      const data = await res.json();
      if (res.ok) {
        alert('✅ Admin Registered Successfully');
        setForm({
          admin_name: '',
          password: '',
          email: '',
          airport_code: '',
          airport_name: '',
          city: '',
          country: ''
        });
      } else {
        alert(`❌ Registration failed: ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      alert('❌ Network error or server is down.');
    }
  };

  return (
    <div className="container">
      <div className="login-box">
        <h2 className="login-title">Admin Registration</h2>
        <hr className="divider" />
        {Object.keys(form).map((key) => (
          <input
            key={key}
            type={key === 'password' ? 'password' : 'text'}
            placeholder={key.replace(/_/g, ' ').toUpperCase()}
            value={form[key]}
            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            className="input-field"
          />
        ))}
        <button onClick={handleRegister} className="login-button">
          Register
        </button>
      </div>
    </div>
  );
};

export default AdminRegisterPage;

