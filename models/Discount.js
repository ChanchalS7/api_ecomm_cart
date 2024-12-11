const mongoose = require('mongoose');

const discountSchema = new mongoose.Schema({
  code: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  used: { type: Boolean, default: false },
});

module.exports = mongoose.model('Discount', discountSchema);
