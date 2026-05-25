const express = require('express');
const router = express.Router();
const listingController = require('../controllers/listingController');
const { requireAuth } = require('../middleware/authMiddleware');

router.get('/', listingController.getAllListings);
router.get('/:id', listingController.getListingById);
router.post('/', requireAuth, listingController.createListing);
router.patch('/:id', requireAuth, listingController.updateListing);
router.delete('/:id', requireAuth, listingController.deleteListing);

module.exports = router;
