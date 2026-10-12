import { apiFetchServer } from "@/lib/api/server";
import type { GroupDto, GroupMemberDto, GroupsServerApi } from "../types";

export const groupsServerApi: GroupsServerApi = {
  getGroups: () => apiFetchServer<GroupDto[]>("/groups"),
  getGroup: (groupId) => apiFetchServer<GroupDto>(`/groups/${groupId}`),
  getMembers: (groupId) => apiFetchServer<GroupMemberDto[]>(`/groups/${groupId}/members`),
};
