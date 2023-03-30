const express = require('express');
const router = express.Router();
const medicineController = require('../controllers/medicineController');

// Create a new medicine
router.post('/', medicineController.create);

// Read all medicines
router.get('/', medicineController.getAll);

// Read a medicine by ID
router.get('/:id', medicineController.getById);

// Update a medicine by ID
router.put('/:id', medicineController.updateById);

// Delete a medicine by ID
router.delete('/:id', medicineController.deleteById);

// Fetch and Input Data into DB from data.gov.sg
router.get("/api/data", medicineController.data)

module.exports = router;
