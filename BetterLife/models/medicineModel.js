const mongoose = require("mongoose");
const { Schema } = mongoose;

const medicineSchema = new Schema({
    brand: {
        type: String,
        trim: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },

    type: {
        type: String,
        trim: true,
    },

    country: {
        type: String,
        trim: true,
    },

    routeOfAdmin: {
        type: String,
        //required: true,
    },

    strength: {
        type: String,
        default: "0",
    },

    price: {
        type: Number,
        default: 0,
    },

    expiry_date: {
        type: Date,
        default: Date.now(),
    }
})
module.exports = mongoose.model("Medicine", medicineSchema);