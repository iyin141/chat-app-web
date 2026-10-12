import { create } from 'zustand';

interface LoadingStore {
  isLoading: boolean;
  isDark: boolean;
  setIsLoading: (isLoading: boolean) => void;
  setIsDark: (isDark: boolean) => void;
  toggleLoading: () => void;
  toggleTheme: () => void;
}

export const useLoadingStore = create<LoadingStore>((set) => ({
  isLoading: false,
  isDark: false,
  setIsLoading: (isLoading) => set({ isLoading }),
  setIsDark: (isDark) => set({ isDark }),
  toggleLoading: () => set((state) => ({ isLoading: !state.isLoading })),
  toggleTheme: () => set((state) => ({ isDark: !state.isDark })),
}));
