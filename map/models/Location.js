const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  no: {},
  storeName: {},
  storeAddress: {},
  openingHours:{},
  Pharmacy: {},
  PharmacyDispensingHours : {},	
  TelePharmacy: {},
  Latitude: {},
  Longitude: {},
  medicines: {
    type: [Schema.Types.ObjectId],
    ref: "Medicine",
    required:true,
  },

  users: {
    type: [Schema.Types.ObjectId],
    ref: "User",
    required: true,
  }

});


locationSchema.index({ coordinates: '2dsphere' });

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
