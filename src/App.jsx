import { useState } from "react";

import "./App.css";
import Navbar from "./components/Navbar";

import HeroSection from "./components/Banner";
import Card from "./components/card";
import Alert from "./components/Alert";
import { toast, ToastContainer } from "react-toastify";
import Class from "./components/Class";
import Function from "./components/Function";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import About from "./components/About";
import Footer from "./components/layout/Footer";
import Home from "./components/Home";
import Contact from "./components/contact";

function App() {
  const [text, setText] = useState("dark mode");
  const [mode, setMode] = useState("light");
  const [alert, setAlert] = useState(null);

  const toggleMode = (e) => {
    e.preventDefault();
    if (mode == "dark") {
      setMode("light");
      setText("dark mode");
      showAlert("success", "light mode has been enabled");
      toast("light mode ");
    } else {
      setMode("dark");

      setText("light mode");

      showAlert("success", "dark mode has been enabled");
      toast("sign up succesfully ");
    }
  };
  const showAlert = (type, message) => {
    setAlert({
      type: type,
      message: message,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };
  let brandName = "Hamro-bazzar";

  return (
    <>
      <Router>
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
          theme="light"
          // transition={Bounce}
        />
        <Navbar
          mode={mode}
          text={text}
          brandName={brandName}
          toggleMode={toggleMode}
          alert={alert}
        />{" "}
        <Alert alert={alert} />
        {/* //passing mode as props */}
        {/* <HeroSection /> */}
        {/* <Class />
        <Function />
        <Card mode={mode} /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/contact-us" element={<Contact />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;