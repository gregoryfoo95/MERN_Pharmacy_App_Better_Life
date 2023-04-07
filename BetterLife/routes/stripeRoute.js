const express = require('express');
const router = express.Router();
const stripeController = require('../controllers/stripeController');

router.post('/v1/products', stripeController.createProducts);

module.exports = router;