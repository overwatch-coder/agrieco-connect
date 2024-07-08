import { useAuth } from "@/hooks/useAuth";
import React, { createContext, useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export type AppContextType = {
  urlPath: "user" | "admin";
  setUrlPath: (urlPath: "user" | "admin") => void;
  isUserAuthenticated: boolean;
  setIsUserAuthenticated: (isUserAuthenticated: boolean) => void;
};

export const AppContext = createContext<AppContextType>({
  urlPath: "user",
  setUrlPath: () => {},
  isUserAuthenticated: false,
  setIsUserAuthenticated: () => {},
});

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [urlPath, setUrlPath] = useState<"user" | "admin">("user");
  const pathname = useLocation().pathname;
  const location = useLocation();
  const [auth] = useAuth();
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const navigate = useNavigate();

  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  useEffect(() => {
    const redirect = searchParams.get("redirect");
    if (redirect) {
      navigate(redirect);
    }
  }, [navigate, searchParams]);

  useEffect(() => {
    const path = pathname?.split("/")[1] === "user" ? "user" : "admin";
    setUrlPath(path);
  }, [pathname]);

  useEffect(() => {
    setIsUserAuthenticated(auth?.email !== "" || auth?.email !== null);
  }, [auth]);

  const values = {
    urlPath,
    setUrlPath,
    isUserAuthenticated,
    setIsUserAuthenticated,
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export default ContextProvider;
