const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  pricePerDay: { type: Number, required: true },

  // NEW: image URL or local path like "/images/fiesta.jpg"
  imageUrl: { type: String, default: "" },

  available: { type: Boolean, default: true }
});

module.exports = mongoose.model("Car", carSchema);