

import { profilesClientApi } from "./api";
import type { ProfilesClientApi } from "../types";

const impl: ProfilesClientApi = profilesClientApi;

export const createProfile = impl.createProfile.bind(impl);
