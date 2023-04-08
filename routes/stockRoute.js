const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');


router.get('/createseed', stockController.seedStockShell);
router.get('/', stockController.getAllStock);
router.post('/', stockController.createStock)
router.put("/:id/updatestock", stockController.updateStockById)
module.exports = router;