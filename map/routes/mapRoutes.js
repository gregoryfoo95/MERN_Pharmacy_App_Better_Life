const express = require('express');
const {
  // createLocation,
  getLocations,
  getLocationById,
  // updateLocation,
  // deleteLocation,
} = require('../controllers/mapController');

const router = express.Router();

// router.post('/map', createLocation);
router.get('/map', getLocations);
router.get('/map/:id', getLocationById);
// router.put('/map/:id', updateLocation);
// router.delete('/map/:id', deleteLocation);

module.exports = router;