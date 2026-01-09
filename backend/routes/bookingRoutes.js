const express = require("express");
const Booking = require("../models/Booking");
const Car = require("../models/Car");
const auth = require("../middleware/auth");

const router = express.Router();

// GET /bookings (auth required)
router.get("/", auth, async (req, res) => {
  const bookings = await Booking.find().populate("carId");
  res.json(bookings);
});

// POST /bookings (auth required)
router.post("/", auth, async (req, res) => {
  const { carId, startDate, endDate } = req.body;

  const car = await Car.findById(carId);
  if (!car) return res.status(404).json({ message: "Car not found" });
  if (!car.available) return res.status(400).json({ message: "Car not available" });

  const start = new Date(startDate);
  const end = new Date(endDate);

  // ✅ day count (minimum 1)
  const msPerDay = 1000 * 60 * 60 * 24;
  const days = Math.max(1, Math.ceil((end - start) / msPerDay));

  // ✅ total cost
  const totalCost = days * (car.pricePerDay || 0);

  // mark car unavailable
  car.available = false;
  await car.save();

  const booking = await Booking.create({
    carId,
    userName: req.user.username,
    startDate,
    endDate,
    totalCost,
    status: "confirmed"
  });

  // websocket update
  const io = req.app.get("io");
  io.emit("bookingUpdated");

  res.json(booking);
});

// DELETE /bookings/:id (auth required) -> cancel booking
router.delete("/:id", auth, async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) return res.status(404).json({ message: "Booking not found" });

  booking.status = "cancelled";
  await booking.save();

  // make car available again
  await Car.findByIdAndUpdate(booking.carId, { available: true });

  // websocket update
  const io = req.app.get("io");
  io.emit("bookingUpdated");

  res.json({ message: "Booking cancelled" });
});

module.exports = router;