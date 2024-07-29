import React, { useState } from 'react';
import './register.css'; // Import your CSS file
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

 
  const navigate=useNavigate();
 
  
const handleSubmit = async (event) => {



  event.preventDefault();

  // Reset previous errors
  setUsernameError('');
  setPasswordError('');
  setConfirmPasswordError('');

  // Validation
  let isValid = true;

  if (username.trim() === '') {
    setUsernameError('Username is required');
    isValid = false;
  }

  if (password.trim() === '') {
    setPasswordError('Password is required');
    isValid = false;
  } else if (password.length < 6) {
    setPasswordError('Password must be at least 6 characters long');
    isValid = false;
  }

  if (confirmPassword.trim() === '') {
    setConfirmPasswordError('Please confirm your password');
    isValid = false;
  } else if (password !== confirmPassword) {
    setConfirmPasswordError('Passwords do not match');
    isValid = false;
  }

  // If form is valid, submit to backend
  if (isValid) {
    try {
      const response = await axios.post('http://localhost:3000/api/register', {
        username,
        password
      });
      navigate("/login")
      console.log('Registration successful:', response.data.message);
    } catch (error) {
      console.error('Error registering user:', error.response?.data?.error || error.message);
    }
  }
};


  return (
    <div className="register-container">
      <h1>Register</h1>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          {usernameError && <span className="error">{usernameError}</span>}
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
        <div className="form-group">
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
          {confirmPasswordError && <span className="error">{confirmPasswordError}</span>}
        </div>
        <input type="submit" value="Register" onClick={handleSubmit}/>
    </div>
  );
}

export default Register;