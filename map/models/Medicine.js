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

    quantity: {
        type: Number,
        required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    expiry_date: {
        type: Date,
        required: true,
    }
})
module.exports = mongoose.model("Medicine", medicineSchema);