const mongoose = require("mongoose");
const { Schema } = mongoose;

const medicineSchema = new Schema({
    brand: {
        type: String,
        trim: true,
        unique:false,
    },
    name: {
        type: String,
        required: true,
        trim: true,
        unique: false,
    },

    type: {
        type: String,
        trim: true,
        unique:false,
    },

    routeOfAdmin: {
        type: String,
        //required: true,
        unique:false,
    },

    strength: {
        type: String,
        default: "0",
    },

    price: {
        type: Number,
        default: 0,
        unique:false,
    },

    expiry_date: {
        type: Date,
        default: Date.now(),
        unique:false,
    }
})
module.exports = mongoose.model("Medicine", medicineSchema);
