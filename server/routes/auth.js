const express = require('express');
const router = express.Router();
const pool = require('../db'); // your configured pg pool connection

// Signup route
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const userExists = await pool.query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );
    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: 'Username already exists!' });
    }

    const newUser = await pool.query(
      'INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
      [username, email, password, role]
    );

    await pool.query(
      'INSERT INTO login (username, password, role) VALUES ($1, $2, $3)',
      [username, password, role]
    );

    res.status(201).json({ message: 'User registered successfully!' });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
      return res.status(400).json({ message: 'Please provide username, password, and role' });
    }

    const userResult = await pool.query(
      'SELECT * FROM login WHERE username = $1 AND role = $2',
      [username, role]
    );

    if (userResult.rows.length === 0) {
      return res.status(400).json({ message: 'Access denied' });
    }

    const user = userResult.rows[0];

    if (user.password !== password) {
      return res.status(400).json({ message: 'Invalid username, password, or role' });
    }

    return res.status(200).json({
      message: 'Login successful',
      user: {
        username: user.username,
        role: user.role,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
