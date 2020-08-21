const mongoose = require('mongoose');

const sneakerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A sneaker must have a name'],
    unique: true,
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'A sneaker must have a price'],
  },
  sizesAndQuantity: {
    type: [Array],
  },
  images: [String],
  description: {
    type: String,
    trim: true,
  },
  brand: {
    type: String,
    trim: true,
    required: [true, 'A sneaker must have a brand'],

  },
  type: {
    type: String,
    trim: true,
    required: [true, 'A sneaker must have a type'],
  },
  color: {
    type: String,
    trim: true,
  },
  productCode: {
    type: String,
    trim: true,
    unique: true,
    required: [true, 'A sneaker must have a product code'],
  },
  dateReleased: {
    type: Date,
  },
  gender: {
    type: String,
    trim: true,
  },
});

const Sneaker = mongoose.model('Sneaker', sneakerSchema);

module.exports = Sneaker;
