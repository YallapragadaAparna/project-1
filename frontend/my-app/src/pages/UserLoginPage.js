import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';
import './UserLoginPage.css';

const LoginComponent = ({ onLogin }) => {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async () => {
    // ✅ Check for empty fields first
    if (!form.username.trim() || !form.password.trim()) {
      alert('❌ Please enter both username and password');
      return;
    }

    try {
      const res = await loginUser(form);
      const data = await res.json();

      if (res.ok && data.token) {
        alert(data.message || 'Login Successful');
        localStorage.setItem('token', data.token);
        if (onLogin) onLogin(data.token);
        navigate('/search-flights');
      } else {
        alert(data.message || '❌ Invalid username or password');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('❌ Login failed due to server error');
    }
  };

  return (
    <div className="component-box">
      <h2>User Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button onClick={handleLogin}>
        Login
      </button>

      <div className="links">
        <span>
          Don’t have an account?{' '}
          <a href="/register" style={{ color: '#007bff' }}>
            Register
          </a>
        </span>
        <a href="/forgot-password" style={{ color: '#007bff' }}>
          Forgot Password?
        </a>
      </div>
    </div>
  );
};

const UserLoginPage = () => {
  const handleUserLogin = (token) => {
    console.log('User Token:', token);
  };

  return (
    <div className="page-box">
      <LoginComponent onLogin={handleUserLogin} />
    </div>
  );
};

export default UserLoginPage;