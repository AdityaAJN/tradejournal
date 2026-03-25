import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {

  const navigate = useNavigate();
  const API = "https://tradejournal-backend-uwpp.onrender.com";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  const handleLogin = async () => {

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {

      setLoading(true);

      const wakeTimer = setTimeout(() => {
        setStatusMsg("⏳ Backend is waking up... please wait up to 30 seconds.");
      }, 4000);

      const res = await axios.post(`${API}/api/auth/login`, {
        email,
        password
      }, { timeout: 60000 });

      clearTimeout(wakeTimer);
      setStatusMsg("");

      localStorage.setItem("token", res.data);
      navigate("/dashboard");

    } catch (err) {

      console.error("Login error:", err);
      setStatusMsg("");

      if (err.code === "ECONNABORTED") {
        alert("Timed out. Backend is still waking up. Please try again.");
      } else if (err.response) {
        alert(err.response.data || "Invalid credentials");
      } else {
        alert("Server not responding. Try again in 30 seconds.");
      }

    } finally {
      setLoading(false);
    }

  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (

    <div className="flex items-center justify-center h-screen bg-gray-900">

      <div className="bg-gray-800 p-8 rounded-xl text-white w-96 shadow-lg">

        <h2 className="text-2xl mb-6 text-center">Login</h2>

        <input
          className="w-full p-3 mb-3 rounded text-black"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <input
          type="password"
          className="w-full p-3 mb-4 rounded text-black"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        {statusMsg && (
          <p className="text-yellow-400 text-sm mb-3 text-center">{statusMsg}</p>
        )}

        <button
          className="w-full bg-green-600 hover:bg-green-700 p-3 rounded disabled:opacity-50"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-gray-400 mt-5 text-center">
          Don't have an account?
          <Link to="/register" className="text-blue-400 ml-2">Register</Link>
        </p>

      </div>

    </div>

  );

}

export default Login;