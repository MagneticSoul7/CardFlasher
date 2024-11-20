import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from './mutations'; // Assuming you have a mutation to log in the user

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    onCompleted: (data) => {
      if (data.login) {
        // Redirect to home page after successful login
        history.push('/home');
      } else {
        setErrorMessage('Invalid username or password');
      }
    },
    onError: () => {
      setErrorMessage('An error occurred. Please try again.');
    },
  });

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    // Clear any previous error message
    setErrorMessage('');

    // Call the login mutation
    loginUser({ variables: { username, password } });
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      
      <form onSubmit={handleLoginSubmit}>
        <div className="input-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </div>

        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </form>

      <div className="signup-link">
        <p>Don't have an account? <button onClick={() => history.push('/create-profile')}>Create one here</button></p>
      </div>
    </div>
  );
};

export default LoginPage;