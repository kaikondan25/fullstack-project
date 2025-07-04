const mongoose = require('../db');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('Category', categorySchema);
