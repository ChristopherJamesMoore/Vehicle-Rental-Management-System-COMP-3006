const express = require("express");
const Car = require("../models/Car");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const router = express.Router();

// GET /cars (public)
router.get("/", async (req, res) => {
  const cars = await Car.find();
  res.json(cars);
});

// POST /cars (admin only)
router.post("/", auth, admin, async (req, res) => {
  const { make, model, pricePerDay, imageUrl } = req.body || {};

  if (!make || !model || pricePerDay === undefined) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const car = await Car.create({
    make,
    model,
    pricePerDay: Number(pricePerDay),
    imageUrl: imageUrl || ""
  });

  res.json(car);
});

// DELETE /cars/:id (admin only)
router.delete("/:id", auth, admin, async (req, res) => {
  await Car.findByIdAndDelete(req.params.id);
  res.json({ message: "Car deleted" });
});

module.exports = router;