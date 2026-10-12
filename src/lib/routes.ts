/**
 * Unified route matrix from the Sketchbot Integration & Architecture Schema.
 * Existing app routes are kept; guide-only routes are added alongside.
 */
export const ROUTES = {
  landing: "/",
  login: "/auth/login",
  signUp: "/auth/sign-up",
  recovery: "/auth/recovery",
  forgotPassword: "/auth/forgot-password",
  updatePassword: "/auth/update-password",

  // desktop shell
  chat: "/chat",
  chatPaper: "/chat?theme=paper",
  chatCollapsed: "/chat?rail=collapsed",
  dashboard: "/dashboard",
  groups: "/groups",
  stories: "/stories",
  settings: "/settings",
  silenced: "/settings/silenced",

  // mobile shell
  mChat: "/m/chat",
  mNetwork: "/m/network",
  mSettings: "/m/settings",
  mStories: "/m/stories",
  mGroupNew: "/m/groups/new",
  mGroup: (id: string) => `/m/group/${id}`,
} as const;

export const FLOW_IDS = {
  landing: "FLOW_LANDING_V2",
  login: "FLOW_AUTH_LOGIN",
  recovery: "FLOW_AUTH_RECOVERY_V2",
  desktopWorkspace: "FLOW_DESKTOP_WORKSPACE",
  desktopLight: "FLOW_DESKTOP_LIGHT_THEME",
  desktopRail: "DESKTOP_EXPAND_COLLAPSE",
  mobileChat: "FLOW_MOBILE_CHAT",
  groupWorkspace: "FLOW_GROUP_WORKSPACE",
  groupCreate: "MATRIX-04 // WS_INIT",
  stories: "SYS.TLM // FEED:ACTIVE",
  network: "FLOW_PEER_NETWORK",
  settings: "FLOW_SETTINGS_APPEARANCE",
  silenced: "MOD-04 // /settings/silenced",
} as const;

export type DeviceAdaptation = "desktop_dashboard" | "desktop_rail" | "mobile_stack" | "mobile_tab" | "mobile_overlay" | "responsive";
