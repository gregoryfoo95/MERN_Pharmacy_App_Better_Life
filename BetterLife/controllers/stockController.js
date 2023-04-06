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
                query[key] = new RegExp(`.*${query[key]}.*`, "i");
            }
            const allStocks = await Stock.find(query)
                .populate("location")
                .populate("medicine")
                .exec();
            res.status(201).json(allStocks);
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

    searchStock: async (req, res) => {
        try {
            const query = req.query || {};
            const regexQuery = {};
            if (query["storeName"]) regexQuery["location.storeName"] = new RegExp(query["storeName"], "i");
            if (query["medicineName"]) regexQuery["medicine.name"] = new RegExp(query["medicineName"], "i");
            if (query["medicineBrand"]) regexQuery["medicine.brand"] = new RegExp(query["medicineBrand"], "i");
            if (query["medicineStrength"]) regexQuery["medicine.strength"] = new RegExp(query["medicineStrength"], "i");

            const allStocks = await Stock.find()
            .populate("location")
            .populate("medicine")
            .exec();

            const filteredStocks = allStocks.filter((stock) => {
                let match = true;
                if (query["storeName"] && !stock.location.storeName.match(regexQuery["location.storeName"])) {
                    match = false;
                }
                if (query["medicineName"] && !stock.medicine.name.match(regexQuery["medicine.name"])) {
                    match = false;
                }
                if (query["medicineBrand"] && !stock.medicine.brand.match(regexQuery["medicine.brand"])) {
                    match = false;
                }
                if (query["medicineStrength"] && !stock.medicine.strength.match(regexQuery["medicine.strength"])) {
                    match = false;
                }
                return match;
                });

            res.send(filteredStocks);

        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

}

module.exports = stockController;

