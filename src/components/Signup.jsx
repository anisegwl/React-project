import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

const Signup = () => {
  const [credential, setCredential] = useState({
    name: '',
    email: '',
    password: '',
  });
   const [showPwd, setShowPwd] = useState(false);

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
     <div className="auth-page">
      <div className="auth-header">
        <h1>Create an account</h1>
        <p>Fill in the form to get started</p>
      </div>

      <div className="auth-card">
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <FaUser className="icon" />
            <input
              type="text"
              name="fullName"
              placeholder="Full name"
              value={credential.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <FaEnvelope className="icon" />
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={credential.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <FaLock className="icon" />
            <input
              type={showPwd ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={credential.password}
              onChange={handleChange}
              required
            />
            <span
              className="password-toggle"
              onClick={() => setShowPwd(p => !p)}
            >
              {showPwd ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button type="submit" className="auth-button">
            Sign Up
          </button>

          <p className="auth-terms">
            By signing up, you agree to our{' '}
            <Link to="#">Terms of Service</Link> and{' '}
            <Link to="#">Privacy Policy</Link>.
          </p>
        </form>
      </div>

      <div className="auth-footer-text">
        Already have an account?{' '}
        <Link to="/login">Log in</Link>
      </div>
    </div>
  );
};

export default Signup;
