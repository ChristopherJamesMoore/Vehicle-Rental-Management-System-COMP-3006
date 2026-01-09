import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Cars from "./pages/Cars";
import Bookings from "./pages/Bookings";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div style={{ padding: 24 }}>
        <Routes>
          <Route path="/" element={<Cars />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;