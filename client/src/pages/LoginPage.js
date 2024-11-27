import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../graphql/mutations';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../utils/Auth';
import '../styles/LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({ username: '', password: '' });
  const [login] = useMutation(LOGIN_USER);
  // const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({ variables: { ...formState } });
      authService.login(data.login.token, navigate);
      // navigate('/home');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="login-input"
          type="text"
          placeholder="Username"
          value={formState.username}
          onChange={(e) => setFormState({ ...formState, username: e.target.value })}
          required
        />
        <input
          className="login-input"
          type="password"
          placeholder="Password"
          value={formState.password}
          onChange={(e) => setFormState({ ...formState, password: e.target.value })}
          required
        />
        <button className="login-button" type="submit">Login</button>
      </form>
      <div className="create-profile-link">
        <Link to="/CreateProfile">Create New Profile</Link>
      </div>
    </div>
  );
};

export default LoginPage;
