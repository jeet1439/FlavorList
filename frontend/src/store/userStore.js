// userStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      currentUser: null,
      setCurrentUser: (user) => set({ currentUser: user }),
      logoutUser: () => set({ currentUser: null }),
    }),
    {
      name: "user-storage", // key used in localStorage
    }
  )
);

export default useUserStore;
