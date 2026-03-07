import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  BarChart3,
  PlaySquare,
  LogOut
} from "lucide-react";

function Sidebar() {

  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const navItem =
    "flex items-center gap-3 px-3 py-2 rounded-lg transition";

  const active =
    "bg-blue-600 text-white";

  const inactive =
    "text-gray-300 hover:bg-gray-700";

  return (

    <div className="w-64 bg-gray-900 text-white min-h-screen p-6 flex flex-col border-r border-gray-800">

      {/* LOGO */}
      <h1 className="text-2xl font-bold mb-10 tracking-wide">
        Trade Journal
      </h1>

      {/* NAVIGATION */}
      <nav className="space-y-3 flex-1">

        <Link
          to="/dashboard"
          className={`${navItem} ${
            location.pathname === "/dashboard"
              ? active
              : inactive
          }`}
        >
          <LayoutDashboard size={18} />
          Dashboard
        </Link>

        <Link
          to="/trades"
          className={`${navItem} ${
            location.pathname === "/trades"
              ? active
              : inactive
          }`}
        >
          <ClipboardList size={18} />
          Trades
        </Link>

        <Link
          to="/performance"
          className={`${navItem} ${
            location.pathname === "/performance"
              ? active
              : inactive
          }`}
        >
          <BarChart3 size={18} />
          Performance
        </Link>

        <Link
          to="/replay"
          className={`${navItem} ${
            location.pathname === "/replay"
              ? active
              : inactive
          }`}
        >
          <PlaySquare size={18} />
          Replay
        </Link>

      </nav>

      {/* LOGOUT */}
      <button
        onClick={logout}
        className="flex items-center gap-3 bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
      >
        <LogOut size={18} />
        Logout
      </button>

    </div>

  );

}

export default Sidebar;