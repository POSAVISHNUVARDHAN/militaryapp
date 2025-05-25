const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'military_assets1',
  password: 'vishnu',
  port: 5432,
});

// Define your dashboard route using router, NOT app
router.get('/dashboard', async (req, res) => {
  try {
    // Example: get some summary data from purchases and transfers
    const purchasesCount = await pool.query('SELECT COUNT(*) FROM purchases');
    const transfersCount = await pool.query('SELECT COUNT(*) FROM transfers');

    res.json({
      purchases: parseInt(purchasesCount.rows[0].count),
      transfers: parseInt(transfersCount.rows[0].count),
    });
  } catch (error) {
    console.error('Dashboard query error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
