

import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../../Store/Context';
import Logo from '../../olx-logo.png';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // State to manage error messages
  const { firebase } = useContext(FirebaseContext);

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Basic email validation

  const handleLogin = (e) => {
    e.preventDefault();

    // Basic form validation
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    // Email validation
    if (!isValidEmail(email)) {
      setError('Invalid email format');
      return;
    }

    // Clear previous errors
    setError(null);

    // Continue with login
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo} alt="Logo" />
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="fname"
            name="email"
            placeholder="Enter your email"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="lname"
            name="password"
            placeholder="Enter your password"
          />
          <br />
          <br />
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>
      </div>
    </div>
  )
}

export default Login;

