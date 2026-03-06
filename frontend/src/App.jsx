import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Trades from "./pages/Trades";
import Performance from "./pages/Performance";
import Replay from "./pages/Replay";   


function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/trades" element={<Trades />} />

        <Route path="/performance" element={<Performance />} />

        {/* NEW FEATURE */}
       <Route path="/replay" element={<Replay />} />

      </Routes>

    </BrowserRouter>

  );

}

export default App;