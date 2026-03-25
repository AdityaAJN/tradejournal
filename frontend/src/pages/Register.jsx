import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {

  const navigate = useNavigate();
  const API = "https://tradejournal-backend-uwpp.onrender.com";

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  const register = async () => {

    if (!username || !email || !password) {
      alert("All fields are required");
      return;
    }

    try {

      setLoading(true);

      const wakeTimer = setTimeout(() => {
        setStatusMsg("⏳ Backend is waking up... please wait up to 30 seconds.");
      }, 4000);

      const res = await axios.post(`${API}/api/auth/register`, {
        username,
        email,
        password
      }, { timeout: 60000 });

      clearTimeout(wakeTimer);
      setStatusMsg("");

      alert("Registration Successful! Please login.");
      navigate("/login");

    } catch (err) {

      console.error("Register error:", err);
      setStatusMsg("");

      if (err.code === "ECONNABORTED") {
        alert("Timed out. Backend is still waking up. Please try again.");
      } else if (err.response) {
        const errorMsg = typeof err.response.data === "string" ? err.response.data : "Registration failed";
        alert(errorMsg);
      } else {
        alert("Server not responding. Try again in 30 seconds.");
      }

    } finally {
      setLoading(false);
    }

  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") register();
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (

    <div className="flex items-center justify-center h-screen bg-gray-900">

      <div className="bg-gray-800 p-8 rounded-xl text-white w-96 shadow-lg">

        <h2 className="text-2xl mb-6 text-center">Create Account</h2>

        <input
          className="p-3 mb-3 w-full rounded text-black"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <input
          className="p-3 mb-3 w-full rounded text-black"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <input
          type="password"
          className="p-3 mb-4 w-full rounded text-black"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        {statusMsg && (
          <p className="text-yellow-400 text-sm mb-3 text-center">{statusMsg}</p>
        )}

        <button
          onClick={register}
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 px-4 py-3 rounded w-full disabled:opacity-50"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-gray-400 mt-5 text-center">
          Already have an account?
          <Link to="/login" className="text-blue-400 ml-2">Login</Link>
        </p>

      </div>

    </div>

  );

}

export default Register;