

import React, { useState, useContext } from 'react';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../Store/Context';
import { useNavigate, Link } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // State to manage error messages
  const { firebase } = useContext(FirebaseContext);

  const isValidPhone = (phone) => /^\d{10}$/.test(phone); // Check if phone has 10 digits

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic form validation
    if (!username || !email || !phone || !password) {
      setError('All fields are required');
      return;
    }

    // Phone number validation
    if (!isValidPhone(phone)) {
      setError('Phone number should have exactly 10 digits');
      return;
    }

    // Additional validation (you can customize this based on your requirements)
    if (password.length < 6) {
      setError('Password should be at least 6 characters');
      return;
    }

    // Clear previous errors
    setError(null);

    // Continue with form submission
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        result.user
          .updateProfile({ displayName: username })
          .then(() => {
            firebase
              .firestore()
              .collection('users')
              .add({
                id: result.user.uid,
                username: username,
                phone: phone,
              })
              .then(() => {
                navigate('/login');
              });
          });
      })
      .catch((error) => {
        console.error('Error creating user:', error.message);
        setError(error.message); // Set error message for display
      });
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="Logo" />
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            id="fname"
            name="name"
            placeholder="Enter your username"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            id="fname"
            name="email"
            placeholder="Enter your email"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            id="lname"
            name="phone"
            placeholder="Enter your phone number"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            id="lname"
            name="password"
            placeholder="Enter your password"
          />
          <br />
          <br />
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit">Signup</button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}