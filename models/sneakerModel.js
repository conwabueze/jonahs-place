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
  sizes: {
    type: Object,
  },
  images: [String],
  description: {
    type: String,
    trim: true,
  },
  brand: {
    type: String,
    trim: true,
  },
  type: {
    type: String,
    trim: true,
  },
  color: {
    type: String,
    trim: true,
  },
  productCode: {
    type: String,
    trim: true,
    unique: true,
  },
  dataReleased: {
    type: Date,
    default: Date.now(),
  },
  gender: {
    type: String,
    trim: true,
  },
});

const Sneaker = mongoose.model('Sneaker', sneakerSchema);

module.exports = Sneaker;