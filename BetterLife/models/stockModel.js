const mongoose = require("mongoose");
const { Schema } = mongoose;

const stockSchema = new Schema({
    location: {
        type: Schema.Types.ObjectId,
        ref: "Location",
        trim: true,
        require: true,
    },
    medicine: {
        type: Schema.Types.ObjectId,
        ref: "Medicine",
        required: true,
        trim: true,
    },

    quantity: {
        type: Number,
        default: 0,
    },

})
module.exports = mongoose.model("Stock", stockSchema);