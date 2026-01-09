import { useEffect, useState } from "react";
import axios from "axios";
import socket from "../socket";

const API = "http://localhost:5001";

function Cars() {
  const [cars, setCars] = useState([]);
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [price, setPrice] = useState("");
  const [userName, setUserName] = useState("Guest");

  const fetchCars = async () => {
    const res = await axios.get(`${API}/cars`);
    setCars(res.data);
  };

  useEffect(() => {
    fetchCars();
    socket.on("bookingUpdated", fetchCars);
    return () => socket.off("bookingUpdated");
  }, []);

  const addCar = async () => {
    await axios.post(`${API}/cars`, {
      make,
      model,
      pricePerDay: Number(price)
    });
    setMake(""); setModel(""); setPrice("");
    fetchCars();
  };

  const deleteCar = async (id) => {
    await axios.delete(`${API}/cars/${id}`);
    fetchCars();
  };

  const bookCar = async (carId) => {
    await axios.post(`${API}/bookings`, {
      carId,
      userName,
      startDate: new Date(),
      endDate: new Date(Date.now() + 86400000)
    });
  };

  return (
    <div>
      <h2>Cars</h2>

      <div style={{ display: "flex", gap: 8 }}>
        <input placeholder="Make" value={make} onChange={e => setMake(e.target.value)} />
        <input placeholder="Model" value={model} onChange={e => setModel(e.target.value)} />
        <input placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} />
        <button onClick={addCar}>Add Car</button>
      </div>

      <input
        style={{ marginTop: 10 }}
        placeholder="Your name"
        value={userName}
        onChange={e => setUserName(e.target.value)}
      />

      <ul>
        {cars.map(car => (
          <li key={car._id} style={{ marginTop: 10 }}>
            <b>{car.make} {car.model}</b> — £{car.pricePerDay}/day — {car.available ? "Available" : "Booked"}
            {" "}
            <button onClick={() => deleteCar(car._id)}>Delete</button>
            {" "}
            {car.available && <button onClick={() => bookCar(car._id)}>Book</button>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Cars;