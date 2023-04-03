const mongoose = require('mongoose');


const locationSchema = new mongoose.Schema({
  no: {},
  storeName: {},
  storeAddress: {},
  openingHours:{},
  Pharmacy: Boolean,
  PharmacyDispensingHours : {},	
  TelePharmacy: {},
  Latitude: {},
  Longitude: {},
  medicinesQuantity: {}

});


locationSchema.index({ coordinates: '2dsphere' });

module.exports = mongoose.model('Location', locationSchema);


