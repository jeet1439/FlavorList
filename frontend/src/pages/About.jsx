import React from 'react';

export default function About() {
  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 flex items-center justify-center px-6">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-yellow-400">About Us</h1>
        <p className="text-lg md:text-xl leading-relaxed text-gray-300">
          Welcome to <span className="text-yellow-400 font-semibold">FlavorList</span> – your go-to destination for delicious meals delivered fast and fresh. 
          We're passionate about bringing you the best flavors from your favorite local kitchens.
        </p>
        <p className="text-md md:text-lg mt-6 text-gray-400">
          Whether you're craving comfort food or something new, we've got you covered. Our mission is simple: 
          make food ordering easy, enjoyable, and satisfying. Thank you for choosing us to be part of your daily cravings!
        </p>
      </div>
    </div>
  );
}
