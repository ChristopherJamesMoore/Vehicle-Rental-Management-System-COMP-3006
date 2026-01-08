const express = require("express");
const Booking = require("../models/Booking");
const Car = require("../models/Car");
const router = express.Router();

router.post("/", async (req, res) => {
  const { carId, user } = req.body;

  await Car.findByIdAndUpdate(carId, { available: false });

  const booking = new Booking({ carId, user });
  await booking.save();

  res.json(booking);
});

module.exports = router;