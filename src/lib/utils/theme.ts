// src/store/useThemeStore.ts
"use client";
import { create } from "zustand";

type ThemeState = {
  isDark: boolean;
  toggleTheme: () => void;
  initializeTheme: () => void;
};

export const useThemeStore = create<ThemeState>((set) => ({
  isDark: true,

  initializeTheme: () => {
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const dark = stored === "dark" || (!stored && prefersDark);

    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }

    set({ isDark: dark });
  },

  toggleTheme: () =>
    set((state) => {
      const newIsDark = !state.isDark;
      const root = document.documentElement;

      if (newIsDark) {
        root.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        root.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }

      return { isDark: newIsDark };
    }),
}));
