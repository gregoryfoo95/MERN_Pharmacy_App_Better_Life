const Medicine = require("../models/medicineModel");
const Location = require("../models/locationModel");
const Stock = require("../models/stockModel");


const stockController = {

    seedStockShell: async (req,res) => {
        try {
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
        const pattern = req.query.medicineName;
        const Re = new RegExp(pattern.toUpperCase());
        const stock = await Stock
        .find()
        .populate(
            {
                path: "medicine",
                match: {name: Re},
            }
        )
        .populate('location')
        .exec();
        console.log(stock);
        res.status(200).json(stock);
 
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

}

module.exports = stockController;