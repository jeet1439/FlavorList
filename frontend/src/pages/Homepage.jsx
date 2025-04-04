import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/background.jpg';

export default function Homepage() {
  return (
    <div
      className="h-screen w-full bg-cover bg-center flex flex-col items-center justify-center text-white"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <h1 className="text-6xl font-extrabold mb-4 text-white font-serif">Welcome to Our Store</h1>
      <p className="text-xl text-white mb-6 font-mono">Explore our collection of amazing products</p>
      <Link to="/menu">
        <button className="bg-yellow-400 text-stone-50 font-semibold px-6 py-3 rounded-md shadow-md hover:bg-yellow-500">
          View All Items
        </button>
      </Link>
      <p className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-stone-800 text-sm">
     © {new Date().getFullYear()} FoodieHub. All rights reserved. Made by Jeet banik
    </p>
    </div>
  );
}
