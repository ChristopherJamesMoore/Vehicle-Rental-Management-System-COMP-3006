import { useEffect, useState } from "react";
import axios from "axios";
import socket from "../socket";

const API = "http://localhost:5001";

function Bookings() {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    const res = await axios.get(`${API}/bookings`);
    setBookings(res.data);
  };

  useEffect(() => {
    fetchBookings();
    socket.on("bookingUpdated", fetchBookings);
    return () => socket.off("bookingUpdated");
  }, []);

  const cancel = async (id) => {
    await axios.delete(`${API}/bookings/${id}`);
  };

  return (
    <div>
      <h2>Bookings</h2>
      <ul>
        {bookings.map(b => (
          <li key={b._id}>
            {b.carId?.make} {b.carId?.model} — {b.userName} — {b.status}
            {" "}
            {b.status !== "cancelled" && <button onClick={() => cancel(b._id)}>Cancel</button>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Bookings;