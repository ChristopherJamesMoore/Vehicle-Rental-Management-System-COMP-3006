import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5001/cars")
      .then(res => setCars(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Vehicle Rental System</h1>

      <h2>Available Cars</h2>

      {cars.length === 0 ? (
        <p>No cars available</p>
      ) : (
        <ul>
          {cars.map(car => (
            <li key={car._id}>
              {car.make} {car.model} – £{car.pricePerDay}/day
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;