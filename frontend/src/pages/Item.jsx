import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProductStore } from "../store/useProductStore.js";
import { Trash2, UtensilsCrossed } from "lucide-react";
import  useUserStore  from '../store/userStore.js';


export default function Item() {
  const deleteProduct = useProductStore((state) => state.deleteProduct);
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);
 

  const currentUser = useUserStore((state) => state.currentUser);


  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);
        if (!response.ok) {
          throw new Error(`Error fetching product: ${response.statusText}`);
        }
        const data = await response.json();
        setItem(data.data);
      } catch (error) {
        console.log(error.message);
        setError(error.message);
      }
    };

    fetchItem();
  }, [id]);

  if (error) return <div className="text-center text-red-500 pt-20 font-semibold min-h-screen bg-slate-950">{error}</div>;
  if (!item) return <div className="text-center text-yellow-500 pt-20 font-semibold  min-h-screen bg-slate-950">Loading...</div>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-black p-6 pt-20">
      <div className="flex flex-col md:flex-row items-center max-w-6xl h-full text-white">
        
        {/* Image Section (Fixed Square, Cover Mode) */}
        <div className="md:w-1/2 w-full flex justify-center">
          <div className="md:w-96 md:h-96 w-80 h-80 rounded-md overflow-hidden">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Details Section */}
        <div className="md:w-1/2 w-full flex flex-col mt-6 md:mt-0">
          <h2 className="text-4xl font-serif font-semibold text-yellow-500 mb-4">{item.name}</h2>
          <p className="text-gray-300 text-lg mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis vel tempora in numquam maiores quae sequi sit doloribus placeat culpa? Reiciendis a, praesentium porro sequi voluptatibus nostrum maxime dolor facerev Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          <p className="text-2xl font-semibold text-yellow-400">
            Price: <span className="text-teal-400">₹{item.price}</span>
          </p>

          {/* Order Button */}
        <button className="mt-6 bg-yellow-500 text-white font-semibold text-lg py-2 px-6 rounded-sm flex hover:bg-yellow-600 transition w-36 gap-3"><UtensilsCrossed size={24}/> Order</button>
        {
          currentUser?.is_admin ? ( 
            <button className="mt-6" onClick={() => deleteProduct(item.id)}><Trash2 size={24} strokeWidth={1.5} className="text-gray-400 hover:text-red-500" />
       </button>
           ) : 
           ('')
        }
      
        </div>
      </div>
    </div>
  );
}
