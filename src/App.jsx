import { useState } from "react";
import './styles/App.css';
import "./styles/login.css"
import Navbar from "./components/Navbar";
import { toast, ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./components/About";
import Footer from "./components/layout/Footer";
import Home from "./components/Home";
import Contact from "./components/contact";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Services from "./components/Services";
import Userlist from "./components/Userlist";
import Userdetail from "./components/Userdetail";

function App() {
  const [text, setText] = useState("dark mode");
  const [mode, setMode] = useState("light");
  const [alert, setAlert] = useState(null);
  const [darkModeTxt, setDarkModeTxt] = useState("dark");


  const toggleMode = () => {
    if (mode === "dark") {
      setMode("light");
      setText("dark mode");
      showAlert("success", "Light mode has been enabled");
      toast("Light mode enabled");
      setDarkModeTxt("dark");
    } else {
      setMode("dark");
      setText("light mode");
      showAlert("success", "Dark mode has been enabled");
      toast("Dark mode enabled");
      setDarkModeTxt("light");
    }
  };

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 2000);
  };

  const brandName = "UOIT-MASR";

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
        />
        <Navbar
          mode={mode}
          text={text}
          brandName={brandName}
          toggleMode={toggleMode}
          alert={alert}
        />


        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/services" element={<Services />} />
          <Route path="/users" element={<Userlist />} />
          <Route path="/:userId/:userName/:course" element={<Userdetail />} />
        </Routes>

        <Footer mode={mode} darkModeTxt={darkModeTxt} />
      </Router>
    </>
  );
}

export default App;
