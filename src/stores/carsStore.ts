import { create } from 'zustand';
import { Car } from '@/types';
import { INITIAL_CURRENT_CAR_DATA } from '@/constants/constants';
import { fetchData } from '@/utils/utils';

interface CarsState {
  cars: Car[];
  currentCar: Car;
  error: unknown;
  setCars: (cars: Car[]) => void;
  setCurrentCar: (car: Car) => void;
  getAllCars: () => Promise<void>;
  addCar: (newCar: Partial<Car>) => Promise<void>;
  updateCar: (id: string, updatedCar: Partial<Car>) => Promise<void>;
  deleteCar: (id: string) => Promise<void>;
  clearError: () => void;
}

export const useCarsStore = create<CarsState>((set, get) => ({
  cars: [],
  currentCar: INITIAL_CURRENT_CAR_DATA,
  error: null,

  setCars: cars => set({ cars }),
  setCurrentCar: car => set({ currentCar: car }),

  getAllCars: async () => {
    try {
      await fetchData<{ cars: Car[] }>({
        url: `${import.meta.env.VITE_BACKEND_URL}/cars/all`,
        callback: response => set({ cars: response.cars }),
      });
    } catch (error) {
      set({ error });
    }
  },

  addCar: async newCar => {
    try {
      await fetchData<{ car: Car }>({
        url: `${import.meta.env.VITE_BACKEND_URL}/cars/create`,
        method: 'POST',
        body: newCar,
        callback: response => set({ cars: [...get().cars, response.car] }),
      });
    } catch (error) {
      set({ error });
    }
  },

  updateCar: async (id, updatedCar) => {
    try {
      await fetchData<{ car: Car }>({
        url: `${import.meta.env.VITE_BACKEND_URL}/cars/${id}`,
        method: 'PUT',
        body: updatedCar,
        callback: response => {
          set({
            cars: get().cars.map(car => (car._id === id ? response.car : car)),
          });
        },
      });
    } catch (error) {
      set({ error });
    }
  },

  deleteCar: async id => {
    try {
      await fetchData({
        url: `${import.meta.env.VITE_BACKEND_URL}/cars/${id}`,
        method: 'DELETE',
      });
      set({
        cars: get().cars.filter(car => car._id !== id),
      });
    } catch (error) {
      set({ error });
    }
  },

  clearError: () => set({ error: null }),
}));
