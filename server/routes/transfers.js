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

// Get all transfers
router.get('/transfers', async (req, res) => {
  try {
    const query = `
      SELECT t.asset, t.from_base, t.to_base, t.date
      FROM transfers t
      INNER JOIN purchases p ON t.asset = p.equipment_type
      ORDER BY t.date DESC
    `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching transfers:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new transfer (with asset validation)
router.post('/transfers', async (req, res) => {
  try {
    const { asset, from_base, to_base, date } = req.body;

    // Validate all fields present
    if (!asset || !from_base || !to_base || !date) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if asset exists in purchases (case-insensitive & trimmed)
    const purchaseCheck = await pool.query(
      `SELECT * FROM purchases WHERE TRIM(LOWER(equipment_type)) = TRIM(LOWER($1))`,
      [asset]
    );

    if (purchaseCheck.rows.length === 0) {
      return res.status(400).json({ error: 'Asset is not purchased' });
    }

    // Insert transfer
    await pool.query(
      `INSERT INTO transfers (asset, from_base, to_base, date) VALUES ($1, $2, $3, $4)`,
      [asset, from_base, to_base, date]
    );

    res.status(201).json({ message: 'Transfer created successfully' });
  } catch (err) {
    console.error('Error creating transfer:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
