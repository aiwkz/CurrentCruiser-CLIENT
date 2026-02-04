import { create } from 'zustand';
import { List } from '@/types';
import { fetchData } from '@/utils/utils';

interface ListsState {
  lists: List[];
  currentListId: string;
  error: unknown;
  setLists: (lists: List[]) => void;
  setCurrentListId: (id: string) => void;
  createList: (newList: Partial<List>) => Promise<void>;
  getAllLists: () => Promise<void>;
  getListById: (id: string) => Promise<void>;
  getListsByUserId: (userId: string) => Promise<void>;
  updateList: (id: string, updatedList: Partial<List>) => Promise<void>;
  deleteList: (id: string) => Promise<void>;
  clearError: () => void;
}

export const useListsStore = create<ListsState>((set, get) => ({
  lists: [],
  currentListId: '',
  error: null,

  setLists: lists => set({ lists }),
  setCurrentListId: id => set({ currentListId: id }),

  createList: async newList => {
    try {
      await fetchData<{ list: List }>({
        url: `${import.meta.env.VITE_BACKEND_URL}/lists/create`,
        method: 'POST',
        body: newList,
        callback: response => set({ lists: [...get().lists, response.list] }),
      });
    } catch (error) {
      set({ error });
    }
  },

  getAllLists: async () => {
    try {
      await fetchData<{ lists: List[] }>({
        url: `${import.meta.env.VITE_BACKEND_URL}/lists/all`,
        callback: response => set({ lists: response.lists }),
      });
    } catch (error) {
      set({ error });
    }
  },

  getListById: async id => {
    try {
      await fetchData<{ list: List }>({
        url: `${import.meta.env.VITE_BACKEND_URL}/lists/${id}`,
        callback: response => set({ lists: [response.list] }),
      });
    } catch (error) {
      set({ error });
    }
  },

  getListsByUserId: async userId => {
    try {
      await fetchData<{ lists: List[] }>({
        url: `${import.meta.env.VITE_BACKEND_URL}/lists/user/${userId}`,
        callback: response => set({ lists: response.lists }),
      });
    } catch (error) {
      set({ error });
    }
  },

  updateList: async (id, updatedList) => {
    try {
      await fetchData<{ list: List }>({
        url: `${import.meta.env.VITE_BACKEND_URL}/lists/${id}`,
        method: 'PUT',
        body: updatedList,
        callback: response => {
          set({
            lists: get().lists.map(list =>
              list._id === id ? response.list : list
            ),
          });
        },
      });
    } catch (error) {
      set({ error });
    }
  },

  deleteList: async id => {
    try {
      await fetchData({
        url: `${import.meta.env.VITE_BACKEND_URL}/lists/${id}`,
        method: 'DELETE',
      });
      set({
        lists: get().lists.filter(list => list._id !== id),
      });
    } catch (error) {
      set({ error });
    }
  },

  clearError: () => set({ error: null }),
}));
