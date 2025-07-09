const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerAdmin = (req, res) => {
  const {
    admin_name, password, email,
    airport_code, airport_name, city, country
  } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);

  const sql = `INSERT INTO admins (admin_name, password, email, airport_code, airport_name, city, country)
               VALUES (?, ?, ?, ?, ?, ?, ?)`;

  db.query(sql, [admin_name, hashedPassword, email, airport_code, airport_name, city, country], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error registering admin', error: err });
    res.status(201).json({ message: 'Admin registered successfully' });
  });
};

exports.loginAdmin = (req, res) => {
  const { admin_name, password } = req.body;

  db.query('SELECT * FROM admins WHERE admin_name = ?', [admin_name], (err, results) => {
    if (err) return res.status(500).json({ message: 'Server error' });
    if (results.length === 0) return res.status(401).json({ message: 'Admin not found' });

    const admin = results[0];
    const isMatch = bcrypt.compareSync(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const loginSql = 'INSERT INTO admin_logs (admin_name,password) VALUES (?,?)';
    db.query(loginSql, [admin.admin_name,admin.password], (logErr, logResult) => {
      if (logErr) {
        console.error('❌ Failed to log login:', logErr);
        return res.status(500).json({ message: 'Login success, but failed to log activity' });
      }
    const token = jwt.sign({ id: admin.id, admin_name: admin.admin_name }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
    });
  });
};

exports.getAdminProfile = (req, res) => {
  const adminId = req.admin.id;

  db.query('SELECT id, admin_name, email, airport_code, airport_name, city, country FROM admins WHERE id = ?', [adminId], (err, results) => {
    if (err) return res.status(500).json({ message: 'Error retrieving admin profile' });
    res.json(results[0]);
  });
};
