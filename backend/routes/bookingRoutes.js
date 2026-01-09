const express = require("express");
const Booking = require("../models/Booking");
const Car = require("../models/Car");

const router = express.Router();

// GET all bookings
router.get("/", async (req, res) => {
  const bookings = await Booking.find().populate("carId");
  res.json(bookings);
});

// POST new booking
router.post("/", async (req, res) => {
  const { carId, userName, startDate, endDate } = req.body;

  const car = await Car.findById(carId);
  if (!car || !car.available)
    return res.status(400).json({ message: "Car not available" });

  car.available = false;
  await car.save();

  const booking = await Booking.create({
    carId,
    userName,
    startDate,
    endDate
  });

  const io = req.app.get("io");
  io.emit("bookingUpdated");

  res.json(booking);
});

// DELETE cancel booking
router.delete("/:id", async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) return res.status(404).json({ message: "Booking not found" });

  booking.status = "cancelled";
  await booking.save();

  await Car.findByIdAndUpdate(booking.carId, { available: true });

  const io = req.app.get("io");
  io.emit("bookingUpdated");

  res.json({ message: "Booking cancelled" });
});

module.exports = router;