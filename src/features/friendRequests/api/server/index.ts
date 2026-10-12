

import { friendRequestsServerApi } from "./api";
import type { FriendRequestsServerApi } from "../types";

const impl: FriendRequestsServerApi = friendRequestsServerApi;

export const getFriendRequests = impl.getFriendRequests.bind(impl);
