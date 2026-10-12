// Canonical story shape aligned with the .NET StoryDto. The stories feature has
// no UI yet; these types anchor the future facade implementation.
export type Story = {
  id: string;
  authorId: string;
  authorUsername: string;
  authorDisplayName: string;
  authorAvatarUrl: string | null;
  mediaUrl: string;
  caption: string | null;
  createdAt: string;
  expiresAt: string;
};
