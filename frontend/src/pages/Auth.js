import { useState } from "react";
import API from "../api";

function Auth({ onAuthed }) {
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
        setMsg("Registered! Now log in.");
        return;
      }

      const res = await API.post("/auth/login", { username, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("username", res.data.username);
      onAuthed();
    } catch (e) {
      setMsg(e.response?.data?.message || "Error");
    }
  };

  return (
    <div>
      <h2>{mode === "login" ? "Login" : "Register"}</h2>

      <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

      <button onClick={submit}>{mode === "login" ? "Login" : "Register"}</button>
      <button onClick={() => setMode(mode === "login" ? "register" : "login")} style={{ marginLeft: 8 }}>
        Switch to {mode === "login" ? "Register" : "Login"}
      </button>

      {msg && <p>{msg}</p>}
    </div>
  );
}

export default Auth;