import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {

    try {

     const res = await axios.post(
  "http://localhost:8080/api/auth/login",
  {
    email: email,
    password: password
  }
);

console.log("LOGIN RESPONSE:", res.data);

console.log(res.data);

      const token = res.data.token;

      localStorage.setItem("token", token);

      navigate("/dashboard");

    } catch (err) {

      alert("Login failed");

    }
  };

  return (

    <div className="flex items-center justify-center h-screen bg-gray-900">

      <div className="bg-gray-800 p-8 rounded-xl text-white w-80">

        <h2 className="text-2xl mb-4">Login</h2>

        <input
          className="w-full p-2 mb-3 text-black"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-2 mb-3 text-black"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-green-500 p-2 rounded"
          onClick={handleLogin}
        >
          Login
        </button>

      </div>

    </div>

  );
}

export default Login;