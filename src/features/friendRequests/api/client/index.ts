

import { friendRequestsClientApi } from "./api";
import type { FriendRequestsClientApi } from "../types";

const impl: FriendRequestsClientApi = friendRequestsClientApi;

export const acceptFriendRequest = impl.acceptFriendRequest.bind(impl);
export const declineFriendRequest = impl.declineFriendRequest.bind(impl);
export const cancelFriendRequest = impl.cancelFriendRequest.bind(impl);
