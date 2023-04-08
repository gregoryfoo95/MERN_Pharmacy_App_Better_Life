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
        type: Number,
        required:true,
    },

    longitude: {
        type: Number,
        required:true,
    },
    
    users: {
        type: [Schema.Types.ObjectId],
        ref: "User",
        required: true,
    }

},
{
    timestamps: true,
},
);

locationSchema.index({ coordinates: '2dsphere' });

module.exports = mongoose.model("Location", locationSchema);
