import React, { useEffect, useState } from "react";
import axios from "axios";
import socket from "../socket";

function Cars() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetchCars();

    socket.on("bookingUpdated", () => {
      fetchCars();
    });

    return () => socket.off("bookingUpdated");
  }, []);

  const fetchCars = async () => {
    const res = await axios.get("http://localhost:5000/cars");
    setCars(res.data);
  };

  const bookCar = async (carId) => {
    await axios.post("http://localhost:5000/bookings", {
      carId,
      user: "Test User"
    });

    socket.emit("bookingUpdated", { carId });
  };

  return (
    <div>
      <h1>Available Cars</h1>
      {cars.map(car => (
        <div key={car._id}>
          <p>{car.brand} {car.model}</p>
          <p>{car.available ? "Available" : "Booked"}</p>
          {car.available && (
            <button onClick={() => bookCar(car._id)}>
              Book
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default Cars;