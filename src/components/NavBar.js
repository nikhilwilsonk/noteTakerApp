import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white font-bold text-xl">
          Note Taking App
        </Link>
        <div>
          <Link to="/login" className="text-white hover:text-gray-300 mr-4">
            Login
          </Link>
          <Link to="/register" className="text-white hover:text-gray-300">
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;