import React from "react";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        
        {/* Logo / Brand Name */}
        <a href="/" className="text-2xl font-bold text-yellow-400 ">
          FlavorList
        </a>

        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-6 text-gray-300 font-medium">
          <li><a href="/" className="hover:text-yellow-400">Home</a></li>
          <li><a href="/menu" className="hover:text-yellow-400">Menu</a></li>
          <li><a href="/about" className="hover:text-yellow-400">About</a></li>
          <li><a href="/contact" className="hover:text-yellow-400">Contact</a></li>
        </ul>

      </div>
    </nav>
  );
}
