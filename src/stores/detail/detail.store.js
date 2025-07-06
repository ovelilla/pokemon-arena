// Vendors
import { create } from "zustand";

const useDetailStore = create((set) => ({
  pokemon: null,
  isOpen: false,
  open: (pokemon) => set({ isOpen: true, pokemon }),
  close: () => set({ isOpen: false, pokemon: null }),
}));

export { useDetailStore };
