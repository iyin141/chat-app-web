import { groupsServerApi } from "./api";
import type { GroupsServerApi } from "../types";

const impl: GroupsServerApi = groupsServerApi;

export const getGroups = impl.getGroups.bind(impl);
export const getGroup = impl.getGroup.bind(impl);
export const getMembers = impl.getMembers.bind(impl);
