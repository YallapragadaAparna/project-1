/*import React, { useState } from 'react';
import { registerUser } from '../services/api';

const RegisterComponent = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

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
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
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

export default UserRegisterPage;
