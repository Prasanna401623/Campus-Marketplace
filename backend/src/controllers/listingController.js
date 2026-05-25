const listingModel = require('../models/listingModel');

async function getAllListings(req, res) {
  try {
    const listings = await listingModel.getAllListings();
    res.json({ listings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getListingById(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    const listing = await listingModel.getListingById(id);

    if (!listing) return res.status(404).json({ error: 'Listing not found' });

    res.json(listing);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function createListing(req, res) {
  try {
    const userId = req.user && req.user.id;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const { title, description = '', price = null, location = '', contact_info = '' } = req.body;

    if (!title || title.trim().length < 3) {
      return res.status(400).json({ error: 'Title is required (min 3 chars)' });
    }

    const listing = await listingModel.createListing({
      title: title.trim(),
      description: description.trim(),
      price,
      location: location.trim(),
      contact_info: contact_info.trim(),
      user_id: userId,
    });

    res.status(201).json(listing);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function updateListing(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    const userId = req.user && req.user.id;

    const existing = await listingModel.getListingById(id);
    if (!existing) return res.status(404).json({ error: 'Listing not found' });
    if (!userId || existing.user_id !== userId) return res.status(403).json({ error: 'Forbidden' });

    const fields = {};
    ['title', 'description', 'price', 'location', 'contact_info'].forEach((k) => {
      if (Object.prototype.hasOwnProperty.call(req.body, k)) fields[k] = req.body[k];
    });

    if (Object.keys(fields).length === 0) return res.status(400).json({ error: 'No valid fields provided' });

    const updated = await listingModel.updateListing(id, fields);
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function deleteListing(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    const userId = req.user && req.user.id;

    const existing = await listingModel.getListingById(id);
    if (!existing) return res.status(404).json({ error: 'Listing not found' });
    if (!userId || existing.user_id !== userId) return res.status(403).json({ error: 'Forbidden' });

    await listingModel.deleteListing(id);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  getAllListings,
  getListingById,
  createListing,
  updateListing,
  deleteListing,
};
