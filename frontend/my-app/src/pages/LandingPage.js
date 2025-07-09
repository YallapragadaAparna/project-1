// ❌ Remove this line
// import { Button } from '@/components/ui/button';

/*import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-4">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Welcome to Travel Booking Portal</h1>

      <div className="flex flex-col sm:flex-row gap-6">
        <button
          className="px-8 py-4 text-lg bg-blue-600 hover:bg-blue-700 text-white rounded-2xl shadow-lg"
          onClick={() => navigate('/admin/login')}
        >
          Admin Login
        </button>

        <button
          className="px-8 py-4 text-lg bg-green-600 hover:bg-green-700 text-white rounded-2xl shadow-lg"
          onClick={() => navigate('/login')}
        >
          User Login
        </button>
      </div>
    </div>
  );
};

export default LandingPage;*/
/*import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, UserRound } from 'lucide-react'; // You can also use react-icons or heroicons

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-6">
      
      <h2 className="text-2xl font-semibold text-gray-700 mb-10 text-center">
        Welcome to Travel Booking Portal
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 w-full max-w-2xl">
        {/* Admin Login Block *}
        <div
          className="flex flex-col items-center justify-center bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all cursor-pointer"
          onClick={() => navigate('/admin/login')}
        >
          <ShieldCheck size={40} className="text-blue-600 mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">Admin Login</h3>
          <p className="text-gray-600 text-center">
            Access the admin dashboard and manage flights and bookings.
          </p>
        </div>

        {/* User Login Block *}
        <div
          className="flex flex-col items-center justify-center bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all cursor-pointer"
          onClick={() => navigate('/login')}
        >
          <UserRound size={40} className="text-green-600 mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">User Login</h3>
          <p className="text-gray-600 text-center">
            Book your flights and view your travel details easily.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;*/
/*import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-100 to-purple-200">
      {/* Title *}
      <div className="mb-10 text-center">
        <h1 className="text-5xl font-bold text-gray-800 flex items-center justify-center gap-2">
          ✈️ Travel Booking System
        </h1>
        <h2 className="text-2xl font-semibold text-gray-700 mt-2">
          Welcome to Travel Booking Portal
        </h2>
      </div>

      {/* Centered Squares *}
      <div className="flex flex-col sm:flex-row gap-12">
        {/* Admin Card *}
        <div
          className="w-64 h-64 bg-white rounded-3xl shadow-xl hover:shadow-2xl flex flex-col justify-center items-center cursor-pointer transform hover:scale-105 transition duration-300"
          onClick={() => navigate('/admin/login')}
        >
          <div className="text-4xl mb-4">🛡️</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Admin Login</h3>
          <p className="text-center text-sm text-gray-600 px-4">
            Manage flights and bookings
          </p>
        </div>

        {/* User Card *}
        <div
          className="w-64 h-64 bg-white rounded-3xl shadow-xl hover:shadow-2xl flex flex-col justify-center items-center cursor-pointer transform hover:scale-105 transition duration-300"
          onClick={() => navigate('/login')}
        >
          <div className="text-4xl mb-4">👤</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">User Login</h3>
          <p className="text-center text-sm text-gray-600 px-4">
            Book your travel tickets easily
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;*/
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
      <div className="text-center">
        {/* Title */}
        <h1 className="text-5xl font-bold text-gray-800 mb-2 flex justify-center items-center gap-2">
          ✈️ Travel Booking System
        </h1>
        <h2 className="text-2xl text-gray-600 mb-8">Choose your category</h2>

        {/* Login Options */}
        <div className="flex flex-col sm:flex-row gap-10 justify-center items-center">
          {/* Admin Login Block */}
          <div
            className="w-72 h-72 bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all flex flex-col justify-center items-center cursor-pointer"
            onClick={() => navigate('/admin/login')}
          >
            <div className="text-5xl mb-4">🛡️</div>
            <h3 className="text-xl font-bold text-blue-600 mb-1">Admin Login</h3>
            <p className="text-gray-600 text-sm px-6 text-center">
              Manage flights, users, and bookings.
            </p>
          </div>

          {/* User Login Block */}
          <div
            className="w-72 h-72 bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all flex flex-col justify-center items-center cursor-pointer"
            onClick={() => navigate('/login')}
          >
            <div className="text-5xl mb-4">👤</div>
            <h3 className="text-xl font-bold text-green-600 mb-1">User Login</h3>
            <p className="text-gray-600 text-sm px-6 text-center">
              Book flights and view travel info.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
