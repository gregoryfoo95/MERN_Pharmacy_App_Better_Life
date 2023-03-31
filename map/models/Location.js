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

});


locationSchema.index({ coordinates: '2dsphere' });

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
