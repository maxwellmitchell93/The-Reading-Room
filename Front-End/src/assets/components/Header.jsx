// src/assets/components/Header.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <h1 className="header-title">
        <Link to="/" className="header-link">
          The Reading Room
        </Link>
      </h1>
    </header>
  );
};

export default Header;
