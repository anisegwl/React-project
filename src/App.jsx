import { useState } from "react";
import './styles/App.css';
import "./styles/login.css";
import Navbar from "./components/Navbar";
import { toast, ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Footer from "./components/layout/Footer";
import Home from "./components/Home";
import Contact from "./components/contact";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Userlist from "./components/Userlist";
import Userdetail from "./components/Userdetail";
import About from "./components/About";
import ProductState from "./context/ProductState";
import News from "./components/News";
import CartItems from "./components/CartItems";
import AddProduct from "./components/AddProduct";
import Payment from "./components/Payment";
import UserState from "./context/Userstate";
import SearchResult from "./components/SearchResult";
import Testimonial from "./components/Testimonial";
import Header from "./components/layout/Header";
import WomenProducts from "./components/WomenProducts";
import MenProducts from "./components/MenProducts";
import Profile from "./components/Profile";
import Supplements from "./components/Supplements";
import Accsessories from "./components/Accsessories";
import { useEffect } from "react";

// Wrapper component to access location inside App
const AppWrapper = () => {
  const location = useLocation();
  const hideLayout = ["/login", "/signup"].includes(location.pathname);

  const [text, setText] = useState("dark mode");
  const [mode, setMode] = useState("dark");
  const [alert, setAlert] = useState(null);

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 2000);
  };

  const brandName = "UOIT-Appareals";

  return (
    <>
      {!hideLayout && <Header />}
      {!hideLayout && (
        <Navbar
          mode={mode}
          text={text}
          brandName={brandName}
          alert={alert}
        />
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/news" element={<News />} />
        <Route path="/women-products" element={<WomenProducts />} />
        <Route path="/:userId/:userName/:course" element={<Userdetail />} />
        <Route path="/cartitems" element={<CartItems />} />
        <Route path="/men-products" element={<MenProducts />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/search/:searchQuery" element={<SearchResult />} />
        <Route path="/products/:searchQuery" element={<About />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/supplements" element={<Supplements />} />
        <Route path="/accsessories" element={<Accsessories />} />
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
};

function App() {
  return (
    <UserState>
      <ProductState>
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
          <AppWrapper />
        </Router>
      </ProductState>
    </UserState>
  );
}

export default App;
