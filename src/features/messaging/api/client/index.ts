

import { messagingClientApi } from "./api";
import type { MessagingClientApi } from "../types";

const impl: MessagingClientApi = messagingClientApi;

export const sendMessage = impl.sendMessage.bind(impl);
export const manipulateMessage = impl.manipulateMessage.bind(impl);
