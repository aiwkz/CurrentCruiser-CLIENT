import { create } from 'zustand';
import { Car } from '@/types';
import { INITIAL_CURRENT_CAR_DATA } from '@/constants/constants';
import { fetchData } from '@/utils/utils';

type AsyncStatus = 'idle' | 'loading' | 'success' | 'error';

interface CarsState {
  cars: Car[];
  currentCar: Car;

  status: AsyncStatus;
  isLoading: boolean;
  error: Error | null;

  setCurrentCar: (car: Car) => void;

  getAllCars: () => Promise<void>;
  addCar: (newCar: Partial<Car>) => Promise<void>;
  updateCar: (id: string, updatedCar: Partial<Car>) => Promise<void>;
  deleteCar: (id: string) => Promise<void>;

  clearError: () => void;
  reset: () => void;
}

const toError = (e: unknown): Error =>
  e instanceof Error
    ? e
    : new Error(typeof e === 'string' ? e : 'Unknown error');

export const useCarsStore = create<CarsState>((set, get) => ({
  cars: [],
  currentCar: INITIAL_CURRENT_CAR_DATA,

  status: 'idle',
  isLoading: false,
  error: null,

  setCurrentCar: car => set({ currentCar: car }),

  getAllCars: async () => {
    set({ isLoading: true, status: 'loading', error: null });
    try {
      const data = await fetchData<{ cars: Car[] }>({
        url: `${import.meta.env.VITE_BACKEND_URL}/cars/all`,
      });

      set({ cars: data.cars, status: 'success' });
    } catch (e) {
      set({ status: 'error', error: toError(e) });
    } finally {
      set({ isLoading: false });
    }
  },

  addCar: async newCar => {
    set({ isLoading: true, status: 'loading', error: null });
    try {
      const data = await fetchData<{ car: Car }>({
        url: `${import.meta.env.VITE_BACKEND_URL}/cars/create`,
        method: 'POST',
        body: newCar,
      });

      set({ cars: [...get().cars, data.car], status: 'success' });
    } catch (e) {
      set({ status: 'error', error: toError(e) });
    } finally {
      set({ isLoading: false });
    }
  },

  updateCar: async (id, updatedCar) => {
    set({ isLoading: true, status: 'loading', error: null });
    try {
      const data = await fetchData<{ car: Car }>({
        url: `${import.meta.env.VITE_BACKEND_URL}/cars/${id}`,
        method: 'PUT',
        body: updatedCar,
      });

      set({
        cars: get().cars.map(car => (car._id === id ? data.car : car)),
        status: 'success',
      });

      // Optional: keep currentCar in sync if it’s the one you updated
      if (get().currentCar?._id === id) {
        set({ currentCar: data.car });
      }
    } catch (e) {
      set({ status: 'error', error: toError(e) });
    } finally {
      set({ isLoading: false });
    }
  },

  deleteCar: async id => {
    set({ isLoading: true, status: 'loading', error: null });
    try {
      await fetchData({
        url: `${import.meta.env.VITE_BACKEND_URL}/cars/${id}`,
        method: 'DELETE',
      });

      set({
        cars: get().cars.filter(car => car._id !== id),
        status: 'success',
      });

      // Optional: if you deleted the currentCar, reset it
      if (get().currentCar?._id === id) {
        set({ currentCar: INITIAL_CURRENT_CAR_DATA });
      }
    } catch (e) {
      set({ status: 'error', error: toError(e) });
    } finally {
      set({ isLoading: false });
    }
  },

  clearError: () => set({ error: null }),

  reset: () =>
    set({
      cars: [],
      currentCar: INITIAL_CURRENT_CAR_DATA,
      status: 'idle',
      isLoading: false,
      error: null,
    }),
}));
