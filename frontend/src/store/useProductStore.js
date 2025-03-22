import { create } from 'zustand';
import axios from 'axios';

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
    }
}));
