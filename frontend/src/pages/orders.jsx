import React, { useEffect, useState } from 'react'
import  useUserStore  from '../store/userStore.js';
import { toast } from "react-hot-toast";
import { Link } from 'react-router-dom';
import { ShoppingCart } from "lucide-react";
import axios from "axios";

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
      {Array.isArray(orders) && orders.length > 0 ? (
          orders.map(order => (
            <div key={order.order_id}>{order.product_name}</div>
          ))
        ) : (
          <p>No orders found.</p>
        )}
    </div>
  )
}
