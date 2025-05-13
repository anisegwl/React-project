import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/login.css';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const [credential, setCredential] = useState({
    email: '',
    password: '',
  });
   const [showPwd, setShowPwd] = useState(false);

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
 <div className="auth-page">
      <div className="auth-header">
        <h1>Welcome back</h1>
        <p>Sign in to access your account</p>
      </div>
      <div className="auth-card">
        <form className="auth-form" onSubmit={handleSubmit}>
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

          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                name="remember"
                checked={ credential.remember}
                onChange={handleChange}
              />
              Remember me
            </label>
            <Link to="#" className="forgot-link">
              Forgot password?
            </Link>
          </div>

          <button type="submit" className="auth-button">
            Log In
          </button>
        </form>
      </div>

      <div className="auth-footer-text">
        Don't have an account?{' '}
        <Link to="/signup">Sign up</Link>
      </div>
    </div>
  );
};
export default Login;

    
