import React, { useEffect, useState } from 'react'
import  useUserStore  from '../store/userStore.js';
import { toast } from "react-hot-toast";
import { Link } from 'react-router-dom';
import { ShoppingCart } from "lucide-react";
import axios from "axios";
import { X } from 'lucide-react';

export default function orders() {
   const [orders, setOrders] = useState([]);

   const currentUser = useUserStore((state) => state.currentUser);
    
   useEffect(() => {
     const fetchOrders = async () => {
    if (!currentUser?.id) return;

    const userId = currentUser.id;

    try {
      const res = await axios.get(`/api/orders/${userId}`);
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching orders", error);
    }
  };

  fetchOrders();
}, [currentUser]); 


   if(currentUser == null) {
    return (
        <div className="flex items-center justify-center h-screen ">
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
    <div className=' min-h-screen w-full bg-slate-950 '>
  <div className="max-w-4xl mx-auto p-4 mt-10 min-h-screen bg-slate-950">
    <h2 className="text-2xl font-semibold mb-4">Hey {currentUser.name}, you ordered </h2>
    {Array.isArray(orders) && orders.length > 0 ? (
      <div className="space-y-4">
        {orders.map(order => (
          <div
            key={order.order_id}
            className="flex items-center gap-4 bg-gradient-to-r from-black via-black/80 to-transparent shadow-md rounded-xl p-4 hover:shadow-lg transition"
          >
            <img
              src={order.product_image}
              alt={order.product_name}
              className="w-20 h-20 object-cover rounded-md"
            />
            <div className="flex-1 mx-9">
              <h3 className="text-lg font-medium">{order.product_name}</h3>
              <p className="text-sm text-gray-200">{order.quantity} @ ₹{order.product_price}</p>
            </div>
            <div className="mr-3">
              <p className="text-md text-gray-200 font-semibold">Total: ₹{order.total_price}</p>
            </div>
            <div className='text-right'>
              <button className='flex items-center justify-center hover:text-red-700'>
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      <hr className='text-gray-500'/>
      </div>
    ) : (
      <p className="text-gray-500 text-center">No orders found.</p>
    )}
  </div>
  </div>
);

}
