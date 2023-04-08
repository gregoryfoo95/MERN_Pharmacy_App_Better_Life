const express = require('express');
const {
  // createLocation,
  getLocations,
  getLocationById,
  // updateLocation,
  // deleteLocation,
} = require('../controllers/mapController');

const router = express.Router();

// router.post('/', createLocation);
router.get('/', getLocations);
router.get('/:id', getLocationById);
// router.put('/:id', updateLocation);
// router.delete('/:id', deleteLocation);

module.exports = router;