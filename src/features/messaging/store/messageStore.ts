// app/dashboard/components/Cache_store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Message = {
  id?: number;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at?: string;
  seen: boolean;
  reply_to?: string | null;
  deleted?: string;
  Temp_id: string; // timestamp string
};

type CacheState = {
  data: Record<string, Message[]>;
  hydrated: boolean;

  setHydrated: (v: boolean) => void;
  setMessages: (key: string, messages: Message[]) => void;
  addMessage: (key: string, msg: Message) => void;
  editMessage: (key: string, tempId: string, content: string) => void;
  deleteMessage: (key: string, tempId: string, type_delete: string) => void;
  clear: () => void;
  getMessages: (key: string) => Message[];
  getLatestMessage: (key: string) => Message | null;
  hasAnyMessages: () => boolean; // ✅ new
};

const parseTempId = (id: string): number => {
  const n = Number(id);
  return Number.isFinite(n) ? n : 0;
};

export const useCacheStore = create<CacheState>()(
  persist(
    (set, get) => ({
      data: {},
      hydrated: false,

      setHydrated: (v) => set({ hydrated: v }),

      setMessages: (key, messages) =>
        set((state) => {
          console.log("[Cache] setMessages called:", key, messages.length);
          const existing = state.data[key] ?? [];
          const map = new Map<string, Message>();

          for (const m of existing) if (m?.Temp_id) map.set(m.Temp_id, m);
          for (const m of messages) if (m?.Temp_id) map.set(m.Temp_id, m);

          const merged = Array.from(map.values()).sort(
            (a, b) => parseTempId(a.Temp_id) - parseTempId(b.Temp_id)
          );

          console.log("[Cache] setMessages -> merged length:", merged.length);
          return { data: { ...state.data, [key]: merged } };
        }),

      addMessage: (key, msg) =>
        set((state) => {
          const existing = state.data[key] ?? [];
          const map = new Map<string, Message>();
          for (const m of existing) if (m?.Temp_id) map.set(m.Temp_id, m);
          if (msg?.Temp_id) map.set(msg.Temp_id, msg);

          const updated = Array.from(map.values()).sort(
            (a, b) => parseTempId(a.Temp_id) - parseTempId(b.Temp_id)
          );
          return { data: { ...state.data, [key]: updated } };
        }),

      editMessage: (key, tempId, content) =>
        set((state) => {
          const messages = state.data[key] ?? [];
          const updated = messages.map((m) =>
            m.Temp_id === tempId ? { ...m, content } : m
          );
          console.log(`[Cache] editMessage: ${tempId} updated in ${key}`);
          return { data: { ...state.data, [key]: updated } };
        }),

      deleteMessage: (key, tempId, type_delete) =>
        set((state) => {
          const messages = state.data[key] ?? [];
          const updated = messages.map((m) =>
            m.Temp_id === tempId ? { ...m, deleted: type_delete } : m
          );
          console.log(`[Cache] deleteMessage: ${tempId} marked deleted in ${key}`);
          return { data: { ...state.data, [key]: updated } };
        }),

      clear: () => set({ data: {} }),

      getMessages: (key) => get().data[key] ?? [],

      getLatestMessage: (key) => {
        const msgs = get().data[key] ?? [];
        if (msgs.length === 0) return null;
        return msgs[msgs.length - 1];
      },

      // ✅ Check if there are *any* messages in the entire record
      hasAnyMessages: () => {
        const data = get().data;
        return Object.values(data).some(
          (messages) => Array.isArray(messages) && messages.length > 0
        );
      },
    }),
    {
      name: "app-cache",
      onRehydrateStorage: () => (state) => {
        if (state) state.setHydrated(true);
      },
    }
  )
);
