const Order = require("../models/orderModel");
const Medicine = require("../models/medicineModel");

const getCart = async (req,res,next) => {
    try {
        const userId = req.user._id;
        const cart = await Order.getCart(userId);
        res.status(200).json({cart});
    } catch (error) {
        next(error);
    }
}

const addToCart = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const {medicineId, quantity } = req.body;

        // Check if the medicine exists and retrieve its price
        const medicine = await Medicine.findById(medicineId);
        if (!medicine) {
            return res.status(404).json({ error: "Medicine not found" });
        }
        const price = medicine.price;

        // Update the cart with the new line item
        const cart = await Order.getCart(userId);
        const lineItemIndex = cart.items.findIndex(
        (item) => item.medicine._id === medicineId
        );

        if (lineItemIndex === -1) {
              // If the medicine is not in the cart yet, add a new line item
            cart.items.push({medicine: medicineId, quantity, price});
        } else {
            // If the medicine is already in the cart, update its quantity
            cart.items[lineItemIndex].quantity += quantity;
        }
        // Recalculate the cart total and save the changes
        cart.total = cart.items.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );
        await cart.save();
        res.status(200).json({cart});
    } catch (err) {
        next(err);
    }
}

const updateCart = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { medicineId, quantity } = req.body;

        // Check if the medicine exists and retrieve its price
        const medicine = await Medicine.findById(medicineId);
        if (!medicine) {
            return res.status(404).json({ error: "Medicine not found" });
        }
        const price = medicine.price;

        // Update the cart with the new line item quantity
        const cart = await Order.getCart(userId);
        const lineItemIndex = cart.items.findIndex(
            (item) => item.medicine._id === medicineId
        );
        if (lineItemIndex === -1) {
            return res.status(404).json({ error: "Medicine not found in cart" });
        }
        cart.items[lineItemIndex].quantity = quantity;

        // Recalculate the cart total and save the changes
        cart.total = cart.items.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );
        await cart.save();
        res.status(200).json({cart});
    } catch (err) {
        next(err);
    }
}

const deleteCart = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const medicineId = req.params.medicineId;

        // Update the cart by removing the line item
        const cart = await Order.getCart(userId);
        const lineItemIndex = cart.items.findIndex(
            (item) => item.medicine._id === medicineId
        );
        if (lineItemIndex === -1) {
            return res.status(404).json({ error: "Medicine not found in cart" });
        }
        cart.items.splice(lineItemIndex, 1);

        // Recalculate the cart total and save the changes
        cart.total = cart.items.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );
        await cart.save();
        res.status(200).json({cart});
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getCart,
    addToCart,
    updateCart,
    deleteCart
}