const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema({
  brand: String,
  model: String,
  available: { type: Boolean, default: true },
  pricePerDay: Number
});

module.exports = mongoose.model("Car", CarSchema);
