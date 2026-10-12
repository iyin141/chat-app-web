// app/dashboard/components/Preload/Preload.tsx
"use server";

import { getPreloadData as getPreloadDataImpl } from "@/features/messaging/api/server";
import type { Message } from "@/features/messaging/api/types";

export async function getPreloadData(): Promise<
  Record<string, Message[]>
> {
  return getPreloadDataImpl();
}
