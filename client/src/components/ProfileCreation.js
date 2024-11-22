import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../graphql/mutations';
import '../styles/ProfileCreation.css';

const ProfileCreation = ({ onCreate }) => {
  const [formState, setFormState] = useState({ username: '', password: '' });
  const [createUser] = useMutation(CREATE_USER);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createUser({ variables: { ...formState } });
      onCreate();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="profile-creation">
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
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default ProfileCreation;
