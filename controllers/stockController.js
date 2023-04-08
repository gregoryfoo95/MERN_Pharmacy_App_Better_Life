const Medicine = require("../models/medicineModel");
const Location = require("../models/locationModel");
const Stock = require("../models/stockModel");


const stockController = {

    seedStockShell: async (req,res) => {
        try {
            await Stock.deleteMany({})
            const medicines = await Medicine.find({});
            const locations = await Location.find({});
            const allStocks = await Promise.all(
                locations.map( async (location) => {
                    return Promise.all(
                        medicines.map(async (medicine) => {
                            return Stock.create({
                                location: location._id,
                                medicine: medicine._id,
                                quantity: Math.floor(Math.random() * 11),
                            });
                        })
                    );
                })
            );
            res.status(201).json(allStocks);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },
    
    getAllStock: async (req, res) => {
        try {
            const query = req.query || {};
            for (const key in query) {
                if (query[key]) {
                    query[key] = new RegExp(query[key], "i");
                }
            }
            const allStocks = await Stock.find()
                .populate("location")
                .populate("medicine")
                .exec();

            const filteredStocks = allStocks.filter((stock) => {
            let match = true;
            if (query["storeName"] && !stock.location.storeName.match(query["storeName"])) {
                match = false;
            }
            if (query["medicineName"] && !stock.medicine.name.match(query["medicineName"])) {
                match = false;
            }
            if (query["medicineBrand"] && !stock.medicine.brand.match(query["medicineBrand"])) {
                match = false;
            }
            if (query["medicineStrength"] && !stock.medicine.strength.match(query["medicineStrength"])) {
                match = false;
            }
            return match;
            });
            
            res.status(201).json(filteredStocks);
        } catch (err) {
            res.status(400).json({message: "Unable to acquire all stocks."})
        }
    },

    updateStockById: async (req, res) => {
    try {
      const stock = await Stock.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!stock) {
        return res.status(404).json({ message: 'Medicines not found' });
      }
      res.status(200).json(stock);
    } catch (err) {
      res.status(400).json({ message: "Unable to update stock for medicines." });
    }
  },

  createStock: async (req, res) => {
    try {
        const stock = await Stock.create(req.body);
        res.status(201).json(stock);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
  }
}

module.exports = stockController;

