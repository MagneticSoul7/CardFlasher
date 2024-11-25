import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../graphql/mutations';
import '../styles/LoginPage.css';

const Login = ({ onLogin }) => {
  const [formState, setFormState] = useState({ username: '', password: '' });
  const [login] = useMutation(LOGIN_USER);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({ variables: { ...formState } });
      console.log('Login successful, token received:', data.login.token); // Debugging log
      localStorage.setItem('token', data.login.token); // Store the token in localStorage
      onLogin(); // Trigger callback after successful login
    } catch (err) {
      console.error('Login error:', err.message);
      alert('Login failed. Please check your credentials and try again.'); // User-friendly error message
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={formState.username}
          onChange={(e) => setFormState({ ...formState, username: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={formState.password}
          onChange={(e) => setFormState({ ...formState, password: e.target.value })}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
