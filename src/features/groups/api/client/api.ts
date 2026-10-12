import { apiFetch } from "@/lib/api/client";
import type { GroupDto, GroupMemberDto, GroupsClientApi } from "../types";

export const groupsClientApi: GroupsClientApi = {
  getGroups: () => apiFetch<GroupDto[]>("/groups"),
  createGroup: (name, description) =>
    apiFetch<GroupDto>("/groups", {
      method: "POST",
      body: JSON.stringify({ name, description }),
    }),
  getGroup: (groupId) => apiFetch<GroupDto>(`/groups/${groupId}`),
  addMember: (groupId, memberId) =>
    apiFetch<void>(`/groups/${groupId}/members`, {
      method: "POST",
      body: JSON.stringify({ memberId }),
    }),
  getMembers: (groupId) => apiFetch<GroupMemberDto[]>(`/groups/${groupId}/members`),
};
