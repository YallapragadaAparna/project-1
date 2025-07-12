/*
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../services/api';

const AdminLoginPage = () => {
  const [form, setForm] = useState({ admin_name: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await loginAdmin(form); // POST to /api/admins/login
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('token', data.token); // ✅ Save token
      alert('Login successful!');
      navigate('/admin/flights/add'); // 🔁 Redirect to add flights
    } else {
      alert(data.message || 'Login failed');
    }
  };
return (
    <div className="page-box">
      <h2>🛂 Admin Login</h2>
      <div className="component-box">
        <input
          type="text"
          placeholder="Admin Name"
          value={form.admin_name}
          onChange={(e) => setForm({ ...form, admin_name: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};


export default AdminLoginPage;*/
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../services/api';

const AdminLoginPage = () => {
  const [form, setForm] = useState({ admin_name: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async () => {
    // ✅ Check if fields are empty before calling API
    if (!form.admin_name.trim() || !form.password.trim()) {
      alert('❌ Please enter both Admin Name and Password');
      return;
    }

    try {
      const res = await loginAdmin(form); // POST to /api/admins/login
      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem('token', data.token); // ✅ Save token
        alert(data.message || 'Login successful!');
        navigate('/admin/flights/add'); // 🔁 Redirect to add flights
      } else {
        alert(data.message || '❌ Invalid Admin Name or Password');
      }
    } catch (err) {
      console.error('Admin login error:', err);
      alert('❌ Login failed due to server or network error');
    }
  };

  return (
    <div className="page-box">
      <div className="component-box">
        <h2 style={{ textAlign: 'center' }}>Admin Login</h2>

        <input
          type="text"
          placeholder="Admin Name"
          value={form.admin_name}
          onChange={(e) => setForm({ ...form, admin_name: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button onClick={handleLogin}>Login</button>

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
            <a href="/admin/register" style={{ color: '#007bff' }}>
              Register
            </a>
          </span>
          <a href="/forgot-password" style={{ color: '#007bff' }}>
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;