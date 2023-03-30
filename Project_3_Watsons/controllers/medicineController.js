const Medicine = require('../models/medicine');

// Define controller methods for handling CRUD operations on Medicine model
const medicineController = {
  // Create a new medicine
  create: async (req, res) => {
    try {
      const savedMedicine = await Medicine.create(req.body);
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

  data: async (req,res) => {
      const limit = 20;
      const apiURL = `https://data.gov.sg/api/action/datastore_search?resource_id=43668192-c352-4420-9731-01043c67c471&limit=${limit}`
      try {
          const response = await fetch(apiURL);
          const data = await response.json();
          /* res.json(data); */
          const medicines = data.result.records.map(record => ({
              name: record.product_name,
              type: record.dosage_form,
              routeOfAdmin: record.route_of_administration,
              brand: record.manufacturer,
              strength: record.strength
          }));
          medicines.forEach((medicine) => {
            if (medicine.strength.includes("&&")) {
              const strengths = medicine.strength.split("&&");
              strengths.forEach((strength) => {
                medicines.push({
                  name: medicine.product_name,
                  type: medicine.dosage_form,
                  routeOfAdmin: medicine.route_of_administration,
                  brand: medicine.manufacturer,
                  strength: strength
                });
              })
            }
          })
          await Medicine.deleteMany({})
          const createdMedicines = await Medicine.create(medicines);
          console.log(createdMedicines);
          res.status(200).json(createdMedicines);
      } catch (error) {
          console.log(error);
          res.status(500).json({ error: "Server Error" });
      }
  },
};
module.exports = medicineController;
