const express = require('express');
const router = express.Router();
const { getStocks, createStocks } = require('../controllers/medicineSearchController');

router.get('/', getStocks);
router.get('/populate', createStocks);

module.exports = router;