import { AppContext } from "@/providers/ContextProvider";
import { useContext } from "react";

export const useAppContext = () => useContext(AppContext);
