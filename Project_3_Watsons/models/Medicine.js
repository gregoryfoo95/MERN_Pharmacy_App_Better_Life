const mongoose = require("mongoose");
const { Schema } = mongoose;

const medicineSchema = new Schema({
    brand: {
        type: String,
        required: true,
        trim: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },

    type: {
        type: String,
        required: true,
        trim: true,
    },

    routeOfAdmin: {
        type: String,
        //required: true,
    },

    strength: {
        type: String,
        required: true,
    },

    price: {
      type: Number,
      required: true,
      default: 0,
    },

    expiry_date: {
        type: Date,
        required: true,
        default: Date.now(),
    }
})
module.exports = mongoose.model("Medicine", medicineSchema);
