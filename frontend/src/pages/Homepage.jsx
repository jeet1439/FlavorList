import { Link } from 'react-router-dom';
import ThreeBuilder from "../components/ThreeBuilder";
import FoodSlider from '../components/FoodSlider';

const Homepage = () => {
  return (
    <>
    <div className="relative h-screen w-full bg-slate-950 text-white flex items-center justify-center" style={{ backgroundImage: "url('https://t4.ftcdn.net/jpg/02/92/20/37/360_F_292203735_CSsyqyS6A4Z9Czd4Msf7qZEhoxjpzZl1.jpg')" }}>
      {/* Optional Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0" />

      {/* 3D component */}
      <div className="absolute inset-0 z-0">
        <ThreeBuilder />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 font-serif drop-shadow-lg">
          Welcome to Our Store
        </h1>
        <p className="text-lg md:text-2xl font-mono mb-8 text-gray-200">
          Explore our collection of amazing products
        </p>
        <Link to="/menu">
          <button className="bg-yellow-400 text-stone-900 font-bold px-8 py-3 rounded-md shadow-lg transition duration-300 hover:bg-yellow-500 hover:scale-105">
            View All Items
          </button>
        </Link>
      </div>
    </div>
    </>
  );
};

export default Homepage;
