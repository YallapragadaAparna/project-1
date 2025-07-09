// src/pages/AdminLoginPage.js
/*import React, { useState } from 'react';
import { loginAdmin } from '../services/api';

const AdminLoginPage = () => {
  const [form, setForm] = useState({ admin_name: '', password: '' });

  const handleLogin = async () => {
    try {
      const res = await loginAdmin(form);
      const data = await res.json();

      if (res.ok) {
        alert('✅ Admin Login Successful');
        console.log('Admin Token:', data.token);
        // Optionally store token in localStorage
        localStorage.setItem('adminToken', data.token);
      } else {
        alert(`❌ Login failed: ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      alert('❌ Network or server error.');
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

export default AdminLoginPage;
*/
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


export default AdminLoginPage;