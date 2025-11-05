import React, { useState } from "react";
import "./login_signup.css";
import { FaUserCircle, FaUserPlus, FaGoogle, FaFacebookF } from "react-icons/fa";

const AuthForm = () => {
  const [isSignup, setIsSignup] = useState(false);

  // Login State
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // Signup State
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Toggle Between Login & Signup
  const toggleForm = () => setIsSignup(!isSignup);

  // Handlers
  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", loginData);
    // Later: send to backend using fetch/axios
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    console.log("Signup Data:", signupData);
    // Later: send to backend using fetch/axios
  };

  return (
    <div className="container">
      <div className={`form-container ${isSignup ? "show-signup" : ""}`}>
        
        {/* Login Form */}
        <div className="form-box login">
          <h2><FaUserCircle /> Login</h2>
          <form onSubmit={handleLoginSubmit}>
            <div className="input-group">
              <input 
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleLoginChange}
                required 
              />
              <label>Email</label>
            </div>

            <div className="input-group">
              <input 
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleLoginChange}
                required 
              />
              <label>Password</label>
            </div>

            <button type="submit">Login</button>
          </form>
          <p>
            Don't have an account? <button className="toggle-btn" onClick={toggleForm}>Sign Up</button>
          </p>
        </div>

        {/* Signup Form */}
        <div className="form-box signup">
          <h2><FaUserPlus /> Sign Up</h2>
          <form onSubmit={handleSignupSubmit}>
            <div className="input-group">
              <input 
                type="text"
                name="username"
                value={signupData.username}
                onChange={handleSignupChange}
                required 
              />
              <label>Username</label>
            </div>

            <div className="input-group">
              <input 
                type="email"
                name="email"
                value={signupData.email}
                onChange={handleSignupChange}
                required 
              />
              <label>Email</label>
            </div>

            <div className="input-group">
              <input 
                type="password"
                name="password"
                value={signupData.password}
                onChange={handleSignupChange}
                required 
              />
              <label>Password</label>
            </div>

            <div className="input-group">
              <input 
                type="password"
                name="confirmPassword"
                value={signupData.confirmPassword}
                onChange={handleSignupChange}
                required 
              />
              <label>Confirm Password</label>
            </div>

            <button type="submit">Sign Up</button>
          </form>

          <p>
            Already have an account? <button className="toggle-btn" onClick={toggleForm}>Login</button>
          </p>

          <div className="social-icons">
            <a href="#" className="google" title="Google">
              <FaGoogle />
            </a>
            <a href="#" className="facebook" title="Facebook">
              <FaFacebookF />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AuthForm;
