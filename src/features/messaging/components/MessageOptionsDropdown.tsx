import { Reply, Trash2, MoreVertical } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { manipulateMessage } from "@/features/messaging/api/client";
import { useCacheStore } from "@/features/messaging/store/messageStore";


interface DropdownMenuProps {
  id: string;
  content: string;
  convo_id: string;
  isDark: boolean;
  type_delete:string
}

const DropdownMenu = ({ id, content, convo_id, isDark , type_delete }: DropdownMenuProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { deleteMessage } = useCacheStore();

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
  <button
    onClick={() => setOpen((prev) => !prev)}
    className="h-4 w-4 opacity-60 hover:opacity-100 flex items-center justify-center"
  >
    <MoreVertical
      className="w-4 h-4 mt-1"
      style={{ color: isDark ? "#aaa" : "#666" }}
    />
  </button>

  {open && (
    <div
      className="absolute right-0 mt-0.5 rounded-md p-0.5 shadow-md z-10 min-w-[85px]"
      style={{
        background: isDark ? "rgba(30,30,30,0.95)" : "rgba(255,255,255,0.95)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(0,0,0,0.1)",
        borderRadius: "0.375rem",
      }}
    >
      <button
        className="w-full text-left px-2 py-1.5 rounded-sm flex items-center gap-1.5 transition-colors hover:bg-gray-100 dark:hover:bg-neutral-800 text-sm"
        style={{
          color: isDark ? "#fff" : "#000",
          backgroundColor: "transparent",
        }}
        onClick={() => {
          console.log("Reply to:", content, "in convo:", convo_id);
          setOpen(false);
        }}
      >
        <Reply className="w-3 h-3" />
        Reply
      </button>

      <button
        className="w-full text-left px-2 py-1.5 rounded-sm flex items-center gap-1.5 transition-colors hover:bg-gray-100 dark:hover:bg-neutral-800 text-sm"
        style={{
          color: "rgb(239,68,68)",
          backgroundColor: "transparent",
        }}
        onClick={() => {
          manipulateMessage('DELETE', id, convo_id, undefined, type_delete);
          deleteMessage(`/api/messages?convoId=${convo_id}`, id , type_delete);
          setOpen(false);
        }}
      >
        <Trash2 className="w-3 h-3" />
        Delete
      </button>
    </div>
  )}
</div>

  );
};

export default DropdownMenu;
