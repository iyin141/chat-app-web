// Stories facade scaffold. There is no stories UI yet, so no call sites to
// migrate. When the module is built, add client/ + server/ subfolders with
// supabase + api implementations dispatched via isApi("STORIES") like the
// other features, plus a server action mirroring the stories RPCs.
export { type Story } from "./types";

export function storiesNotMigrated(): never {
  throw new Error("Stories module has no UI yet — facade not implemented.");
}
