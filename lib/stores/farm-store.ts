import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Farm } from '@/lib/schema/farms';

interface FarmState {
  // The currently selected farm
  selectedFarm: Farm | null;
  // The ID of the currently selected farm
  selectedFarmId: number | null;
  // Function to set the selected farm
  setSelectedFarm: (farm: Farm | null) => void;
  // Function to set the selected farm by ID
  setSelectedFarmId: (id: number | null) => void;
  // Function to clear the selected farm
  clearSelectedFarm: () => void;
}

export const useFarmStore = create<FarmState>()(
  persist(
    (set) => ({
      selectedFarm: null,
      selectedFarmId: null,
      
      setSelectedFarm: (farm) => set({ 
        selectedFarm: farm, 
        selectedFarmId: farm?.id || null 
      }),
      
      setSelectedFarmId: (id) => set({ 
        selectedFarmId: id 
      }),
      
      clearSelectedFarm: () => set({ 
        selectedFarm: null, 
        selectedFarmId: null 
      }),
    }),
    {
      name: 'farm-storage', // name for the storage key
      // Only persist these fields
      partialize: (state) => ({ 
        selectedFarmId: state.selectedFarmId 
      }),
    }
  )
);