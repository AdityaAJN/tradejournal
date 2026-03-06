import Sidebar from "../components/Sidebar";
import TradeTable from "../components/TradeTable";

function Trades() {

  return (

    <div className="flex bg-gray-900 min-h-screen">

      <Sidebar />

      <div className="flex-1 p-6">

        <h1 className="text-2xl text-white mb-6">
          Trades
        </h1>

        <TradeTable />

      </div>

    </div>

  );

}

export default Trades;