const express = require('express');
const {
  // createLocation,
  getLocations,
  getLocationById,
  // updateLocation,
  // deleteLocation,
} = require('../controllers/mapController');
const protect = require('../utils/middleware/authMiddleware')

const router = express.Router();

// router.post('/', createLocation);
router.get('/',protect, getLocations);
router.get('/:id',protect, getLocationById);
// router.put('/:id',protect, updateLocation);
// router.delete('/:id',protect, deleteLocation);

module.exports = router;