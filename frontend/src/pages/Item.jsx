import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProductStore } from "../store/useProductStore.js";
import { Trash2, UtensilsCrossed } from "lucide-react";
import  useUserStore  from '../store/userStore.js';
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export default function Item() {

  const deleteProduct = useProductStore((state) => state.deleteProduct);
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const currentUser = useUserStore((state) => state.currentUser);
  
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);
        if (!response.ok) {
          throw new Error(`Error fetching product: ${response.statusText}`);
        }
        const data = await response.json();
        setItem(data.data);
        console.log(data.data);
        setTotalPrice(data.data.price); // Set initial total price
      } catch (error) {
        console.log(error.message);
        setError(error.message);
      }
    };

    fetchItem();
  }, [id]);
  
  const handleDelete = async (id) => {
    await deleteProduct(id);
    setTimeout(() => {
      navigate("/menu");
    }, 1000);
  };

  const handleQuantityChange = (e) => {
    const qty = parseInt(e.target.value);
    if (!isNaN(qty) && qty > 0) {
      setQuantity(qty);
      setTotalPrice(qty * item.price);
    }
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: currentUser.id,
          product_id: item.id,
          quantity,
          total_price: totalPrice,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to place order');
      }
  
      const data = await response.json();
      console.log(data.message); // "Order placed successfully"
      toast.success("Order placed successfully!");
      setShowOrderForm(false);
    } catch (err) {
      if(currentUser == null){
        toast.error("You need to login to place the order");
        navigate('/login');
      }
      else{
        console.error(err.message);
        toast.error("Error placing order");
      }
    }
  };
  


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
        <button className="mt-6 bg-yellow-500 text-white font-semibold text-lg py-2 px-6 rounded-sm flex hover:bg-yellow-600 transition w-36 gap-3" onClick={() => setShowOrderForm(true)}><UtensilsCrossed size={24}/> Order</button>


        {
          currentUser?.is_admin ? ( 
            <button className="mt-6" onClick={() => handleDelete(item.id)}><Trash2 size={24} strokeWidth={1.5} className="text-gray-400 hover:text-red-500" />
       </button>
           ) : 
           ('')
        }
      
        </div>
      </div>
      {showOrderForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <form
            onSubmit={handleOrderSubmit}
            className="bg-slate-950 p-6 rounded-md shadow-md w-full max-w-md"
          >
            <h3 className="text-xl font-bold mb-4 text-stone-50">Place Order</h3>
            
            <label className="block mb-2 text-stone-50 font-medium">Quantity:</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
              className="border border-gray-500 px-3 py-2 rounded w-full mb-4"
              required
            />

            <p className="text-lg font-medium text-gray-100 mb-4">
              Total Price: <span className="text-teal-600">₹{totalPrice}</span>
            </p>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowOrderForm(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Confirm Order
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
