import { useState } from "react";
import Navbar from "./Components/Navbar";
import Home from "./pages/home";

import "./App.css";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <Navbar onSearch={setSearchQuery} />
      <Home searchQuery={searchQuery} />
    </>
  );
}

export default App;