const Medicine = require('../models/medicineModel');


const medicineController = {

  create: async (req, res) => {
    try {
      const savedMedicine = await Medicine.create(req.body);
      res.status(201).json(savedMedicine);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },


  getAll: async (req, res) => {
    const query = req.query || {};
    for (const key in query) {
      query[key] = new RegExp(`.*${query[key]}.*`, "i");
    }
    try {
      const medicines = await Medicine.find(query);
      res.status(200).json(medicines);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },


  show: async (req, res) => {
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
      const limit = 5;
      const apiURL = `https://data.gov.sg/api/action/datastore_search?resource_id=43668192-c352-4420-9731-01043c67c471&limit=${limit}`
        try {
          const response = await fetch(apiURL);
          const data = await response.json();
          const medicines = data.result.records.flatMap(record => {
            if (record.strength.includes("&&")) {
              const strengths = record.strength.split("&&");
              const formattedStrengths = strengths.map(strength => strength.replaceAll(" ",""))
              const uniqueStrengths = Array.from(new Set(formattedStrengths));
              return uniqueStrengths.map(strength => ({
                name: record.product_name,
                type: record.dosage_form.split("&&")[0],
                routeOfAdmin: record.route_of_administration.split("&&")[0],
                brand: record.manufacturer.split("&&")[0],
                strength: strength,
                country: record.country_of_manufacturer.split("&&")[0],
              }));
            } else {
              return {
                name: record.product_name,
                type: record.dosage_form.split("&&")[0],
                routeOfAdmin: record.route_of_administration.split("&&")[0],
                brand: record.manufacturer.split("&&")[0],
                strength: record.strength,
                country: record.country_of_manufacturer.split("&&")[0],
              };
            }
        });
          await Medicine.deleteMany({})
          const createdMedicines = await Medicine.create(medicines);
          res.status(200).json(createdMedicines);
      } catch (error) {
          console.log(error);
          res.status(500).json({ error: "Error creating medicine through data.gov.sg API" });
      }
  },
};
module.exports = medicineController;