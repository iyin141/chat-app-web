

import { friendsServerApi } from "./api";
import type { FriendsServerApi } from "../types";

const impl: FriendsServerApi = friendsServerApi;

export const getFriends = impl.getFriends.bind(impl);
export const getSuggestedUsers = impl.getSuggestedUsers.bind(impl);
