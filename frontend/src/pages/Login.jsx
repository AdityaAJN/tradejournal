import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {

      const res = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          email,
          password
        }
      );

      console.log("LOGIN RESPONSE:", res.data);

      const token = res.data.token;

      localStorage.setItem("token", token);

      navigate("/dashboard");

    } catch (err) {

      console.error(err);
      alert("Login failed");

    }

  };

  return (

    <div className="flex items-center justify-center h-screen bg-gray-900">

      <div className="bg-gray-800 p-8 rounded-xl text-white w-96 shadow-lg">

        <h2 className="text-2xl mb-6 text-center">
          Login
        </h2>

        <input
          className="w-full p-3 mb-3 rounded text-black"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-3 mb-4 rounded text-black"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-green-600 hover:bg-green-700 p-3 rounded"
          onClick={handleLogin}
        >
          Login
        </button>

        {/* REGISTER LINK */}
        <p className="text-gray-400 mt-5 text-center">
          Don't have an account?
          <Link
            to="/register"
            className="text-blue-400 ml-2"
          >
            Register
          </Link>
        </p>

      </div>

    </div>

  );
}

export default Login;