const Medicine = require('../models/medicine');

// Define controller methods for handling CRUD operations on Medicine model
const medicineController = {
  // Create a new medicine
  create: async (req, res) => {
    try {
      const medicine = new Medicine(req.body);
      const savedMedicine = await medicine.save();
      res.status(201).json(savedMedicine);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  // Read all medicines
  getAll: async (req, res) => {
    try {
      const medicines = await Medicine.find({});
      res.status(200).json(medicines);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // Read a medicine by ID
  getById: async (req, res) => {
    try {
      const medicine = await Medicine.findById(req.params.id);
      if (!medicine) {
        return res.status(404).json({ message: 'Medicine not found' });
      }
      res.status(200).json(medicine);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // Update a medicine by ID
  updateById: async (req, res) => {
    try {
      const medicine = await Medicine.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!medicine) {
        return res.status(404).json({ message: 'Medicine not found' });
      }
      res.status(200).json(medicine);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  // Delete a medicine by ID
  deleteById: async (req, res) => {
    try {
      const medicine = await Medicine.findByIdAndDelete(req.params.id);
      if (!medicine) {
        return res.status(404).json({ message: 'Medicine not found' });
      }
      res.status(200).json({ message: 'Medicine deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

module.exports = medicineController;
