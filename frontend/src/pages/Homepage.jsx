import React from 'react';
import { Link } from 'react-router-dom';

export default function Homepage() {
  const backgroundImage = 'https://images.unsplash.com/photo-1665580756200-329d2e060b1f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  return (
    <div
      className="h-screen w-full bg-cover bg-center flex flex-col items-center justify-center text-white"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <h1 className="text-6xl font-extrabold mb-4 text-white font-serif">Welcome to Our Store</h1>
      <p className="text-xl text-white mb-6 font-mono">Explore our collection of amazing products</p>
      <Link to="/allItems">
        <button className="bg-yellow-400 text-stone-50 font-semibold px-6 py-3 rounded-md shadow-md hover:bg-yellow-500">
          View All Items
        </button>
      </Link>
    </div>
  );
}
