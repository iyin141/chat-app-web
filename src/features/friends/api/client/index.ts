

import { friendsClientApi } from "./api";
import type { FriendsClientApi } from "../types";

const impl: FriendsClientApi = friendsClientApi;

export const sendFriendRequest = impl.sendFriendRequest.bind(impl);
