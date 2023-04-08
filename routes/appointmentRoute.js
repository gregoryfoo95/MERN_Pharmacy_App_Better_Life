const express = require('express');
const router = express.Router();
const appointmentCtrl = require('../controllers/appointmentController');

// POST /api/users
router.post('/', appointmentCtrl.appointmentBooked);

module.exports = router;