import { create } from 'zustand';
import { List, CreateListPayload, UpdateListPayload } from '@/types';
import { fetchData } from '@/utils/fetchData';

type AsyncStatus = 'idle' | 'loading' | 'success' | 'error';

interface ListsState {
  lists: List[];
  currentListId: string;
  currentList: List | null;

  status: AsyncStatus;
  isLoading: boolean;
  error: Error | null;

  setCurrentListId: (id: string) => void;

  createList: (newList: CreateListPayload) => Promise<void>;
  getAllLists: () => Promise<void>;
  getListById: (id: string) => Promise<void>;
  getListsByUserId: (userId: string) => Promise<void>;
  updateList: (id: string, updatedList: UpdateListPayload) => Promise<void>;
  deleteList: (id: string) => Promise<void>;

  clearError: () => void;
  reset: () => void;
}

const toError = (e: unknown): Error =>
  e instanceof Error
    ? e
    : new Error(typeof e === 'string' ? e : 'Unknown error');

export const useListsStore = create<ListsState>((set, get) => ({
  lists: [],
  currentListId: '',
  currentList: null,

  status: 'idle',
  isLoading: false,
  error: null,

  setCurrentListId: id => set({ currentListId: id }),

  createList: async newList => {
    set({ isLoading: true, status: 'loading', error: null });
    try {
      const data = await fetchData<{ list: List }>({
        url: `${import.meta.env.VITE_BACKEND_URL}/lists/create`,
        method: 'POST',
        body: newList,
      });

      set({ lists: [...get().lists, data.list], status: 'success' });
    } catch (e) {
      set({ status: 'error', error: toError(e) });
    } finally {
      set({ isLoading: false });
    }
  },

  getAllLists: async () => {
    set({ isLoading: true, status: 'loading', error: null });
    try {
      const data = await fetchData<{ lists: List[] }>({
        url: `${import.meta.env.VITE_BACKEND_URL}/lists/all`,
      });

      set({ lists: data.lists, status: 'success' });
    } catch (e) {
      set({ status: 'error', error: toError(e) });
    } finally {
      set({ isLoading: false });
    }
  },

  getListById: async id => {
    set({ isLoading: true, status: 'loading', error: null });
    try {
      const data = await fetchData<{ list: List }>({
        url: `${import.meta.env.VITE_BACKEND_URL}/lists/${id}`,
      });

      set({ currentList: data.list, status: 'success' });
    } catch (e) {
      set({ status: 'error', error: toError(e) });
    } finally {
      set({ isLoading: false });
    }
  },

  getListsByUserId: async userId => {
    set({ isLoading: true, status: 'loading', error: null, currentList: null });
    try {
      const data = await fetchData<{ lists: List[] }>({
        url: `${import.meta.env.VITE_BACKEND_URL}/lists/user/${userId}`,
      });

      set({ lists: data.lists, status: 'success' });
    } catch (e) {
      set({ status: 'error', error: toError(e) });
    } finally {
      set({ isLoading: false });
    }
  },

  updateList: async (id, updatedList) => {
    set({ isLoading: true, status: 'loading', error: null });
    try {
      const data = await fetchData<{ list: List }>({
        url: `${import.meta.env.VITE_BACKEND_URL}/lists/${id}`,
        method: 'PUT',
        body: updatedList,
      });

      set({
        lists: get().lists.map(list => (list._id === id ? data.list : list)),
        currentList:
          get().currentList?._id === id ? data.list : get().currentList,
        status: 'success',
      });
    } catch (e) {
      set({ status: 'error', error: toError(e) });
    } finally {
      set({ isLoading: false });
    }
  },

  deleteList: async id => {
    set({ isLoading: true, status: 'loading', error: null });
    try {
      await fetchData({
        url: `${import.meta.env.VITE_BACKEND_URL}/lists/${id}`,
        method: 'DELETE',
      });

      set({
        lists: get().lists.filter(list => list._id !== id),
        currentList: get().currentList?._id === id ? null : get().currentList,
        status: 'success',
      });
    } catch (e) {
      set({ status: 'error', error: toError(e) });
    } finally {
      set({ isLoading: false });
    }
  },

  clearError: () => set({ error: null }),

  reset: () =>
    set({
      lists: [],
      currentListId: '',
      currentList: null,
      status: 'idle',
      isLoading: false,
      error: null,
    }),
}));
