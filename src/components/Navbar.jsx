import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/Navbar.css";
import "../styles/index.css";
import { FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";
import logo from '../assets/logo.png'

// Context imports
import ProductContext from "../context/ProductContext";
import UserContext from "../context/UserContext";

const Navbar = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  // Access cart from ProductContext
  const productContext = useContext(ProductContext);
  const { state: { cart } = {} } = productContext || {};

  // Access user and getUser from UserContext
  const userContext = useContext(UserContext);
  const { user, getUser } = userContext || {};

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token && !user) {
      getUser();
    }
  }, [token, user]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${searchQuery}`);
    } else {
      navigate("/");
    }
  };

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="fitify-navbar">
      <div className="navbar-container">
        {/* Left Section - Logo */}
        <div className="navbar-left">
          <Link className="navbar-logo" to="/">
            <img src={logo} alt={props.brandName} style={{height: 150, width:150, mixBlendMode:"multiply" }} className="logo-img" />
          </Link>
        </div>

        {/* Center Section - Navigation Links */}
        <div className="navbar-center">
          <ul className="nav-links">
            <li className="nav-item">
              <Link className="nav-link" to="/women-products">WOMEN</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/men-products">MEN</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/accsessories">GEAR</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/supplements">Supplements</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact-us">Contact Us</Link>
            </li>
          </ul>
        </div>

        {/* Right Section - Actions */}
        <div className="navbar-right">
          {/* Search */}
          <div className="search-container">
            <form onSubmit={handleSearch} className="search-form">
              <input
                className="search-input"
                type="search"
                name="searchquery"
                value={searchQuery}
                onChange={handleChange}
                placeholder="Search"
                aria-label="Search"
              />
              <button className="search-btn" type="submit">
                <FaSearch className="search-icon" />
              </button>
            </form>
          </div>

          {/* User Account */}
          <div className="user-menu">
            <div className="dropdown">
              <button
                className="user-btn"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <FaUser className="user-icon" />
                <span className="user-text">
                  {token && user ? user.name : "Sign In"}
                </span>
              </button>
              <ul className="dropdown-menu dropdown-menu-end user-dropdown">
                {token ? (
                  <>
                    <li className="dropdown-item user-greeting">
                      {user ? `Hi, ${user.name}` : "Loading..."}
                    </li>
                    <li>
                      <Link to="/profile" className="dropdown-item">
                        Profile
                      </Link>
                    </li>
                    <li>
                      <button onClick={handleLogout} className="dropdown-item logout-btn">
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link to="/login" className="dropdown-item">Login</Link>
                    </li>
                    <li>
                      <Link to="/signup" className="dropdown-item">Sign Up</Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>

          {/* Shopping Cart */}
          <div className="cart-container">
            <Link to="/cartitems" className="cart-link">
              <button className="cart-btn" type="button">
                <FaShoppingCart className="cart-icon" />
                <span className="cart-text">Cart</span>
                {cart && cart.length > 0 && (
                  <span className="cart-badge">
                    {cart.length}
                  </span>
                )}
              </button>
            </Link>
          </div>

         
        </div>

        {/* Mobile Menu Toggle - for responsive design */}
        <button
          className="mobile-menu-toggle d-lg-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mobileNav"
          aria-controls="mobileNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className="collapse d-lg-none" id="mobileNav">
        <div className="mobile-nav">
          {/* Mobile Search */}
          <div className="mobile-search">
            <form onSubmit={handleSearch} className="mobile-search-form">
              <input
                className="mobile-search-input"
                type="search"
                name="searchquery"
                value={searchQuery}
                onChange={handleChange}
                placeholder="Search"
                aria-label="Search"
              />
              <button className="mobile-search-btn" type="submit">
                <FaSearch className="search-icon" />
              </button>
            </form>
          </div>

          {/* Mobile Navigation Links */}
          <ul className="mobile-nav-links">
            <li><Link to="/women" className="mobile-nav-link" data-bs-toggle="collapse" data-bs-target="#mobileNav">WOMEN</Link></li>
            <li><Link to="/men" className="mobile-nav-link" data-bs-toggle="collapse" data-bs-target="#mobileNav">MEN</Link></li>
            <li><Link to="/gear" className="mobile-nav-link" data-bs-toggle="collapse" data-bs-target="#mobileNav">GEAR</Link></li>
            <li><Link to="/supplements" className="mobile-nav-link" data-bs-toggle="collapse" data-bs-target="#mobileNav">Supplements</Link></li>
            <li><Link to="/contact-us" className="mobile-nav-link" data-bs-toggle="collapse" data-bs-target="#mobileNav">Contact Us</Link></li>
          </ul>

          {/* Mobile User Actions */}
          <div className="mobile-user-actions">
            <div className="mobile-user-section">
              <h6 className="mobile-section-title">Account</h6>
              {token ? (
                <div className="mobile-user-info">
                  <p className="mobile-user-greeting">
                    {user ? `Hi, ${user.name}` : "Loading..."}
                  </p>
                  <Link to="/profile" className="mobile-action-link" data-bs-toggle="collapse" data-bs-target="#mobileNav">
                    <FaUser className="mobile-action-icon" />
                    Profile
                  </Link>
                  <button onClick={handleLogout} className="mobile-action-link mobile-logout-btn">
                    Logout
                  </button>
                </div>
              ) : (
                <div className="mobile-auth-links">
                  <Link to="/login" className="mobile-action-link" data-bs-toggle="collapse" data-bs-target="#mobileNav">
                    <FaUser className="mobile-action-icon" />
                    Sign In
                  </Link>
                  <Link to="/signup" className="mobile-action-link" data-bs-toggle="collapse" data-bs-target="#mobileNav">
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            <div className="mobile-cart-section">
              <Link to="/cartitems" className="mobile-cart-link" data-bs-toggle="collapse" data-bs-target="#mobileNav">
                <FaShoppingCart className="mobile-cart-icon" />
                <span className="mobile-cart-text">Shopping Bag ({cart?.length || 0})</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

Navbar.defaultProps = {
  brandName: "MyShop",
  darkModeTxt: "light",
};

export default Navbar;