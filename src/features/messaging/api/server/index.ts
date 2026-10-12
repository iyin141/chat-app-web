

import { messagingServerApi } from "./api";
import type { MessagingServerApi } from "../types";

const impl: MessagingServerApi = messagingServerApi;

export const getConvoMessages = impl.getConvoMessages.bind(impl);
export const markMessagesFromCache = impl.markMessagesFromCache.bind(impl);
export const getPreloadData = impl.getPreloadData.bind(impl);
