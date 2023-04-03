const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lineItemSchema = new Schema({
  medicine: {
    type: Schema.Types.ObjectId,
    ref: 'Medicine',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
});

// Add a virtual property for the extended price of the line item
lineItemSchema.virtual('extPrice').get(function () {
  // 'this' is bound to the lineItem subdocument
  return this.qty * this.item.price;
});

module.exports = mongoose.model('LineItem', lineItemSchema);