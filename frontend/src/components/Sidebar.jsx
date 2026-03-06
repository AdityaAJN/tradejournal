import { Link } from "react-router-dom";

function Sidebar() {

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (

    <div className="w-64 bg-gray-800 text-white min-h-screen p-5 flex flex-col">

      <h1 className="text-2xl font-bold mb-8">
        Trade Journal
      </h1>

      <nav className="space-y-4 flex-1">

        <Link
          to="/dashboard"
          className="block hover:bg-gray-700 p-2 rounded"
        >
          Dashboard
        </Link>

        <Link
          to="/trades"
          className="block hover:bg-gray-700 p-2 rounded"
        >
          Trades
        </Link>

        <Link
          to="/performance"
          className="block hover:bg-gray-700 p-2 rounded"
        >
          Performance
        </Link>

        {/* NEW FEATURE */}
        <Link
  to="/replay"
  className="block hover:bg-gray-700 p-2 rounded"
>
  Replay
</Link>

      </nav>

      {/* LOGOUT */}
      <button
        onClick={logout}
        className="mt-10 bg-red-500 px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>

    </div>

  );

}

export default Sidebar;