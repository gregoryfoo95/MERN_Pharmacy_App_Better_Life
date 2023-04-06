const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');


router.get('/createseed', stockController.seedStockShell);
router.get('/', stockController.getAllStock);
router.put("/:id/updatestock", stockController.updateStockById)
router.get("/search", stockController.searchStock)
module.exports = router;