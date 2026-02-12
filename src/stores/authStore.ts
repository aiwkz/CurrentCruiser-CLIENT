import { create } from 'zustand';
import { User } from '@/types';

import { resetAllStores } from '@/utils/stores/resetAllStores';

const TOKEN_KEY = 'token';
const USER_KEY = 'user';

interface AuthState {
  token: string | null;
  user: User | null;

  isAuthenticated: boolean;

  login: (token: string, user: User) => void;
  logout: () => void;

  updateUser: (user: User) => void;

  hydrate: () => void;
}

const readAuthFromStorage = (): { token: string | null; user: User | null } => {
  const token = localStorage.getItem(TOKEN_KEY);

  const rawUser = localStorage.getItem(USER_KEY);
  let user: User | null = null;

  if (rawUser) {
    try {
      user = JSON.parse(rawUser) as User;
    } catch {
      user = null;
    }
  }

  // if one is missing/corrupted, treat auth as invalid
  if (!token || token === 'undefined' || token === 'null')
    return { token: null, user: null };

  return { token, user };
};

export const useAuthStore = create<AuthState>((set, get) => {
  const initial = readAuthFromStorage();

  return {
    token: initial.token,
    user: initial.user,
    isAuthenticated: Boolean(initial.token && initial.user),

    hydrate: () => {
      const next = readAuthFromStorage();
      set({
        token: next.token,
        user: next.user,
        isAuthenticated: Boolean(next.token && next.user),
      });
    },

    login: (token, user) => {
      if (typeof token !== 'string') return;

      const t = token.trim();
      if (!t || t.split('.').length !== 3) return;

      localStorage.setItem(TOKEN_KEY, t);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      set({ token: t, user, isAuthenticated: true });
    },

    logout: () => {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);

      resetAllStores();

      set({ token: null, user: null, isAuthenticated: false });
    },

    updateUser: user => {
      const token = get().token;
      if (token) localStorage.setItem(USER_KEY, JSON.stringify(user));
      set({ user, isAuthenticated: Boolean(token && user) });
    },
  };
});
