import "./styles/App.css";

import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Navbar from "./components/Navbar";

// Pages
import Home from "./components/pages/Home";
import Contact from "./components/pages/Static/Contact";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import CartItems from "./components/pages/CartItems";
import Payment from "./components/pages/Payment";
import SearchResult from "./components/pages/SearchResult";
import WomenProducts from "./components/pages/Products/WomenProducts";
import MenProducts from "./components/pages/Products/MenProducts";
import Profile from "./components/pages/Profile";
import Supplements from "./components/pages/Products/Supplements";
import Accsessories from "./components/pages/Products/Accsessories";
import Checkout from "./components/pages/Checkout";
import OrderSuccess from "./components/pages/OrderSuccess";
import ProductDetails from "./components/pages/ProductDetails";
import Wishlist from "./components/pages/Wishlist";
// Admin
import AdminRoutes from "./admin/AdminRoutes";

// Context
import ProductState from "./context/product/ProductState";
import UserState from "./context/user/Userstate";
import { AuthProvider } from "./context/auth/AuthContext";
import WishlistState from "./context/wishlist/WishlistState";
import MyOrders from "./components/pages/MyOrders";

// Wrapper
const AppWrapper = () => {
  const location = useLocation();

  // Hide header/navbar/footer for admin + auth pages
  const hideLayout =
    location.pathname.startsWith("/admin") ||
    ["/login", "/signup"].includes(location.pathname);

  return (
    <>
      {!hideLayout && <Header />}
      {!hideLayout && <Navbar />}

      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Products */}
        <Route path="/women-products" element={<WomenProducts />} />
        <Route path="/men-products" element={<MenProducts />} />
        <Route path="/supplements" element={<Supplements />} />
        <Route path="/accsessories" element={<Accsessories />} />
        <Route path="/search/:searchQuery" element={<SearchResult />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/wishlist" element={<Wishlist />} />

        {/* User */}
        <Route path="/order-success/:id" element={<OrderSuccess />} />
        <Route path="my-orders" element={<MyOrders />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/cartitems" element={<CartItems />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/profile" element={<Profile />} />

        {/* Admin */}
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <UserState>
        <WishlistState>
          <ProductState>
            <Router>
              <ToastContainer position="top-center" autoClose={2000} theme="light" />
              <AppWrapper />
            </Router>
          </ProductState>
        </WishlistState>
      </UserState>
    </AuthProvider>
  );
}

export default App;
