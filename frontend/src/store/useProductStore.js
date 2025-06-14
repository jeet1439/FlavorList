import { create } from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';

// const BASE_URL = "http://localhost:8080";
const BASE_URL = import.meta.env.DEV ? "http://localhost:8080" : "";

export const useProductStore = create((set, get) => ({
    products: [],
    loading: false,
    error: null,
    
    formData: {
     name: "",
     price: "",
     image: "",
    },
     
    setFormData: (formData) => set({ formData }),
    resetForm : () => set({ formData: { name: "", price: "", image: ""}}),


    addProduct: async () => {
      set({ loading: true });
      try {
        const { formData } = get();
        await axios.post(`${BASE_URL}/api/products`, formData);
        await get().fetchProducts();
        get().resetForm();
        toast.success("Product added successfully");
        document.getElementById("add_product_modal").close();
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong"); // You had toast.success by mistake
      } finally {
        set({ loading: false });
      }
    },
    


    fetchProducts: async () => {
        set({ loading: true });
        try {
            const res = await axios.get(`${BASE_URL}/api/products`, {
              withCredentials: true, 
            });
            set({ products: res.data.data, error: null });
        } catch (err) {
            if (err.response?.status === 429) {
                set({ error: "Too many requests" });
            } else {
                set({ error: "Something went wrong" });
            }
        } finally {
            set({ loading: false });
        }
    },
    deleteProduct: async(id) =>{
     set({ loading: true});
     try {
        await axios.delete(`${BASE_URL}/api/products/${id}`);
        set(prev => ({ products: prev.products.filter(product => product.id !== id)}));
        toast.success("Product deleted successfully");
        
     } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
     }finally{
        set({loading: false});
     }
    }
}));
