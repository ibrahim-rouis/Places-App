import type { User } from 'firebase/auth';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type State = {
  user: User | null;
  loading: boolean;
};

type Actions = {
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
};

export const useAuthStore = create<State & Actions>()(
  immer((set) => ({
    user: null,
    loading: true,
    setUser: (user: User | null) =>
      set((state) => {
        state.user = user;
      }),
    setLoading: (loading: boolean) =>
      set((state) => {
        state.loading = loading;
      }),
  })),
);
