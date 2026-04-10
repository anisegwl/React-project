import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUser, FaSearch, FaBars, FaTimes, FaHeart } from "react-icons/fa";
import ProductContext from "../context/product/ProductContext";
import UserContext from "../context/user/UserContext";
import WishlistContext from "../context/wishlist/WishlistContext";

const Navbar = ({ brandName = "Fitify" }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loadingUser, setLoadingUser] = useState(false);
  const [error, setError] = useState(null);

  const productContext = useContext(ProductContext);
  const userContext = useContext(UserContext);
  const wishlistContext = useContext(WishlistContext);

  // ✅ Correct cart access from ProductState I gave you
  const cartCount = productContext?.cartCount ?? 0;
  const wishlistCount = wishlistContext?.wishlist?.length ?? 0;

  const user = userContext?.user || null;
  const getUser = userContext?.getUser;

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    const fetchUser = async () => {
      if (token && !user && getUser) {
        try {
          setLoadingUser(true);
          setError(null);
          await getUser();
        } catch (err) {
          console.error("Failed to fetch user:", err);
          setError("Failed to load user data");
        } finally {
          setLoadingUser(false);
        }
      }
    };

    fetchUser();
  }, [token, user, getUser]);

  const handleSearch = (e) => {
    e.preventDefault();
    try {
      if (searchQuery.trim()) {
        navigate(`/search/${encodeURIComponent(searchQuery.trim())}`);
      } else {
        navigate("/");
      }
      setMobileMenuOpen(false);
    } catch (err) {
      console.error("Search navigation error:", err);
      setError("Search failed. Please try again.");
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      navigate("/login");
      setMobileMenuOpen(false);
    } catch (err) {
      console.error("Logout error:", err);
      setError("Logout failed. Please try again.");
    }
  };

  return (
    <nav className="bg-gray-900 text-white shadow-md sticky top-0 z-50">
      {/* Error Alert */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <div className="flex items-center justify-between">
            <p className="text-red-700 text-sm">{error}</p>
            <button onClick={() => setError(null)} className="text-red-500 hover:text-red-700">
              <FaTimes />
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-blue-500">{brandName}</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link to="/women-products" className="text-gray-300 hover:text-blue-500 font-medium transition-colors">
              WOMEN
            </Link>
            <Link to="/men-products" className="text-gray-300 hover:text-blue-500 font-medium transition-colors">
              MEN
            </Link>
            <Link to="/accsessories" className="text-gray-300 hover:text-blue-500 font-medium transition-colors">
              GEAR
            </Link>
            <Link to="/supplements" className="text-gray-300 hover:text-blue-500 font-medium transition-colors">
              Supplements
            </Link>
            <Link to="/contact-us" className="text-gray-300 hover:text-blue-500 font-medium transition-colors">
              Contact Us
            </Link>
          </div>

          {/* Right Section */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Search */}
            <form onSubmit={handleSearch} className="relative">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button type="submit" className="absolute left-3 top-3">
                <FaSearch className="text-gray-400" />
              </button>
            </form>

            {/* User Menu */}
            <div className="relative group">
              <button className="flex items-center space-x-2 text-gray-300 hover:text-blue-500 transition-colors">
                <FaUser />
                <span className="font-medium">
                  {loadingUser ? "Loading..." : token && user ? user.name : "Sign In"}
                </span>
              </button>

              {/* ✅ Dropdown fixed colors */}
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {token ? (
                  <div className="py-2">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                      {user ? `Hi, ${user.name}` : "Loading..."}
                    </div>
                    <Link
                      to="/my-orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      My Orders
                    </Link>

                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Profile
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="py-2">
                    <Link to="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Login
                    </Link>
                    <Link to="/signup" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Wishlist */}
            <Link to="/wishlist" className="relative flex items-center space-x-2 text-gray-300 hover:text-pink-500 transition-colors">
              <FaHeart className="text-xl" />
              <span className="font-medium hidden xl:inline">Save</span>
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-pink-600 text-white text-xs font-bold rounded-full h-5 min-w-[20px] px-1 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link to="/cartitems" className="relative flex items-center space-x-2 text-gray-300 hover:text-blue-500 transition-colors">
              <FaShoppingCart className="text-xl" />
              <span className="font-medium">Cart</span>

              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-blue-600 text-white text-xs font-bold rounded-full h-5 min-w-[20px] px-1 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-gray-300 hover:text-blue-500"
          >
            {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <div className="px-4 py-4 space-y-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="relative">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button type="submit" className="absolute left-3 top-3">
                <FaSearch className="text-gray-400" />
              </button>
            </form>

            {/* Mobile Links */}
            <div className="space-y-2">
              <Link to="/women-products" className="block py-2 text-gray-800 hover:text-blue-600 font-medium" onClick={() => setMobileMenuOpen(false)}>
                WOMEN
              </Link>
              <Link to="/men-products" className="block py-2 text-gray-800 hover:text-blue-600 font-medium" onClick={() => setMobileMenuOpen(false)}>
                MEN
              </Link>
              <Link to="/accsessories" className="block py-2 text-gray-800 hover:text-blue-600 font-medium" onClick={() => setMobileMenuOpen(false)}>
                GEAR
              </Link>
              <Link to="/supplements" className="block py-2 text-gray-800 hover:text-blue-600 font-medium" onClick={() => setMobileMenuOpen(false)}>
                Supplements
              </Link>
              <Link to="/contact-us" className="block py-2 text-gray-800 hover:text-blue-600 font-medium" onClick={() => setMobileMenuOpen(false)}>
                Contact Us
              </Link>
            </div>

            {/* Mobile User Actions */}
            <div className="pt-4 border-t">
              {token ? (
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">{user ? `Hi, ${user.name}` : "Loading..."}</p>
                  <Link to="/profile" className="block py-2 text-gray-800 hover:text-blue-600" onClick={() => setMobileMenuOpen(false)}>
                    Profile
                  </Link>
                  <button onClick={handleLogout} className="w-full text-left py-2 text-gray-800 hover:text-blue-600">
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link to="/login" className="block py-2 text-gray-800 hover:text-blue-600" onClick={() => setMobileMenuOpen(false)}>
                    Login
                  </Link>
                  <Link to="/signup" className="block py-2 text-gray-800 hover:text-blue-600" onClick={() => setMobileMenuOpen(false)}>
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Wishlist */}
            <Link to="/wishlist" className="flex items-center justify-between py-3 border-t" onClick={() => setMobileMenuOpen(false)}>
              <span className="text-gray-800 font-medium">Wishlist</span>
              <span className="bg-pink-600 text-white text-sm font-bold rounded-full h-6 min-w-[24px] px-1 flex items-center justify-center">
                {wishlistCount}
              </span>
            </Link>

            {/* Mobile Cart */}
            <Link to="/cartitems" className="flex items-center justify-between py-3 border-t border-gray-100" onClick={() => setMobileMenuOpen(false)}>
              <span className="text-gray-800 font-medium">Shopping Cart</span>
              <span className="bg-blue-600 text-white text-sm font-bold rounded-full h-6 min-w-[24px] px-1 flex items-center justify-center">
                {cartCount}
              </span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
