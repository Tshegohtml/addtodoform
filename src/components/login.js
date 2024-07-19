import React, { useState } from 'react';
import './login.css'; // import your CSS file

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Reset previous errors
    setUsernameError('');
    setPasswordError('');

    // Validation
    let isValid = true;

    if (username.trim() === '') {
      setUsernameError('Username is required');
      isValid = false;
    }

    if (password.trim() === '') {
      setPasswordError('Password is required');
      isValid = false;
    }

    // Submit if valid
    if (isValid) {
      // Login logic here
      console.log('Logging in...');

      // You can add further logic to submit the form or call an API
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form className="login-form" onSubmit={handleSubmit}>
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
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}

export default Login;