const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A brand must have a name'],
  },
  models: {
    type: [Array],
  },
  sneakers: {
    type: [Array],
  },
});
