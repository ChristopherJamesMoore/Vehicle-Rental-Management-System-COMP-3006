import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/">CAR RENTAL</a>
      </div>
      <ul className="navbar-links">
        <li><a href="/">Home</a></li>
        <li><a href="/cars">Cars</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
      <div className="navbar-auth">
        <a href="/login">Login</a>
        <a href="/signup" className="signup-btn">Sign Up</a>
      </div>
    </nav>
  );
};

export default Navbar;
