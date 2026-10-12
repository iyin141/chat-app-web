import { apiFetch } from "@/lib/api/client";
import type { ProfilesClientApi } from "../types";

export const profilesClientApi: ProfilesClientApi = {
  async createProfile(_uid, name) {
    await apiFetch("/me/profile", {
      method: "POST",
      body: JSON.stringify({ username: name, displayName: name, avatarUrl: null }),
    });
    return { success: true };
  },
};
