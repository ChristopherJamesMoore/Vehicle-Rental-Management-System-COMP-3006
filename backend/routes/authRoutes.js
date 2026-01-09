const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = require("../middleware/auth");

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) return res.status(400).json({ message: "Missing fields" });

  const existing = await User.findOne({ username });
  if (existing) return res.status(409).json({ message: "Username already exists" });

  const passwordHash = await bcrypt.hash(password, 10);

  // first user can be admin if you want (optional)
  const userCount = await User.countDocuments();
  const role = userCount === 0 ? "admin" : "user";

  const user = await User.create({ username, passwordHash, role });

  res.json({ message: "Registered", id: user._id, role: user.role });
});

// Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: user._id.toString(), username: user.username, role: user.role },
    process.env.JWT_SECRET || "secret",
    { expiresIn: "2h" }
  );

  res.json({ token, role: user.role, username: user.username });
});

// Who am I
router.get("/me", auth, async (req, res) => {
  res.json({ id: req.user.id, username: req.user.username, role: req.user.role });
});

module.exports = router;