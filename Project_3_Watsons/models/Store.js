const mongoose = require("mongoose");
const { Schema } = mongoose;


const storeSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },

    postal: {
        type: String,
        required: true,
        trim: true,
    },

    address: {
        type: String,
        required: true,
    },

    medicines: {
        type: [Schema.Types.ObjectId],
        ref: "Medicine",
        required:true,
    }

})
module.exports = mongoose.model("Store", storeSchema);
