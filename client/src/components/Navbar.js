import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom'; // For navigation

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track if user is logged in
  const [username, setUsername] = useState(''); // Store the logged-in user's username
  const history = useHistory();

  // Example check for user authentication (this could be from localStorage, state, or context)
  useEffect(() => {
    // Replace with actual authentication logic (e.g., checking if user is logged in)
    const user = localStorage.getItem('user'); // Assuming the user data is stored in localStorage
    if (user) {
      setIsAuthenticated(true);
      setUsername(JSON.parse(user).username); // Assuming user data includes a 'username'
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('user'); // Remove user data from localStorage
    setIsAuthenticated(false); // Update state
    setUsername(''); // Clear the username
    history.push('/login'); // Redirect to login page
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">Logo</Link> {/* Change "Logo" to your actual site logo */}
      </div>

      <div className="nav-links">
        <Link to="/home">Home</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/about">About</Link>

        {/* If the user is logged in, show username and logout */}
        {isAuthenticated ? (
          <div className="user-info">
            <span>{username}</span>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          // If the user is not logged in, show login link
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;