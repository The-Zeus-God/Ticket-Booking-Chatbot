const express = require('express');
const router = express.Router();
const pool = require('../db'); 


router.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO contact_feedback (name, email, message) VALUES ($1, $2, $3) RETURNING *',
      [name, email, message]
    );

    console.log('Feedback saved successfully:', result.rows[0]);
    res.status(200).json({ message: 'Feedback saved successfully!' });
  } catch (error) {
    console.error('Error saving feedback:', error);
    res.status(500).json({ message: 'Error saving feedback' });
  }
});

module.exports = router;
