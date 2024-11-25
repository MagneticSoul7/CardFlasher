import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import Logo from '../Card_Flasher_Logo.svg'; // Import the logo


const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear local storage or any authentication tokens
    localStorage.removeItem('token');
    // Redirect to login page
    navigate('/login');
  };

  return (
    <nav className="navbar">
      {/* Left-aligned app title */}
      <div className="navbar-title">
        Card Flasher
      </div>

      {/* Center-aligned logo */}
      <div className="navbar-logo">
        <Link to="/home">
          <img src={Logo} alt="Card Flasher Logo" className="logo" />
        </Link>
      </div>

      {/* Right-aligned navigation links */}
      <div className="navbar-links">
        <Link to="/home" className="navbar-link">
          Home
        </Link>
        <Link to="/about" className="navbar-link">
          About
        </Link>
        <Link to="/contact" className="navbar-link">
          Contact
        </Link>
        <button className="navbar-link logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
