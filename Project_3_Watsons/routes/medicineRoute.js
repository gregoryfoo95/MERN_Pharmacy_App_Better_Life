const express = require('express');
const router = express.Router();
const medicineController = require('../controllers/medicineController');

// Create a new medicine
router.post('/medicine', medicineController.create);

// Read all medicines
router.get('/medicine', medicineController.getAll);

// Read a medicine by ID
router.get('/medicine/:id', medicineController.getById);

// Update a medicine by ID
router.put('/medicine/:id', medicineController.updateById);

// Delete a medicine by ID
router.delete('/medicine/:id', medicineController.deleteById);

module.exports = router;
