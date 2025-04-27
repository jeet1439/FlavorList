import React, { useEffect, useState } from "react";
import { useProductStore } from "../store/useProductStore";
import { Link } from "react-router-dom";
import { PackageIcon } from "lucide-react";
import AddProductModal from "../components/AddProductModal.jsx";
import  useUserStore  from '../store/userStore.js';

export default function Menu() {
  const { products, loading, error, fetchProducts, addProduct } = useProductStore();
  const currentUser = useUserStore((state) => state.currentUser);

  
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (loading)
    return (
      <p className="text-center pt-20 text-yellow-500 justify-center bg-slate-950 items-center min-h-screen">
        Loading...
      </p>
    );

  // Handle Input Change
  

  return (
    <div className="bg-slate-950 min-h-screen sm:p-14 px-2 justify-center pt-20">
      {error && (
        <div className="bg-red-600 text-stone-100 text-center mx-auto w-64 rounded-sm py-2">
          {error}
        </div>
      )}
      {
        products.length === 0 && !loading &&(
          <div className="flex flex-col justify-center items-center h-96 space-y-1">
            <div className="rounded-full p-6 text-gray-200">
              <PackageIcon className="size-12"/>
            </div>
            <div className="text-center space-y-2">
            <h3 className="text-2xl font-semibold  text-gray-200">No products found</h3>
            <p className="text-gray-500 max-w-sm">
              Get started by Listing yout first item
            </p>
            </div>
          </div>
        )
      }

      <div className="flex flex-row justify-between items-center h-16 mb-7 mt-4 ">
        {
          products.length > 0 && (
            <h1 className="sm:text-4xl text-xl text-yellow-400 font-serif">Available Items</h1>
          )
        }
        {/* Open Form Button */}
        {currentUser?.is_admin ? (
          <button
          onClick={() => document.getElementById("add_product_modal").showModal()}
          className="sm:px-4 sm:py-2 px-2 py-1 bg-yellow-500 text-white hover:bg-yellow-600"
        >
          + Add Item
        </button>
        ) : (
          ''
        )}
        
      </div>
      <AddProductModal/>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product.id} className="relative overflow-hidden">
            <Link to={`/product/${product.id}`}>
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover mb-4 rounded-md"
                />
                <div className="absolute bottom-0 left-0 bg-gradient-to-r from-black via-black/80 to-transparent px-3 py-2 text-white text-lg font-semibold w-full">
                  {product.name}
                </div>
                {/* <button className="absolute top-0 right-0 text-white px-3 py-1 rounded-bl-md">
                  &#10006;
                </button> update the delete button here*/}
              </div>
            </Link>
            <div className="flex justify-between items-center font-serif">
              <p className="text-lg text-gray-300">
                Price: <span className="text-teal-500">₹ {product.price}</span>
              </p>
              <button className="border border-yellow-500 hover:bg-yellow-500 text-white px-3 py-2">
                + Order Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
