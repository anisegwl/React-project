import { useState } from "react";

import "./App.css";
import Navbar from "./components/Navbar";

import HeroSection from "./components/Banner";
import Card from "./components/Card";
import Alert from "./components/Alert";
import { toast, ToastContainer } from "react-toastify"

function App() {
  const [btntext, setBtnText] = useState("Dark Mode");
  const [mode, setMode] = useState("light");
  const [text, setText] = useState("dark");
  const [alert, setAlert] = useState(null);

  

  const showAlert = (type, message) => {
    setAlert({
      type: type,
      message: message,
    }
    );
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  const toggleMode = (e) => {
    e.preventDefault();

    if (mode === "light") {
      setMode("dark");
      setBtnText("Light Mode");
      setText("dark")
      showAlert("success !!", "Dark Mode has been activated");
      toast("Dark Mode Enabled");

    } else {
      setMode("light");
      setBtnText("Dark Mode");
      setText("light");
      showAlert("success", "Light Mode has been enabled");
      toast("Light Mode Enabled");
    }
  };

  let brandName = "Hamro-bazzar";


  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        // transition={Bounce}
      />
      <Navbar brandName={brandName} toggleMode={toggleMode} mode={mode} btntext={btntext} />
      <Alert alert={alert} />
      <HeroSection />
      <Card toggleMode={toggleMode} mode={mode} text={text} />
    </>
  );
}

export default App;
