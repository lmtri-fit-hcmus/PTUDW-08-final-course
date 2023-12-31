const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
  },
  penName: {
    type: String,
  },
  dob: {
    type: Date,
  },
  avatar: {
    type: String,
  },
  role: {
    type: String,
    required: true
  },
  listCat: [{
    type: Schema.Types.ObjectId,
    ref: "Category",
  }],
  lastPaidDate: {
    type: Date
  }
},
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);