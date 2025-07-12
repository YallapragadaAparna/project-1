/*const db = require('../db');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const sendEmail = require('../utils/email');

// Forgot Password - generates token & sends email
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  db.query('SELECT * FROM forgot_password_users WHERE email = ?', [email], async (err, results) => {
    if (err) {
      console.error('❌ SELECT error:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length === 0) return res.status(404).json({ error: 'User not found' });

    const token = crypto.randomBytes(20).toString('hex');
    const expiry = Date.now() + 3600000; // 1 hour

    db.query(
      'UPDATE forgot_password_users SET reset_token = ?, reset_token_expiry = ? WHERE email = ?',
      [token, expiry, email],
      async (err2) => {
        if (err2) {
          console.error('❌ UPDATE error:', err2);
          return res.status(500).json({ error: 'Error saving token' });
        }

        const resetUrl = `http://localhost:3000/reset-password/${token}`;

        await sendEmail(
          email,
          'Reset Your Password',
          `You requested a password reset. Click the link below:\n\n${resetUrl}\n\nThis link will expire in 1 hour.`
        );

        return res.json({ message: '✅ Reset link sent to your email (mocked)' });
      }
    );
  });
};

// Reset Password - updates password using token
exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({ error: 'Token and new password are required' });
  }

  db.query(
    'SELECT * FROM forgot_password_users WHERE reset_token = ? AND reset_token_expiry > ?',
    [token, Date.now()],
    async (err, results) => {
      if (err) {
        console.error('❌ SELECT token error:', err);
        return res.status(500).json({ error: 'Database error' });
      }

      if (results.length === 0) {
        return res.status(400).json({ error: 'Invalid or expired token' });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      db.query(
        'UPDATE forgot_password_users SET password = ?, reset_token = NULL, reset_token_expiry = NULL WHERE reset_token = ?',
        [hashedPassword, token],
        (err2) => {
          if (err2) {
            console.error('❌ UPDATE password error:', err2);
            return res.status(500).json({ error: 'Error updating password' });
          }

          return res.json({ message: '✅ Password has been reset successfully' });
        }
      );
    }
  );
};*/
/*const db = require('../db');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const {sendEmail} = require('../utils/email'); // ✅ Must export correctly

// 👉 Send reset password link
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required' });

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (results.length === 0) return res.status(404).json({ error: 'User not found' });

    const token = crypto.randomBytes(20).toString('hex');
    const expiry = Date.now() + 3600000; // 1 hour

    db.query(
      'UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE email = ?',
      [token, expiry, email],
      async (err2) => {
        if (err2) return res.status(500).json({ error: 'Error saving token' });

        const resetUrl = `http://localhost:3000/reset-password/${token}`;
        try {
          await sendEmail(
            email,
            'Reset Your Password',
            `You requested a password reset. Click the link below:\n\n${resetUrl}\n\nThis link will expire in 1 hour.`
          );
          return res.json({ message: '✅ Reset link sent to your email' });
        } catch (emailErr) {
          console.error('❌ Email failed:', emailErr);
          return res.status(500).json({ error: 'Failed to send reset email' });
        }
      }
    );
  });
};

// 👉 Reset password using token
exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  if (!token || !newPassword)
    return res.status(400).json({ error: 'Token and new password required' });

  db.query(
    'SELECT * FROM users WHERE reset_token = ? AND reset_token_expiry > ?',
    [token, Date.now()],
    async (err, results) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      if (results.length === 0)
        return res.status(400).json({ error: 'Invalid or expired token' });

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      db.query(
        'UPDATE users SET password = ?, reset_token = NULL, reset_token_expiry = NULL WHERE reset_token = ?',
        [hashedPassword, token],
        (err2) => {
          if (err2) return res.status(500).json({ error: 'Error updating password' });
          return res.json({ message: '✅ Password reset successful' });
        }
      );
    }
  );
};*/
/*const db = require('../db');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const { sendEmail } = require('../utils/email'); // Make sure it's exported correctly

// 👉 Send Reset Link
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required' });

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) {
      console.error('DB SELECT error:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const token = crypto.randomBytes(20).toString('hex');
    const expiry = Date.now() + 3600000; // 1 hour

    db.query(
      'UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE email = ?',
      [token, expiry, email],
      async (err2) => {
        if (err2) {
          console.error('DB UPDATE error:', err2);
          return res.status(500).json({ error: 'Failed to save reset token' });
        }

        const resetUrl = `http://localhost:3000/reset-password/${token}`;
        try {
          await sendEmail(
            email,
            'Reset Your Password',
            `Click this link to reset your password:\n\n${resetUrl}\n\nThis link expires in 1 hour.`
          );
          return res.json({ message: '✅ Reset link sent to your email' });
        } catch (emailErr) {
          console.error('Email send failed:', emailErr);
          return res.status(500).json({ error: 'Failed to send email' });
        }
      }
    );
  });
};

// 👉 Reset Password
exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({ error: 'Token and new password are required' });
  }

  db.query(
    'SELECT * FROM users WHERE reset_token = ? AND reset_token_expiry > ?',
    [token, Date.now()],
    async (err, results) => {
      if (err) {
        console.error('DB SELECT token error:', err);
        return res.status(500).json({ error: 'Database error' });
      }

      if (results.length === 0) {
        return res.status(400).json({ error: 'Invalid or expired token' });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      db.query(
        'UPDATE users SET password = ?, reset_token = NULL, reset_token_expiry = NULL WHERE reset_token = ?',
        [hashedPassword, token],
        (err2) => {
          if (err2) {
            console.error('DB UPDATE password error:', err2);
            return res.status(500).json({ error: 'Failed to reset password' });
          }

          return res.json({ message: '✅ Password reset successful' });
        }
      );
    }
  );
};
*/
/*const db = require('../db');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const { sendEmail } = require('../utils/email'); // ✅ Must be exported correctly

// 👉 Forgot Password - Send Reset Link
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required' });

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) {
      console.error('❌ SELECT error:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const token = crypto.randomBytes(20).toString('hex');
    const expiry = Date.now() + 3600000; // 1 hour

    db.query(
      'UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE email = ?',
      [token, expiry, email],
      async (err2) => {
        if (err2) {
          console.error('❌ UPDATE token error:', err2);
          return res.status(500).json({ error: 'Failed to save reset token' });
        }

        const resetUrl = `http://localhost:3000/reset-password/${token}`;
        try {
          await sendEmail(
            email,
            'Reset Your Password',
            `Click to reset your password:\n\n${resetUrl}\n\nThis link expires in 1 hour.`
          );
          return res.json({ message: '✅ Reset link sent to your email' });
        } catch (emailErr) {
          console.error('❌ Email send failed:', emailErr);
          return res.status(500).json({ error: 'Failed to send email' });
        }
      }
    );
  });
};

// 👉 Reset Password - Update Password
exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({ error: 'Token and new password are required' });
  }

  db.query(
    'SELECT * FROM users WHERE reset_token = ? AND reset_token_expiry > ?',
    [token, Date.now()],
    async (err, results) => {
      if (err) {
        console.error('❌ SELECT token error:', err);
        return res.status(500).json({ error: 'Database error' });
      }

      if (results.length === 0) {
        return res.status(400).json({ error: 'Invalid or expired token' });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      db.query(
        'UPDATE users SET password = ?, reset_token = NULL, reset_token_expiry = NULL WHERE reset_token = ?',
        [hashedPassword, token],
        (err2) => {
          if (err2) {
            console.error('❌ Password update error:', err2);
            return res.status(500).json({ error: 'Failed to update password' });
          }

          return res.json({ message: '✅ Password reset successful' });
        }
      );
    }
  );
};*/
const db = require('../db');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const { sendEmail } = require('../utils/email'); // ✅ Must be exported correctly

