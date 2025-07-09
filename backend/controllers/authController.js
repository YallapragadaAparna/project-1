/*const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const sql = `INSERT INTO users (username, password, role) VALUES (?, ?, 'customer')`;

  db.query(sql, [username, hashedPassword], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'User registered successfully!' });
  });
};

exports.login = (req, res) => {
  const { username, password } = req.body;
  const sql = `SELECT * FROM users WHERE username = ?`;

  db.query(sql, [username], async (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(401).json({ message: 'Invalid credentials' });

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token, role: user.role });
  });
};*/
// controllers/authController.js
const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const sql = `INSERT INTO users (username, password, role) VALUES (?, ?, 'customer')`;

  db.query(sql, [username, hashedPassword], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'User registered successfully!' });
  });
};

exports.login = (req, res) => {
  const { username, password } = req.body;
  const sql = `SELECT * FROM users WHERE username = ?`;

  db.query(sql, [username], async (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(401).json({ message: 'Invalid credentials' });

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    // ✅ Log the login in login_logs table
    const logSql = `INSERT INTO login_logs (username, password) VALUES (?, ?)`;
    db.query(logSql, [username, user.password], (logErr) => {
      if (logErr) console.error('Login log failed:', logErr.message);
    });

    // ✅ Create JWT token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token, role: user.role });
  });
};
