// src/services/api.js

//const API_BASE = 'http://localhost:5000/api';
const API_BASE = 'https://travelbooking-backend-xcge.onrender.com/api';

// 🔑 User Auth
export const loginUser = (data) => fetch(`${API_BASE}/auth/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
});

export const registerUser = (data) => fetch(`${API_BASE}/auth/register`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
});

// 🔑 Admin Auth
export const loginAdmin = (data) => fetch(`${API_BASE}/admins/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
});

export const registerAdmin = (data) => fetch(`${API_BASE}/admins/register`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
});

// 🔧 Admin Profile
export const getAdminProfile = (token) => fetch(`${API_BASE}/admins/profile`, {
  headers: { Authorization: token }
});

// ✈️ Add Flight (Admin)
export const addFlight = (data, token) => fetch(`${API_BASE}/admin/flights/add`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: token
  },
  body: JSON.stringify(data)
});

// ✈️ Get Flights (Corrected)
export const getFlights = (criteria) => {
  console.log(criteria)
  console.log(JSON.stringify(criteria))
  return fetch(`${API_BASE}/flights/search`, { // ✅ POST endpoint for flight search
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(criteria) // ✅ Send criteria as JSON body
  });
};

// 📝 Book Flight
export const bookFlight = (bookingData) => fetch(`${API_BASE}/bookings/book`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(bookingData)
});

// 💳 Make Payment
export const makePayment = (paymentData) => fetch(`${API_BASE}/payment/pay`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(paymentData)
});
export const sendForgotPasswordEmail = (body) => {
  return fetch(`${API_BASE}/auth/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
};

export const resetPassword = (token, body) => {
  return fetch(`${API_BASE}/auth/reset-password/${token}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
};
export const payNow = async (paymentData) => {
  return fetch('/api/payment/pay', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(paymentData)
  });
};
