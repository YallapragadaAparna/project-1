import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';

const LoginComponent = ({ onLogin }) => {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate(); 

  const handleLogin = async () => {
    try {
      const res = await loginUser(form);
      const data = await res.json();

      if (res.ok && data.token) {
        alert(data.message || 'Login Successful');
        localStorage.setItem('token', data.token);
        if (onLogin) onLogin(data.token);
        navigate('/search-flights');
      } else {
        alert(data.message || '❌ Invalid login');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Login failed');
    }
  };

  return (
    <div className="component-box" style={{ maxWidth: '400px', margin: '0 auto' }}>
      <input
        type="text"
        placeholder="Username"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
        style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '10px' }}
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '10px' }}
      />
      <button
        onClick={handleLogin}
        style={{
          width: '100%',
          padding: '10px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
          marginBottom: '10px',
        }}
      >
        Login
      </button>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '14px',
          marginTop: '10px',
        }}
      >
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
      <h2 style={{ textAlign: 'center' }}>User Login</h2>
      <LoginComponent onLogin={handleUserLogin} />
    </div>
  );
};

export default UserLoginPage;
