import React, { useEffect, useState } from "react";
import { useProductStore } from "../store/useProductStore";
import { Link } from "react-router-dom";
import { PackageIcon } from "lucide-react";
import AddProductModal from "../components/AddProductModal.jsx";

export default function Menu() {
  const { products, loading, error, fetchProducts, addProduct } = useProductStore();

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    price: "",
    available: true
  });

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
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct({
      id: Date.now(), // Temporary ID (Replace with backend-generated ID)
      ...formData,
      price: parseFloat(formData.price),
    });
    setShowForm(false);
    setFormData({ name: "", image: "", price: "", available: true });
  };

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
        <button
          onClick={() => document.getElementById("add_product_modal").showModal()}
          className="sm:px-4 sm:py-2 px-2 py-1 bg-yellow-500 text-white hover:bg-yellow-600"
        >
          + Add Item
        </button>
      </div>
      <AddProductModal/>

      {/* Add Product Form (Popup) */}
      {/* {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
          <div className="bg-slate-900 p-6 rounded-lg shadow-lg w-[450px] max-w-xl mx-3 text-stone-100">
            <h2 className="text-xl font-semibold mb-4 text-center">Add New Product</h2>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Product Name"
                required
                className="w-full px-3 py-2 rounded bg-slate-700 text-stone-50 focus:outline-none"
              />
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="Image URL"
                required
                className="w-full px-3 py-2 rounded bg-slate-700 text-stone-50  focus:outline-none"
              />
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price"
                required
                className="w-full px-3 py-2 rounded bg-slate-700 text-stone-50  focus:outline-none"
              />
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="available"
                  checked={formData.available}
                  onChange={handleChange}
                />
                <span>Available</span>
              </label>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-gray-400 px-4 py-2 text-white rounded"
                >
                  Cancel
                </button>
                <button
                  
                  type="submit"
                  className="bg-yellow-500 px-4 py-2 text-white rounded hover:bg-yellow-600"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )} */}

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
