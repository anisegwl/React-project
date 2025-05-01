import { useState } from "react";

import "./App.css";
import Navbar from "./components/Navbar";

import HeroSection from "./components/Banner";
import Card from "./components/card";

function App() {
  const [btntext, setBtnText] = useState("Dark Mode");
  const [mode, setMode] = useState("light");
  const [text, setText] = useState("dark");
  

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      setBtnText("Light Mode");
      setText("dark")
    } else {
      setMode("light");
      setBtnText("Dark Mode");
      setText("light");
    }
  };

  let brandName = "Hamro-bazzar";

  return (
    <>
      <Navbar brandName={brandName} toggleMode={toggleMode}  mode={mode} btntext ={btntext} />
      <HeroSection />
      <Card toggleMode={toggleMode} mode={mode} text={text} />
    </>
  );
}

export default App;
