// import React, { useState } from 'react';
// import { sendForgotPasswordEmail } from '../services/api';
// import './ForgotPasswordPage';
// const ForgotPasswordPage = () => {
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');

//   const handleSubmit = async () => {
//     try {
//       const res = await sendForgotPasswordEmail({ email });
//       const data = await res.json();
//       if (res.ok) {
//         setMessage(data.message);
//       } else {
//         setMessage(data.error || '❌ Failed to send reset link');
//       }
//     } catch (error) {
//       setMessage('❌ Something went wrong');
//     }
//   };

//   return (
//     <div>
//       <h2>Forgot Password</h2>
//       <input
//         type="email"
//         placeholder="Enter your registered email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <button onClick={handleSubmit}>Send Reset Link</button>
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default ForgotPasswordPage;


import React, { useState } from 'react';
import { sendForgotPasswordEmail } from '../services/api';
import './ForgotPasswordPage.css';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    try {
      const res = await sendForgotPasswordEmail({ email });
      const data = await res.json();
      if (res.ok) {
        setMessage(data.message);
      } else {
        setMessage(data.error || '❌ Failed to send reset link');
      }
    } catch (error) {
      setMessage('❌ Something went wrong');
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      <input
        type="email"
        placeholder="Enter your registered email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleSubmit}>Send Reset Link</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ForgotPasswordPage;
