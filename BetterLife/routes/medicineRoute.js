const express = require('express');
const router = express.Router();
const medicineController = require('../controllers/medicineController');

// Fetch and Input Data into DB from data.gov.sg
router.get("/data", medicineController.data)
// Create a new medicine
router.post('/', medicineController.create);

// Read all medicines
router.get('/', medicineController.getAll);

// Read a medicine by ID
router.get('/:id', medicineController.show);

// Update a medicine by ID
router.put('/:id', medicineController.updateById);

// Delete a medicine by ID
router.delete('/:id', medicineController.deleteById);

module.exports = router;
