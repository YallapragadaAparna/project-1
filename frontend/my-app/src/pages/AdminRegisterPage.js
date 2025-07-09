/*import React, { useState } from 'react';
import { registerAdmin } from '../services/api';

const AdminRegister = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    airport_code: '',
    airport_name: '',
    city: '',
    country: ''
  });

  const handleRegister = async () => {
    const res = await registerAdmin(form);
    const data = await res.json();
    if (res.ok) {
      alert('✅ Admin Registered Successfully');
    } else {
      alert(`❌ Registration failed: ${data.message || 'Unknown error'}`);
    }
  };

  return (
    <div>
      <h2>Admin Register</h2>
      {Object.keys(form).map((key) => (
        <input
          key={key}
          placeholder={key.replace(/_/g, ' ')}
          value={form[key]}
          onChange={e => setForm({ ...form, [key]: e.target.value })}
        />
      ))}
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default AdminRegister;*/
// src/pages/AdminRegisterPage.js
/*import React, { useState } from 'react';
import { registerAdmin } from '../services/api';

const AdminRegisterPage = () => {
  const [form, setForm] = useState({
    name: '',
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
          name: '',
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
    <div className="page-box">
      <h2>🛫 Admin Registration</h2>
      <div className="component-box">
        {Object.keys(form).map((key) => (
          <input
            key={key}
            type={key === 'password' ? 'password' : 'text'}
            placeholder={key.replace(/_/g, ' ').toUpperCase()}
            value={form[key]}
            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            style={{ display: 'block', margin: '8px 0', padding: '8px' }}
          />
        ))}
        <button onClick={handleRegister} style={{ padding: '10px 20px' }}>
          Register
        </button>
      </div>
    </div>
  );
};

export default AdminRegisterPage;*/
import React, { useState } from 'react';
import { registerAdmin } from '../services/api';

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
    <div className="page-box">
      <h2>🛫 Admin Registration</h2>
      <div className="component-box">
        {Object.keys(form).map((key) => (
          <input
            key={key}
            type={key === 'password' ? 'password' : 'text'}
            placeholder={key.replace(/_/g, ' ').toUpperCase()}
            value={form[key]}
            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            style={{ display: 'block', margin: '8px 0', padding: '8px' }}
          />
        ))}
        <button onClick={handleRegister} style={{ padding: '10px 20px' }}>
          Register
        </button>
      </div>
    </div>
  );
};

export default AdminRegisterPage;

