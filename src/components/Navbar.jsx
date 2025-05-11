import React from "react";
import { Link } from "react-router-dom";
import '../styles/Navbar.css';

const Navbar = (props) => {
  return (
    <nav className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          {props.brandName}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about-us">
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/services">
                Services
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/gallery">
                Gallery
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/testimonials">
                Testimonials
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact-us">
                Contact Us
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/users">
                Users
              </Link>
            </li>

            {/* Dropdown menu */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Learn More
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </li>

            {/* Login button */}
            <li className="nav-item">
              <button className="btn btn-success ms-2">
                <Link
                  to="/login"
                  className={`text-decoration-none ${props.mode === 'light' ? 'text-dark' : 'text-light'}`}
                >
                  Login
                </Link>
              </button>
            </li>

            {/* Signup button */}
            <li className="nav-item">
              <button className="btn btn-success ms-2">
                <Link
                  to="/register"
                  className={`text-decoration-none ${props.mode === 'light' ? 'text-dark' : 'text-light'}`}
                >
                  SignUp
                </Link>
              </button>
            </li>
          </ul>

          {/* Mode toggle button */}
          <div className="toggle-button">
            <button
              type="button"
              onClick={props.toggleMode}
              className="mode-btn btn-outline-success"
            >
              {props.mode === 'light' ? 'Dark Mode' : 'Light Mode'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
