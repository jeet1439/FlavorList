import { create } from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';

const BASE_URL = "http://localhost:8080";

export const useProductStore = create((set, get) => ({
    products: [],
    loading: false,
    error: null,

    fetchProducts: async () => {
        set({ loading: true });
        try {
            const res = await axios.get(`${BASE_URL}/api/products`);
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
