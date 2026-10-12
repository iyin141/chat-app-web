export interface ProfilesClientApi {
  createProfile(uid: string, name: string): Promise<{ success: boolean }>;
}
