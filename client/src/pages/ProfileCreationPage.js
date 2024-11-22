import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; // to handle redirection after form submission
import { useMutation } from '@apollo/client'; // Assuming you use GraphQL for mutations
import { CREATE_PROFILE_MUTATION } from '../mutations'; // Import the mutation query to create a profile

const ProfileCreationPage = () => {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [createProfile] = useMutation(CREATE_PROFILE_MUTATION);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Both username and password are required');
      return;
    }
    
    try {
      // Call the mutation to create the profile
      await createProfile({
        variables: { username, password },
      });
      // Redirect to login page after profile is created
      history.push('/login');
    } catch (err) {
      setError('Failed to create profile. Please try again.');
    }
  };

  return (
    <div className="profile-creation-container">
      <h2>Create Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit">Create Profile</button>
      </form>
      
      <p>
        Already have an account? <a href="/login">Login here</a>
      </p>
    </div>
  );
};

export default ProfileCreationPage;