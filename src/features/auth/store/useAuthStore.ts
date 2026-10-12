import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { UserDto } from "@/features/auth/api/auth";

export interface AuthState {
  user: UserDto | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: UserDto) => void;
  clearUser: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,

      setUser: (user: UserDto) =>
        set({ user, isAuthenticated: true, isLoading: false }),

      clearUser: () =>
        set({ user: null, isAuthenticated: false, isLoading: false }),

      setLoading: (isLoading: boolean) =>
        set({ isLoading }),
    }),
    {
      name: "chatapp-auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setLoading(false);
      },
    }
  )
);
