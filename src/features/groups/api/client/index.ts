import { groupsClientApi } from "./api";
import type { GroupsClientApi } from "../types";

const impl: GroupsClientApi = groupsClientApi;

export const getGroups = impl.getGroups.bind(impl);
export const createGroup = impl.createGroup.bind(impl);
export const getGroup = impl.getGroup.bind(impl);
export const addMember = impl.addMember.bind(impl);
export const getMembers = impl.getMembers.bind(impl);
