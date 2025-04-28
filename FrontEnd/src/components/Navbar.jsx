import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/ContextProvider';

function Navbar() {
  const { user, logout } = useAuth(); // Assuming `useAuth` provides user data and logout functionality

  const handleLogout = () => {
    logout(); // Call the logout function to clear the user's session
  };

  return (
    <nav className="w-full bg-gray-900 px-6 py-4 lg:px-10 lg:py-6 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-3xl font-extrabold text-white hover:text-teal-400 transition duration-300">
          Product Inventory
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-10">
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="text-sm font-medium text-gray-300 hover:text-teal-400 transition duration-300"
              >
                Add Product
              </Link>
              <Link
                to="/dashboard"
                className="text-sm font-medium text-gray-300 hover:text-teal-400 transition duration-300"
              >
                View Products
              </Link>
              <h2 className="text-teal-400 font-semibold">{user.name}</h2>
              <button
                onClick={handleLogout}
                className="text-sm font-medium text-gray-300 hover:text-teal-400 transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-white bg-teal-600 px-5 py-2 rounded-md hover:bg-teal-500 transition duration-300 shadow"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-sm font-medium text-white bg-teal-600 px-5 py-2 rounded-md hover:bg-teal-500 transition duration-300 shadow"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;