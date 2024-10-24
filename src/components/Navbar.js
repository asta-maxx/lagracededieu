import React from 'react';
import './Navbar.css'; // Make sure to create this CSS file

function Navbar({ onSignOut }) {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <ul className="navbar-links">
          <li>
            <button className="signout-button" onClick={onSignOut}>Sign Out</button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
