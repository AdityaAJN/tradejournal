import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {

    if (!username || !email || !password) {
      alert("All fields are required");
      return;
    }

    try {

      await axios.post("https://tradejournal-backend-uwpp.onrender.com/api/auth/register", {
        username,
        email,
        password
      });

      alert("Registration Successful!");

      navigate("/");

    } catch (err) {

      console.error(err);
      alert("Registration failed");

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
          onChange={(e)=>setUsername(e.target.value)}
        />

        <input
          className="p-3 mb-3 w-full rounded text-black"
          placeholder="Email"
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          className="p-3 mb-4 w-full rounded text-black"
          placeholder="Password"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button
          onClick={register}
          className="bg-green-600 hover:bg-green-700 px-4 py-3 rounded w-full"
        >
          Register
        </button>

        {/* LOGIN LINK */}
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