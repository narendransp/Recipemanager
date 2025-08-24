import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import food from '../assets/food.png';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setLoggedIn(!!token);
  }, [location]);

  const logout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center z-50">
      {/* Left: Logo */}
      <div className="flex items-center gap-2">
        <img src={food} alt="Food logo" className="w-10 h-10" />
        <h1 className="text-xl font-bold">RECIPE BOOK</h1>
      </div>

      {/* Hamburger for mobile */}
      <div className="md:hidden flex flex-col gap-1 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <span className="w-6 h-0.5 bg-black"></span>
        <span className="w-6 h-0.5 bg-black"></span>
        <span className="w-6 h-0.5 bg-black"></span>
      </div>

      {/* Links */}
      <div className={`flex flex-col md:flex-row md:items-center gap-4 absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent px-6 py-4 md:p-0 transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 z-40 `}>
        <Link to="/home" className="hover:text-red-600" onClick={() => setIsOpen(false)}>Home</Link>

        {loggedIn ? (
          <>
            <Link to="/dashboard" className="hover:text-red-600" onClick={() => setIsOpen(false)}>Public</Link>
            <Link to="/my-recipes" className="hover:text-red-600" onClick={() => setIsOpen(false)}>My Recipes</Link>
            <button onClick={logout} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Logout</button>
          </>
        ) : (
          <Link to="/login" className="hover:text-green-600" onClick={() => setIsOpen(false)}>Login</Link>
        )}
      </div>
    </nav>
  );
}


