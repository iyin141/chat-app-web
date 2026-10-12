'use client';
import { useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";
export * from "../lib/utils/time";

export type Message = {
  id?: number;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at?: string;
  seen: boolean | false;
  reply_to?: string | null;
  deleted?: string;
  Temp_id: string | null;
};

export function useBumpConvoParam() {
  const router = useRouter();
  const searchParams = useSearchParams();

  return () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tick", Date.now().toString());
    router.replace(`?${params.toString()}`);
  };
}

export function generateRandomHexColor(): string {
  let color = "#FFFFFF";
  while (color === "#FFFFFF") {
    color =
      "#" +
      Math.floor(Math.random() * 0xffffff)
        .toString(16)
        .padStart(6, "0")
        .toUpperCase();
  }
  return color;
}

export function mergeHalves(str1: string, str2: string) {
  const half1 = Math.ceil(str1.length / 2);
  const half2 = Math.floor(str2.length / 2);
  return str1.slice(0, half1) + str2.slice(half2);
}

export function useCache(convoId: string) {
  const { data, error, isLoading } = useSWR<any>(`/api/messages?convoId=${convoId}`);
  return { data, error, isLoading };
}

export function useBumptickParam() {
  const router = useRouter();
  const searchParams = useSearchParams();

  return () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("cachetick", Date.now().toString());
    router.replace(`?${params.toString()}`);
  };
}

export async function generateTempId(): Promise<string> {
  const now = new Date();
  return (
    now.getFullYear().toString() +
    String(now.getMonth() + 1).padStart(2, "0") +
    String(now.getDate()).padStart(2, "0") +
    String(now.getHours()).padStart(2, "0") +
    String(now.getMinutes()).padStart(2, "0") +
    String(now.getSeconds()).padStart(2, "0") +
    String(now.getMilliseconds()).padStart(3, "0")
  );
}
