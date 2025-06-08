import { useState } from "react";
import { List, Utensils, X } from "lucide-react";
import useUserStore from "../store/userStore.js";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const currentUser = useUserStore((state) => state.currentUser);
  const logoutUser = useUserStore((state) => state.logoutUser);

  const handleLogout = async () => {
    try {
      await axios.post('/api/auth/logout');
      logoutUser();
      toast.success("Logged out successfully!");
      // Optional redirect: navigate('/login');
    } catch (error) {
      console.error(error);
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <nav className="absolute top-0 left-0 w-full bg-[rgba(0,0,0,0.8)] shadow-md z-50">
      <div className="container mx-auto px-6 md:px-14 py-3 flex justify-between items-center">
        
        {/* Logo */}
        <a href="/" className="text-2xl font-bold text-yellow-400">
          FlavorList
        </a>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-6 text-gray-300 font-medium">
          <li><a href="/" className="hover:text-yellow-400">Home</a></li>
          <li><a href="/menu" className="hover:text-yellow-400">Menu</a></li>
          <li><a href="/about" className="hover:text-yellow-400">About</a></li>
          <li><a href="/contact" className="hover:text-yellow-400">Contact</a></li>
        </ul>

        {/* Auth + Orders (Desktop) */}
        <ul className="hidden md:flex space-x-6 text-gray-300 font-medium">
          {currentUser ? (
            <>
              <li><a href="/orders" className="hover:underline"><Utensils size={24} color="white" /></a></li>
              <li><p className="hover:underline cursor-pointer" onClick={handleLogout}>Logout</p></li>
            </>
          ) : (
            <>
              <li><a href="/login" className="hover:underline">Login</a></li>
              <li><a href="/signup" className="hover:underline">Signup</a></li>
              <li><a href="/orders" className="hover:underline"><Utensils size={24} color="white" /></a></li>
            </>
          )}
        </ul>

        {/* Hamburger Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <List size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[rgba(0,0,0,0.95)] px-6 pb-4 space-y-4 text-gray-300 font-medium">
          <a href="/" className="block hover:text-yellow-400">Home</a>
          <a href="/menu" className="block hover:text-yellow-400">Menu</a>
          <a href="/about" className="block hover:text-yellow-400">About</a>
          <a href="/contact" className="block hover:text-yellow-400">Contact</a>

          {currentUser ? (
            <>
              <a href="/orders" className="block hover:text-yellow-400">My Orders</a>
              <p onClick={handleLogout} className="block cursor-pointer hover:text-yellow-400">Logout</p>
            </>
          ) : (
            <>
              <a href="/login" className="block hover:text-yellow-400">Login</a>
              <a href="/signup" className="block hover:text-yellow-400">Signup</a>
              <a href="/orders" className="block hover:text-yellow-400">My Orders</a>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
