"use client";

import { useState } from "react";
import { createGroup } from "@/features/groups/api/client";
import type { GroupDto } from "@/features/groups/api/types";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function GroupsListClient({ initialGroups }: { initialGroups: GroupDto[] }) {
  const [groups, setGroups] = useState(initialGroups);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!name.trim()) return;
    setLoading(true);
    try {
      const newGroup = await createGroup(name, desc);
      setGroups([...groups, newGroup]);
      setName("");
      setDesc("");
    } catch (e) {
      console.error(e);
      alert("Failed to create group");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 mb-4">
        <Input placeholder="Group Name" value={name} onChange={(e) => setName(e.target.value)} />
        <Input placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)} />
        <Button onClick={handleCreate} disabled={loading}>Create Group</Button>
      </div>
      <ul className="flex flex-col gap-2">
        {groups.map(g => (
          <li key={g.id} className="border p-4 rounded">
            <h2 className="font-bold">{g.name}</h2>
            <p>{g.description}</p>
            <Link href={`/groups/${g.id}`} className="text-blue-500 underline mt-2 block">
              Open Chat
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
