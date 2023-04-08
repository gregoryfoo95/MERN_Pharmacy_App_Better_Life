const Stock = require('../models/stockModel');
const Medicine = require('../models/medicineModel');
const Location = require('../models/locationModel');

const getStocks = async (req, res) => {
  try {
    const stocks = await Stock.find().populate('medicine').populate('location');
    res.json(stocks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

const createStocks = async (req, res) => {
  try {
    const medicines = await Medicine.find();
    const locations = await Location.find();

    const stocks = [];
    for (let i = 0; i < medicines.length; i++) {
      for (let j = 0; j < locations.length; j++) {
        const stock = new Stock({
          medicine: medicines[i]._id,
          location: locations[j]._id,
          quantity: Math.floor(Math.random() * 100),
        });
        await stock.populate('medicine').populate('location').execPopulate();
        stocks.push(stock);
      }
    }

    await Stock.insertMany(stocks);

    res.json({ message: 'Stocks created' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


// const getMedicine = async (req, res) => {
//   try {
//     const { medicineId } = req.params;

//     const query = medicineId ? { medicine: medicineId } : {};

//     const stocks = await Stock.find(query).populate('medicine').populate('location');

//     res.json(stocks);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// }


module.exports = {
  getStocks,
  createStocks,
  // getMedicine,
}
