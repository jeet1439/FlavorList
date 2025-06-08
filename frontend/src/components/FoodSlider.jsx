import React, { useEffect } from "react";
import { useProductStore } from "../store/useProductStore";
import { Link } from "react-router-dom";

export default function FoodSlider() {
  const { products, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (!products || products.length === 0) return null;

  return (
    <div className="w-full overflow-x-auto py-8 px-4">
      <h2 className="text-3xl font-bold text-yellow-400 mb-4">Popular Items</h2>
      <div className="flex space-x-6 overflow-x-scroll scrollbar-hide">
        {products.slice(0, 10).map((product) => (
          <Link
            to="/menu"
            key={product.id}
            className="min-w-[200px] bg-white rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition duration-300"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4 text-stone-900">
              <h3 className="font-bold text-lg">{product.name}</h3>
              <p className="text-sm text-gray-600">₹{product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
