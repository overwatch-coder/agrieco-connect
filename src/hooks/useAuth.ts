import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { Auth } from "@/types";

export const authAtom = atomWithStorage<Omit<
  Auth,
  "password" | "confirmPassword"
> | null>("auth", null);

export const useAuth = () => useAtom(authAtom);
