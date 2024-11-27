import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import Logo from '../Card_Flasher_Logo.svg'; // Import the logo
import authService from '../utils/Auth';

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    authService.logout(navigate);
  };

  const loggedIn = authService.loggedIn();

  return (
    <nav className="navbar">
      { loggedIn ? (
        <>
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
      </>
      ) : (
        <Link to="/login" className="navbar-link">
          Login
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
