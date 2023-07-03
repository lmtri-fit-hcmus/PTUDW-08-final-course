const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  detail: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Category', categorySchema);