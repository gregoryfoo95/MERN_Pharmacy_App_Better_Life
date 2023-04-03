const mongoose = require("mongoose");
const { Schema } = mongoose;


const locationSchema = new Schema({
    storeName: {
        type: String,
        required: true,
        trim: true,
    },

    storeAddress: {
        type: String,
        required: true,
    },

    dispensingHours: {
        type: String,
        required: true,
    },

    latitude: {
        type: String,
        required:true,
    },

    longitude: {
        type: String,
        required:true,
    },
    
    users: {
        type: [Schema.Types.ObjectId],
        ref: "User",
        required: true,
    }

})
module.exports = mongoose.model("Location", locationSchema);
