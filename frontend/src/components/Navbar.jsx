import { List, Utensils } from "lucide-react";
import  useUserStore  from '../store/userStore.js';
import axios from "axios";
import { toast } from "react-hot-toast";

export default function Navbar() {

  const currentUser = useUserStore((state) => state.currentUser);
  const logoutUser = useUserStore((state) => state.logoutUser);
  
  const handleLogout = async () => {
    try {
      await axios.post('/api/auth/logout');
      logoutUser();
      toast.success("Logged out successfully!");
      // Optional: redirect to login page or home
      // navigate('/login');
    } catch (error) {
      console.error(error);
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <nav className="absolute top-0 left-0 w-full bg-[rgba(0,0,0,0.8)] shadow-md z-50">
      <div className="container mx-auto px-6 md:px-14 py-3 flex justify-between items-center">
        
        {/* Logo / Brand Name */}
        <a href="/" className="text-2xl font-bold text-yellow-400">
          FlavorList
        </a>
        
        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-6 text-gray-300 font-medium">
          <li><a href="/" className="hover:text-yellow-400">Home</a></li>
          <li><a href="/menu" className="hover:text-yellow-400">Menu</a></li>
          <li><a href="/about" className="hover:text-yellow-400">About</a></li>
          <li><a href="/contact" className="hover:text-yellow-400" >Contact</a></li>
        </ul>


      {
        currentUser !== null ? (
          <ul className="hidden md:flex space-x-6 text-gray-300 font-medium">
          <li><a href="/orders" className="hover:underline"><Utensils size={24} color="white"/></a></li>
          <li><p className="hover:underline cursor-pointer" onClick={handleLogout} >Logout</p></li>
        </ul>
        ) : (
          <ul className="hidden md:flex space-x-6 text-gray-300 font-medium">
          <li><a href="/login" className="hover:underline">Login</a></li>
          <li><a href="/signup" className="hover:underline">Signup</a></li>
          <li><a href="/orders" className="hover:underline"><Utensils size={24} color="white"/></a></li>
        </ul>
        )
      }
        
      </div>
    </nav>
  );
}
