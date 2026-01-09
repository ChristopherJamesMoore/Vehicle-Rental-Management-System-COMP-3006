import { Link } from "react-router-dom";

function Navbar() {
  const role = localStorage.getItem("role");

  return (
    <div
      style={{
        height: 56,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        borderBottom: "1px solid #e5e7eb",
        background: "#ffffff",
        position: "sticky",
        top: 0,
        zIndex: 10
      }}
    >
      <div style={{ fontWeight: 600, fontSize: 18 }}>
        Vehicle Rental
      </div>

      <div style={{ display: "flex", gap: 16, fontSize: 14 }}>
        <Link to="/" style={linkStyle}>Cars</Link>
        <Link to="/bookings" style={linkStyle}>Bookings</Link>
        <Link to="/login" style={linkStyle}>Login</Link>
        {role === "admin" && <span style={{ color: "#888" }}>(admin)</span>}
      </div>
    </div>
  );
}

const linkStyle = {
  textDecoration: "none",
  color: "#111",
  fontWeight: 500
};

export default Navbar;