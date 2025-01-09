import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* Navbar */}
      <div className="navbar bg-base-100">
        <a className="btn btn-ghost text-xl">Hoag!</a>
      </div>

      {/* Main */}
      <div className="main">
        <h2 className="text-xl font-bold text-left">Blocks</h2>
        <h2 className="text-xl font-bold text-left">Transactions</h2>
        <h2 className="text-xl font-bold text-left">Wallet</h2>
      </div>
    </>
  );
}

export default App;