// 👉 Forgot Password - Send Reset Link
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required' });

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) {
      console.error('❌ SELECT error:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const token = crypto.randomBytes(20).toString('hex');
    const expiry = Date.now() + 3600000; // 1 hour

    db.query(
      'UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE email = ?',
      [token, expiry, email],
      async (err2) => {
        if (err2) {
          console.error('❌ UPDATE token error:', err2);
          return res.status(500).json({ error: 'Failed to save reset token' });
        }

        const resetUrl = `http://localhost:3000/reset-password/${token}`;
        try {
          await sendEmail(
            email,
            'Reset Your Password',
            `Click to reset your password:\n\n${resetUrl}\n\nThis link expires in 1 hour.`
          );
          return res.json({ message: '✅ Reset link sent to your email' });
        } catch (emailErr) {
          console.error('❌ Email send failed:', emailErr);
          return res.status(500).json({ error: 'Failed to send email' });
        }
      }
    );
  });
};

// 👉 Reset Password - Update Password
exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({ error: 'Token and new password are required' });
  }

  // Step 1: Validate token and get user
  db.query(
    'SELECT email FROM users WHERE reset_token = ? AND reset_token_expiry > ?',
    [token, Date.now()],
    async (err, results) => {
      if (err) {
        console.error('❌ SELECT token error:', err);
        return res.status(500).json({ error: 'Database error' });
      }

      if (results.length === 0) {
        return res.status(400).json({ error: 'Invalid or expired token' });
      }

      const userEmail = results[0].email;
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Step 2: Update password for the found email
      db.query(
        'UPDATE users SET password = ?, reset_token = NULL, reset_token_expiry = NULL WHERE email = ?',
        [hashedPassword, userEmail],
        (err2) => {
          if (err2) {
            console.error('❌ Password update error:', err2);
            return res.status(500).json({ error: 'Failed to update password' });
          }

          return res.json({ message: '✅ Password reset successful' });
        }
      );
    }
  );
};

