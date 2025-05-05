import React from 'react';
import { Link } from "react-router-dom";


const Signup = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 mb-4">
          <img src="https://via.placeholder.com/500x400" alt="Signup" className="img-fluid rounded" />
        </div>

        <div className="col-md-6">
          <center><h4 className="mb-4">SIGN UP</h4></center>
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" id="name" placeholder="Enter your full name" />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" placeholder="Enter your email" />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" placeholder="Enter your password" />
            </div>
            <button className="btn btn-primary w-100" type="submit">SIGN UP</button>
            <p className="mt-3">
              Have an Account? <Link to="/login" className="link">Login Here!</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
