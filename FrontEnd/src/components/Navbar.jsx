import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/ContextProvider';

function Navbar() {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-lg rounded-md px-4 py-3 lg:px-8 lg:py-4 mt-10">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-semibold text-slate-800 hover:text-blue-600">
          Product Inventory
        </Link>

        

        <div className="hidden lg:flex items-center space-x-6">
          {user ? (
            <>
              <Link
                to="/add-product"
                className="text-sm font-medium text-slate-600 hover:text-blue-600 transition duration-300"
              >
                Add Product
              </Link>
              <Link
                to="/view-products"
                className="text-sm font-medium text-slate-600 hover:text-blue-600 transition duration-300"
              >
                View Products
              </Link>
              <h2 className="text-blue-500 font-medium">{user.name}</h2>
              <button
                onClick={() => {
                }}
                className="text-sm font-medium text-slate-600 hover:text-blue-600 transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-slate-600 hover:text-blue-600 transition duration-300"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-sm font-medium text-slate-600 hover:text-blue-600 transition duration-300"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        <button
          className="lg:hidden text-gray-700 hover:text-blue-600 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="lg:hidden mt-4 flex flex-col items-center space-y-4">
          {user ? (
            <>
              <Link
                to="/add-product"
                className="text-sm font-medium text-slate-600 hover:text-blue-600 transition duration-300"
                onClick={() => setMenuOpen(false)}
              >
                Add Product
              </Link>
              <Link
                to="/view-products"
                className="text-sm font-medium text-slate-600 hover:text-blue-600 transition duration-300"
                onClick={() => setMenuOpen(false)}
              >
                View Products
              </Link>
              <h2 className="text-blue-500 font-medium">{user.name}</h2>
              <button
                onClick={() => {
                  setMenuOpen(false);
                }}
                className="text-sm font-medium text-slate-600 hover:text-blue-600 transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-slate-600 hover:text-blue-600 transition duration-300"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-sm font-medium text-slate-600 hover:text-blue-600 transition duration-300"
                onClick={() => setMenuOpen(false)}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;