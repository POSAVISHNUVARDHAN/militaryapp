const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

// Setup PostgreSQL connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'military_assets1',
  password: 'vishnu',
  port: 5432,
});

// ✅ CREATE purchase (POST /api/purchases)
router.post('/purchases', async (req, res) => {
  const { base, equipment_type, quantity, date } = req.body;

  if (!base || !equipment_type || !quantity || !date) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    await pool.query(
      'INSERT INTO purchases (base, equipment_type, quantity, date) VALUES ($1, $2, $3, $4)',
      [base, equipment_type, quantity, date]
    );

    res.status(201).json({ message: 'Purchase added successfully' });
  } catch (err) {
    console.error('Error inserting purchase:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ✅ GET all purchases with optional filters (GET /api/purchases)
router.get('/purchases', async (req, res) => {
  const { startDate, endDate, base, equipment_type } = req.query;

  let query = 'SELECT * FROM purchases WHERE 1=1';
  const values = [];

  if (startDate) {
    values.push(startDate);
    query += ` AND date >= $${values.length}`;
  }
  if (endDate) {
    values.push(endDate);
    query += ` AND date <= $${values.length}`;
  }
  if (base) {
    values.push(base);
    query += ` AND base = $${values.length}`;
  }
  if (equipment_type) {
    values.push(equipment_type);
    query += ` AND equipment_type = $${values.length}`;
  }

  try {
    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching purchases:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ✅ DELETE purchase and related transfers (DELETE /api/purchases/:equipment_type)
router.delete('/purchases/:equipment_type', async (req, res) => {
  const equipmentType = req.params.equipment_type;

  try {
    const purchaseResult = await pool.query(
      'SELECT * FROM purchases WHERE equipment_type = $1',
      [equipmentType]
    );

    if (purchaseResult.rowCount === 0) {
      return res.status(404).json({ error: 'Purchase not found' });
    }

    await pool.query('DELETE FROM transfers WHERE asset = $1', [equipmentType]);
    await pool.query('DELETE FROM purchases WHERE equipment_type = $1', [equipmentType]);

    res.json({ message: 'Purchase and related transfers deleted' });
  } catch (err) {
    console.error('Error deleting purchase:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
