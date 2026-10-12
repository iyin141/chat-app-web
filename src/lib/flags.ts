export type DataSource = "supabase" | "api";

export const MODULES = [
  "MESSAGING",
  "FRIENDS",
  "FRIEND_REQUESTS",
  "PROFILE",
  "STORIES",
] as const;

export type DataSourceModule = (typeof MODULES)[number];

function readFlag(name: DataSourceModule): DataSource {
  const value = process.env[`NEXT_PUBLIC_DATA_SOURCE_${name}`];
  return value === "api" ? "api" : "supabase";
}

export const dataSource: Record<DataSourceModule, DataSource> = {
  MESSAGING: readFlag("MESSAGING"),
  FRIENDS: readFlag("FRIENDS"),
  FRIEND_REQUESTS: readFlag("FRIEND_REQUESTS"),
  PROFILE: readFlag("PROFILE"),
  STORIES: readFlag("STORIES"),
};

export function isApi(module: DataSourceModule): boolean {
  return dataSource[module] === "api";
}
