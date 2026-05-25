const pool = require('../database/db');

async function getAllListings() {
  const result = await pool.query(
    `SELECT id, title, description, price, location, contact_info, user_id, created_at, updated_at
     FROM listings
     WHERE is_active IS DISTINCT FROM FALSE
     ORDER BY created_at DESC`
  );

  return result.rows;
}

async function getListingById(id) {
  const result = await pool.query(
    `SELECT id, title, description, price, location, contact_info, user_id, created_at, updated_at
     FROM listings
     WHERE id = $1 AND is_active IS DISTINCT FROM FALSE
     LIMIT 1`,
    [id]
  );

  return result.rows[0] || null;
}

async function createListing({ title, description, price, location, contact_info, user_id }) {
  const result = await pool.query(
    `INSERT INTO listings (title, description, price, location, contact_info, user_id)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING id, title, description, price, location, contact_info, user_id, created_at, updated_at`,
    [title, description, price, location, contact_info, user_id]
  );

  return result.rows[0];
}

async function updateListing(id, fields) {
  const allowed = ['title', 'description', 'price', 'location', 'contact_info'];
  const set = [];
  const values = [];

  let idx = 1;
  for (const key of allowed) {
    if (Object.prototype.hasOwnProperty.call(fields, key)) {
      set.push(`${key} = $${idx}`);
      values.push(fields[key]);
      idx += 1;
    }
  }

  if (set.length === 0) return null;

  // updated_at to now()
  set.push(`updated_at = now()`);

  const query = `UPDATE listings SET ${set.join(', ')} WHERE id = $${idx} RETURNING id, title, description, price, location, contact_info, user_id, created_at, updated_at`;
  values.push(id);

  const result = await pool.query(query, values);
  return result.rows[0] || null;
}

async function deleteListing(id) {
  const result = await pool.query(
    `DELETE FROM listings WHERE id = $1 RETURNING id`,
    [id]
  );

  return result.rows[0] || null;
}

module.exports = {
  getAllListings,
  getListingById,
  createListing,
  updateListing,
  deleteListing,
};
