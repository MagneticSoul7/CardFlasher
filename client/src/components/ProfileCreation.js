import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const ProfileCreation = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation to check if fields are filled
    if (!username || !password) {
      setError('Both fields are required!');
      return;
    }

    // You can add more validation logic here (e.g., password length, username format, etc.)

    // Simulating saving the profile data (can be replaced with actual API call)
    const user = { username, password };
    localStorage.setItem('user', JSON.stringify(user)); // Save the user to localStorage (you can use a backend API here)

    // Redirect the user back to the login page
    history.push('/login');
  };

  return (
    <div className="profile-creation">
      <h2>Create New Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
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

export default ProfileCreation;