import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-screen bg-blue-700 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        
        {/* Logo / Branding */}
        <Link to="/" className="text-lg font-bold">Air Quality Monitor</Link>

        {/* Hamburger Menu (Mobile) */}
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {/* Hamburger Icon */}
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </button>

        {/* Navigation Links (Desktop) */}
        <div className="hidden md:flex space-x-6 justify-center items-center">
          <Link to="/" className="hover:text-gray-300">Dashboard</Link>
          <Link to="/info" className="hover:text-gray-300">Monitoring</Link>
          <Link to="/learnmore" className="hover:text-gray-300">Learn More</Link>
          <Link to="/signup" className="bg-white text-blue-700 px-4 py-2 rounded-md hover:bg-gray-100">Sign Up</Link>
        </div>
      </div>

      {/* Mobile Menu (Dropdown) */}
      {isOpen && (
        <div className="md:hidden bg-blue-800 text-white flex flex-col space-y-3 py-3 px-4">
          <Link to="/" className="hover:text-gray-300" onClick={() => setIsOpen(false)}>Dashboard</Link>
          <Link to="/info" className="hover:text-gray-300" onClick={() => setIsOpen(false)}>Monitoring</Link>
          <Link to="/learnmore" className="hover:text-gray-300" onClick={() => setIsOpen(false)}>Learn More</Link>
          <Link to="/signup" className="bg-white text-center text-blue-700 px-4 py-2 rounded-md hover:bg-gray-100" onClick={() => setIsOpen(false)}>Sign Up</Link>
        </div>
      )}
    </nav>
  );
}
