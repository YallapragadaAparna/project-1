/*
import React, { useState } from 'react';
import { registerUser } from '../services/api';

const RegisterComponent = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    role: 'customer', // default role
  });

  const handleRegister = async () => {
    try {
      const res = await registerUser(form);
      const data = await res.json();
      alert(data.message || 'Registered');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <div className="component-box">
      <input
        type="text"
        placeholder="Username"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />
        
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        style={{ display: 'block', marginBottom: '10px', width: '100%', padding: '8px' }}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <select
        value={form.role}
        onChange={(e) => setForm({ ...form, role: e.target.value })}
      >
        <option value="customer">Customer</option>
        <option value="admin">Admin</option>
      </select>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

const UserRegisterPage = () => {
  return (
    <div className="page-box">
      <h2>User Registration</h2>
      <RegisterComponent />
    </div>
  );
};

export default UserRegisterPage;*/
import React, { useState } from 'react';
import { registerUser } from '../services/api';
import { useNavigate } from 'react-router-dom';
import './UserRegisterPage.css';

const RegisterComponent = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    role: 'customer',
  });

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await registerUser(form);  
      const data = await res.json();
      if (res.ok) {
        alert(data.message || 'Registered successfully');
        navigate('/login');
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <>
      <input
        type="text"
        placeholder="Username"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
        className="input-field"
      />
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="input-field"
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        className="input-field"
      />
      <select
        value={form.role}
        onChange={(e) => setForm({ ...form, role: e.target.value })}
        className="input-field"
      >
        <option value="customer">Customer</option>
        <option value="admin">Admin</option>
      </select>
      <button onClick={handleRegister} className="login-button">
        Register
      </button>
      <p className="bottom-text">
        Already have an account? <a href="/login">Login</a>
      </p>
    </>
  );
};

const UserRegisterPage = () => {
  return (
    <div className="container">
      <div className="login-box">
        <h2 className="login-title">User Registration</h2>
        <hr className="divider" />
        <RegisterComponent />
      </div>
    </div>
  );
};

export default UserRegisterPage;