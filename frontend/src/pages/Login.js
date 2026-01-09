import { useState } from "react";
import API from "../api";

function Login() {
  const [mode, setMode] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async () => {
    setMsg("");
    try {
      if (mode === "register") {
        await API.post("/auth/register", { username, password });
        setMode("login");
        setMsg("Registered. You can now log in.");
        return;
      }

      const res = await API.post("/auth/login", { username, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("username", res.data.username);
      setMsg("Logged in. Go to Cars or Bookings.");
    } catch (e) {
      setMsg(e.response?.data?.message || e.message || "Error");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    setMsg("Logged out.");
  };

  return (
    <div style={{ maxWidth: 420 }}>
      <h2>{mode === "login" ? "Login" : "Register"}</h2>

      <div style={{ display: "grid", gap: 10 }}>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={submit}>{mode === "login" ? "Login" : "Register"}</button>
          <button onClick={() => setMode(mode === "login" ? "register" : "login")}>
            Switch to {mode === "login" ? "Register" : "Login"}
          </button>
          <button onClick={logout}>Logout</button>
        </div>

        {msg && <p>{msg}</p>}
      </div>
    </div>
  );
}

export default Login;