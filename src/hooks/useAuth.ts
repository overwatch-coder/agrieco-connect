import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

// === Auth ===
export const authAtom = atomWithStorage<IAuth | null>("auth", null);
export const useAuth = () => useAtom(authAtom);
