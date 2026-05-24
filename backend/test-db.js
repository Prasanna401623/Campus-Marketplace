require('dotenv').config();
const pool = require('./src/database/db');

(async () => {
  try {
    const res = await pool.query('SELECT now()');
    console.log('DB time:', res.rows[0]);
    await pool.end();
  } catch (err) {
    console.error('DB error:', err);
  }
})();