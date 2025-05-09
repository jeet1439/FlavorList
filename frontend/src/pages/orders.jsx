import React from 'react'
import  useUserStore  from '../store/userStore.js';
import { toast } from "react-hot-toast";
import { Link } from 'react-router-dom';
import { ShoppingCart } from "lucide-react";

export default function orders() {
   const currentUser = useUserStore((state) => state.currentUser);
   
   if(currentUser == null) {
    return (
        <div className="flex items-center justify-center h-screen bg-stone-900">
        <Link
          to="/menu"
          className="text-yellow-500 hover:underline text-xl flex items-center gap-2"
        >
          <ShoppingCart className="w-5 h-5" />
          Order Now
        </Link>
      </div>
    );
  }
  return (
    <div>
      orders
    </div>
  )
}
