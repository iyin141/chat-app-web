export interface GroupDto {
  id: number;
  name: string;
  description: string;
  creatorId: string;
  conversationId: string;
  createdAt: string;
}

export interface GroupMemberDto {
  id: number;
  groupId: number;
  memberId: string;
  role: string;
  joinedAt: string;
}

export interface GroupsClientApi {
  getGroups(): Promise<GroupDto[]>;
  createGroup(name: string, description: string): Promise<GroupDto>;
  getGroup(groupId: number): Promise<GroupDto>;
  addMember(groupId: number, memberId: string): Promise<void>;
  getMembers(groupId: number): Promise<GroupMemberDto[]>;
}

export interface GroupsServerApi {
  getGroups(): Promise<GroupDto[]>;
  getGroup(groupId: number): Promise<GroupDto>;
  getMembers(groupId: number): Promise<GroupMemberDto[]>;
}
