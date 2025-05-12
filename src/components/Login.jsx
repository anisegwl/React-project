import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import image from '../assets/loginPerson.jpg';
import '../styles/login.css';
import { MdLogin } from 'react-icons/md';

const Login = () => {
  const [credential, setCredential] = useState({
    email: '',
    password: '',
  });

  console.log('Current credentials:', credential);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = credential;

    try {
      const resp = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await resp.json();
      console.log('Login response:', data);
      // TODO: handle success (e.g. save token, redirect)
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  const handleChange = (e) =>
    setCredential({
      ...credential,
      [e.target.name]: e.target.value,
    });

  return (
    <div className="loginpage container mt-5">
      <h3>
        Let’s go for a login <MdLogin />
      </h3>

      <div className="row">
        <div className="col-md-6 mb-4">
          <img
            src={image}
            alt="Login illustration"
            className="login-img img-fluid rounded"
          />
        </div>

        <div className="col-md-6">
          <center>
            <h4 className="mb-4 mt-4">WELCOME BACK!</h4>
          </center>
          <form onSubmit={handleSubmit} className="form-login">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="input-form form-control"
                placeholder="Enter your email"
                value={credential.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="input-form form-control"
                placeholder="Enter your password"
                value={credential.password}
                onChange={handleChange}
                required
              />
            </div>

            <button className="form-btn" type="submit">
              LOGIN
            </button>

            <p className="mt-3">
              Don’t have an account?{' '}
              <Link to="/register" className="link">
                Register Here!
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
