import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../graphql/mutations';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/ProfileCreationPage.css';

const ProfileCreationPage = () => {
  const [formState, setFormState] = useState({ username: '', password: '' });
  const [createUser] = useMutation(CREATE_USER);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createUser({ variables: { ...formState } });
      navigate('/'); // Redirect to login page after successful profile creation
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="profile-creation-page">
      <h2>Create Profile</h2>
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
        <button type="submit">Create Profile</button>
      </form>
      <div className="back-to-login">
        <Link to="/">Back to Login</Link>
      </div>
    </div>
  );
};

export default ProfileCreationPage;
