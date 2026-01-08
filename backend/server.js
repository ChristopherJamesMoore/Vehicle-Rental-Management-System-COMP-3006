const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const carRoutes = require("./routes/carRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(console.error);

io.on("connection", socket => {
  console.log("Client connected");
});

app.use("/cars", carRoutes);
app.use("/bookings", bookingRoutes);

server.listen(5000, () => {
  console.log("Backend running on port 5000");
});