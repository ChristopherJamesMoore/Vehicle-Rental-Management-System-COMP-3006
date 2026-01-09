import { useEffect, useState } from "react";
import API from "../api";
import socket from "../socket";

function Cars() {
  const [cars, setCars] = useState([]);

  // admin form fields
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // booking fields
  const [startDate, setStartDate] = useState("2026-01-10");
  const [endDate, setEndDate] = useState("2026-01-12");

  const role = localStorage.getItem("role");
  const isAdmin = role === "admin";

  const fetchCars = async () => {
    const res = await API.get("/cars");
    setCars(res.data);
  };

  useEffect(() => {
    fetchCars();
    socket.on("bookingUpdated", fetchCars);
    return () => socket.off("bookingUpdated", fetchCars);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addCar = async () => {
    if (!make || !model || !price) return;

    await API.post("/cars", {
      make,
      model,
      pricePerDay: Number(price),
      imageUrl
    });

    setMake("");
    setModel("");
    setPrice("");
    setImageUrl("");
    fetchCars();
  };

  const deleteCar = async (id) => {
    await API.delete(`/cars/${id}`);
    fetchCars();
  };

  const bookCar = async (carId) => {
    await API.post("/bookings", { carId, startDate, endDate });
  };

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto" }}>
      <h2>Cars</h2>

      {isAdmin ? (
        <div style={{ marginBottom: 20, padding: 12, border: "1px solid #ddd", borderRadius: 8 }}>
          <h3>Add a car (admin)</h3>
          <div style={{ display: "grid", gap: 8, gridTemplateColumns: "1fr 1fr 1fr" }}>
            <input value={make} placeholder="Make" onChange={(e) => setMake(e.target.value)} />
            <input value={model} placeholder="Model" onChange={(e) => setModel(e.target.value)} />
            <input value={price} placeholder="Price per day" onChange={(e) => setPrice(e.target.value)} />
          </div>

          <div style={{ display: "grid", gap: 8, gridTemplateColumns: "1fr auto", marginTop: 8 }}>
            <input
              value={imageUrl}
              placeholder='Image URL (or /images/car.jpg)'
              onChange={(e) => setImageUrl(e.target.value)}
            />
            <button onClick={addCar}>Add Car</button>
          </div>

          <p style={{ marginTop: 8, fontSize: 12 }}>
            Tip: Use a direct image URL ending in .jpg/.png, or place files in frontend/public/images and use /images/filename.jpg
          </p>
        </div>
      ) : (
        <p style={{ fontStyle: "italic" }}>Log in as admin to add or delete cars.</p>
      )}

      <div style={{ marginBottom: 16, padding: 12, border: "1px solid #ddd", borderRadius: 8 }}>
        <h3>Booking dates</h3>
        <div style={{ display: "flex", gap: 10 }}>
          <div>
            <div style={{ fontSize: 12 }}>Start date</div>
            <input value={startDate} type="date" onChange={(e) => setStartDate(e.target.value)} />
          </div>
          <div>
            <div style={{ fontSize: 12 }}>End date</div>
            <input value={endDate} type="date" onChange={(e) => setEndDate(e.target.value)} />
          </div>
        </div>
      </div>

      {cars.length === 0 ? (
        <p>No cars yet</p>
      ) : (
        <div
          style={{
            display: "grid",
            gap: 16,
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))"
          }}
        >
          {cars.map((car) => (
            <div
              key={car._id}
              style={{
                border: "1px solid #ddd",
                borderRadius: 12,
                overflow: "hidden",
                background: "#fff"
              }}
            >
              {/* Image box: increased height from 160 -> 200 */}
              <div style={{ height: 200, background: "#f5f5f5" }}>
                <img
                  src={car.imageUrl || "/images/placeholder.jpg"}
                  alt={`${car.make} ${car.model}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  onError={(e) => {
                    // if the URL fails, fall back to placeholder once
                    if (e.currentTarget.src.includes("/images/placeholder.jpg")) return;
                    e.currentTarget.src = "/images/placeholder.jpg";
                  }}
                />
              </div>

              <div style={{ padding: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                  <div>
                    <div style={{ fontWeight: 700 }}>
                      {car.make} {car.model}
                    </div>
                    <div style={{ fontSize: 13, color: "#555" }}>£{car.pricePerDay}/day</div>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>
                    {car.available ? "Available" : "Booked"}
                  </div>
                </div>

                <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {car.available && <button onClick={() => bookCar(car._id)}>Book</button>}
                  {isAdmin && <button onClick={() => deleteCar(car._id)}>Delete</button>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Cars;