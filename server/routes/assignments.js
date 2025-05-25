const express = require('express');
const router = express.Router();
const pool = require('../db');



// Get all assignments
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM assignments ORDER BY asset');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching assignments:', err);
    res.status(500).send('Server error');
  }
});

router.post('/', async (req, res) => {
  const { asset, personnel } = req.body;

  // Basic input validation
  if (!asset || !personnel) {
    return res.status(400).json({ error: 'Asset and personnel are required' });
  }

  try {
    // Check if asset exists in purchases table
    const assetExists = await pool.query(
      'SELECT equipment_type FROM purchases WHERE equipment_type = $1',
      [asset]
    );

    if (assetExists.rows.length === 0) {
      return res.status(400).json({ error: 'Asset not purchased, cannot assign' });
    }

    // Check if asset already assigned
    const assignedAlready = await pool.query(
      'SELECT * FROM assignments WHERE asset = $1',
      [asset]
    );

    if (assignedAlready.rows.length > 0) {
      return res.status(400).json({ error: 'Asset already assigned' });
    }

    // Insert new assignment
    await pool.query(
      'INSERT INTO assignments (asset, personnel, status) VALUES ($1, $2, $3)',
      [asset, personnel, 'Assigned']
    );

    return res.status(201).json({ message: 'Assignment added' });
  } catch (err) {
    console.error('Error adding assignment:', err);
    return res.status(500).json({ error: 'Server error while adding assignment', details: err.message });
  }
});


// Mark as expended
router.put('/expended', async (req, res) => {
  const { asset } = req.body;

  try {
    const result = await pool.query(
      'UPDATE assignments SET status = $1 WHERE asset = $2',
      ['Expended', asset]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Assignment not found' });
    }

    res.json({ message: 'Assignment status updated to Expended' });
  } catch (err) {
    console.error('Error updating assignment:', err);
    res.status(500).send('Server error');
  }
});

// Delete an assignment by asset
router.delete('/:asset', async (req, res) => {
  const { asset } = req.params;

  try {
    const result = await pool.query(
      'DELETE FROM assignments WHERE asset = $1',
      [asset]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Assignment not found' });
    }

    res.json({ message: 'Assignment deleted' });
  } catch (err) {
    console.error('Error deleting assignment:', err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
