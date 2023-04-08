const stripe = require('stripe')(process.env.STRIPE_KEY);
const Medicine = require('../models/medicineModel');

const stripeController = {
    retrieveProducts: async (req,res) => {
        try {
            const products = await stripe.products.list({
                limit: 10,
            }) 
            res.status(201).json(products);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    createProducts: async (req, res) => {
        try {
            const medicines = await Medicine.find({});
            console.log(medicines);
        const createdProducts = await Promise.all(medicines.map(async (medicine) => {
            const product = await stripe.products.create({
            name: medicine.name,
            description: medicine.type.concat(" ", medicine.strength),
            });

            const price = await stripe.prices.create({
            product: product.id,
            unit_amount: medicine.price,
            currency: "sgd",
            });

            return product;
      }));
            res.status(200).json(createdProducts);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}

module.exports = stripeController;