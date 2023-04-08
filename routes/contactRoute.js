const express = require('express');
const router = express.Router();
const contactCtrl = require('../controllers/contactController');

// POST /api/users
router.post('/', contactCtrl.contactUs);

module.exports = router;