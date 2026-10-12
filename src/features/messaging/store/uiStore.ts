'use client';
import { create } from "zustand";
import { persist } from "zustand/middleware";



type AuthStore = {
  timestamp_object: {isvalid: boolean, timestamp: number} | null;
  settimestamp_object: (timestamp_object: {isvalid: boolean, timestamp: number} | null) => void;
  uitick: string;
  setuitick : (uitick: string) => void
  limit: number;
  status: string;
  setlimit: (limit: number) => void;
  mobile_switch: boolean; // not in use
  setMobileSwitch: (mobile_switch: boolean) => void; // not in use
  min: number;
  setmin: (min: number | ((prev: number) => number)) => void;
  max: number;
  setmax: (max: number | ((prev: number) => number)) => void;
  toggle: number;
  popup:boolean
  rehydrated: boolean;
  search: string;
  search_2: string;
  setsearch_2: (search_2: string) => void;
  setsearch: (search: string) => void;
  settoggle:(toggle:number) => void
  setpopup: (popup: boolean) => void
  setstatus: (status: string) => void
  setRehydrated: (v: boolean) => void;
  
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      timestamp_object: null,
      settimestamp_object: (timestamp_object) => set({ timestamp_object }),
      uitick:'',
      limit: 0,
      status: '',
      setuitick: (uitick) => set({uitick}),
      mobile_switch: true,// not in use
      setMobileSwitch: (mobile_switch) => set({ mobile_switch }),
      setlimit:(limit) => set({ limit }),// not in use
      min: 0,
      max: 0,
      setmin: (minOrFn) =>
        set((state) => ({
          min: typeof minOrFn === 'function' ? minOrFn(state.min) : minOrFn,
        })),
      setmax: (maxOrFn) =>
        set((state) => ({
          max: typeof maxOrFn === 'function' ? maxOrFn(state.max) : maxOrFn,
        })),
        toggle:1,
      search: '',
      search_2: '',
      popup:false,
        rehydrated: false,
      setsearch: (search) => set({ search }),
        setsearch_2: (search_2) => set({ search_2 }),
      settoggle: (toggle) => set({ toggle }),
      setstatus: (status) => set({ status }),
      setpopup: (popup) => set({ popup }),
      setRehydrated: (v) => set({ rehydrated: v }),
    }),
    {
      name: "auth-storage",
      onRehydrateStorage: () => (state) => {
        state?.setRehydrated?.(true);
      },
    }
  )
);
