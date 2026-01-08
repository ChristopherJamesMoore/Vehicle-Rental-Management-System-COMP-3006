const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  carId: { type: mongoose.Schema.Types.ObjectId, ref: "Car" },
  user: String,
  startDate: Date,
  endDate: Date,
  status: { type: String, default: "pending" }
});

module.exports = mongoose.model("Booking", BookingSchema);
