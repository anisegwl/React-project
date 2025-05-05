import React from 'react';
import { Link } from "react-router-dom";
import image from "../assets/loginPerson.jpg"
import '../styles/login.css';

const Login = () => {
  return (
     <div className="container mt-5">
          <div className="row">
            <div className="col-md-6 mb-4">
              <img src={image} alt="Signup" className="login-img img-fluid rounded" />
            </div>
    
            <div className="col-md-6">
              <center><h4 className="mb-4 mt-4">WELCOME BACK !</h4></center>
              <form className='form-login '>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" className="input-form form-control" id="email" placeholder="Enter your email" />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" className="input-form form-control" id="password" placeholder="Enter your password" />
                </div>
                <button className="form-btn" type="submit">LOGIN</button>
                
                <p className="mt-3">
                  Don't Have an Account? <Link to="/register" className="link">Register Here!</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
  );
}

export default Login;
