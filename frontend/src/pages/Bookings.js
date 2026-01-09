import { useEffect, useState } from "react";
import API from "../api";
import socket from "../socket";

function Bookings() {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    const res = await API.get("/bookings");
    setBookings(res.data);
  };

  useEffect(() => {
    fetchBookings();
    socket.on("bookingUpdated", fetchBookings);
    return () => socket.off("bookingUpdated", fetchBookings);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cancelBooking = async (id) => {
    await API.delete(`/bookings/${id}`);
  };

  return (
    <div>
      <h2>Bookings</h2>

      {bookings.length === 0 ? (
        <p>No bookings yet</p>
      ) : (
        <ul>
          {bookings.map((b) => (
            <li key={b._id} style={{ marginBottom: 10 }}>
              <b>{b.carId?.make} {b.carId?.model}</b> — {b.userName} —{" "}
              {new Date(b.startDate).toLocaleDateString()} → {new Date(b.endDate).toLocaleDateString()} —{" "}
              <b>£{b.totalCost ?? "N/A"}</b> — <i>{b.status}</i>

              {" "}
              {b.status !== "cancelled" && (
                <button onClick={() => cancelBooking(b._id)}>Cancel</button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Bookings;