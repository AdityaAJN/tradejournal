import { Link } from "react-router-dom";

function Home() {

  return (

    <div
      className="h-screen flex flex-col justify-center items-center text-white"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >

      <div className="bg-black/60 p-10 rounded-xl text-center">

        <h1 className="text-5xl font-bold mb-6">
          Trade Journal
        </h1>

        <p className="text-lg mb-8 text-gray-300">
          Track your trades. Analyze performance. Improve your edge.
        </p>

        <Link
          to="/login"
          className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg text-lg"
        >
          Explore
        </Link>

      </div>

    </div>

  );

}

export default Home;