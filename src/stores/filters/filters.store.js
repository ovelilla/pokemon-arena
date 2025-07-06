// Vendors
import { create } from "zustand";

const useFiltersStore = create((set) => ({
  selectedTypes: [],
  isOpen: false,
  toggleType: (type) =>
    set((state) => ({
      selectedTypes: state.selectedTypes.includes(type)
        ? state.selectedTypes.filter((t) => t !== type)
        : [...state.selectedTypes, type],
    })),

  resetTypes: () => set({ selectedTypes: [] }),
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export { useFiltersStore };
