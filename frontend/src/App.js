import { useState } from "react";
import Cars from "./pages/Cars";
import Bookings from "./pages/Bookings";

function App() {
  const [page, setPage] = useState("cars");

  return (
    <div style={{ padding: 20 }}>
      <h1>Vehicle Rental System</h1>

      <button onClick={() => setPage("cars")}>Cars</button>
      <button onClick={() => setPage("bookings")}>Bookings</button>

      {page === "cars" ? <Cars /> : <Bookings />}
    </div>
  );
}

export default App;