const express = require("express");
const Car = require("../models/Car");
const router = express.Router();

router.get("/", async (req, res) => {
  const cars = await Car.find();
  res.json(cars);
});

router.post("/", async (req, res) => {
  const car = new Car(req.body);
  await car.save();
  res.json(car);
});

module.exports = router;