const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    carId: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true },
    userName: { type: String, required: true },

    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },

    totalCost: { type: Number, required: true },

    status: {
      type: String,
      enum: ["confirmed", "cancelled"],
      default: "confirmed"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);