import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const API = "https://tradejournal-backend-uwpp.onrender.com";

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {

    if (!username || !email || !password) {
      alert("All fields are required");
      return;
    }

    try {

      const res = await axios.post(`${API}/api/auth/register`, {
        username,
        email,
        password
      });

      console.log(res.data);

      alert("Registration Successful!");

      navigate("/");

    } catch (err) {

      console.error("Register error:", err);

      if (err.response) {
        alert(err.response.data.message || "Registration failed");
      } else {
        alert("Server not responding");
      }

    }

  };

  return (

    <div className="flex items-center justify-center h-screen bg-gray-900">

      <div className="bg-gray-800 p-8 rounded-xl text-white w-96 shadow-lg">

        <h2 className="text-2xl mb-6 text-center">
          Create Account
        </h2>

        <input
          className="p-3 mb-3 w-full rounded text-black"
          placeholder="Username"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
        />

        <input
          className="p-3 mb-3 w-full rounded text-black"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          className="p-3 mb-4 w-full rounded text-black"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button
          onClick={register}
          className="bg-green-600 hover:bg-green-700 px-4 py-3 rounded w-full"
        >
          Register
        </button>

        <p className="text-gray-400 mt-5 text-center">
          Already have an account?
          <Link
            to="/"
            className="text-blue-400 ml-2"
          >
            Login
          </Link>
        </p>

      </div>

    </div>

  );

}

export default Register;