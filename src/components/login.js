import React, { useState } from 'react';
import './login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Reset previous errors
    setEmailError('');
    setPasswordError('');

    // Validation
    let isValid = true;

    if (email.trim() === '') {
      setEmailError('Email is required');
      isValid = false;
    }

    if (password.trim() === '') {
      setPasswordError('Password is required');
      isValid = false;
    }

    // Submit if valid
    if (isValid) {
      try {
        const response = await axios.post('http://localhost:3001/api/login', {
          email,
          password
        });
        const { userId } = response.data;
        localStorage.setItem('userId', userId); // Save userId in localStorage
        navigate("/Todolist");
      } catch (error) {
        console.error('Error logging in:', error.response?.data?.error || error.message);
      }
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          {emailError && <span className="error">{emailError}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {passwordError && <span className="error">{passwordError}</span>}
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
