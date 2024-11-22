import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; // For navigation
import { loginUser } from '../graphql/queries'; // Assuming you have a GraphQL query or API call for login

const Login = () => {
  const [username, setUsername] = useState(''); // State for username
  const [password, setPassword] = useState(''); // State for password
  const [error, setError] = useState(''); // State for error message
  const history = useHistory();

  // Handle username input change
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  // Handle password input change
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Handle form submit (login)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Username and password are required');
      return;
    }

    try {
      const user = await loginUser(username, password); // API call to authenticate the user
      if (user) {
        // Redirect to the home page after successful login
        history.push('/home');
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      setError('An error occurred during login');
    }
  };

  // Redirect to profile creation page
  const handleCreateProfileRedirect = () => {
    history.push('/create-profile');
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      
      {/* Error message */}
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Enter your username"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter your password"
            required
          />
        </div>

        <button type="submit" className="submit-button">Login</button>
      </form>

      <div className="redirect">
        <p>Don't have a profile? <span onClick={handleCreateProfileRedirect} className="create-profile-link">Create one now</span></p>
      </div>
    </div>
  );
};

export default Login;