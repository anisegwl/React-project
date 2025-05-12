import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import image from '../assets/welcomeImage.jpg';

const Signup = () => {
  const [credential, setCredential] = useState({
    name: '',
    email: '',
    password: '',
  });

  console.log('this is credential name', credential);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credential;

    try {
      const response = await fetch('http://localhost:5000/api/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      console.log('Response:', data);
      console.log('Form submitted');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleChange = (e) => {
    setCredential({
      ...credential,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="signup-container container mt-5">
      <div className="row">
        <div className="col-md-6 mb-4">
          <img
            src={image}
            alt="Register"
            className="signup-img img-fluid rounded"
          />
        </div>

        <div className="col-md-6">
          <center>
            <h4 className="mb-4 mt-4">CREATE ACCOUNT</h4>
          </center>

          <form onSubmit={handleSubmit} className="form-login">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="input-form form-control"
                value={credential.name}
                onChange={handleChange}
                placeholder="Enter your full name"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="input-form form-control"
                value={credential.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="input-form form-control"
                value={credential.password}
                onChange={handleChange}
                placeholder="Create a password"
              />
            </div>

            <button className="form-btn" type="submit">
              REGISTER
            </button>

            <p className="mt-3">
              Already have an account?{' '}
              <Link to="/login" className="link">
                Login Here!
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
