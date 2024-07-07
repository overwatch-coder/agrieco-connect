import React, { createContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export type AppContextType = {
  urlPath: "user" | "admin";
  setUrlPath: (urlPath: "user" | "admin") => void;
};

export const AppContext = createContext<AppContextType>({
  urlPath: "user",
  setUrlPath: () => {},
});

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [urlPath, setUrlPath] = useState<"user" | "admin">("user");
  const pathname = useLocation().pathname;

  console.log({ pathname, urlPath });
  useEffect(() => {
    const path = pathname.split("/")[1] === "user" ? "user" : "admin";
    setUrlPath(path);
  }, [pathname]);

  const values = { urlPath, setUrlPath };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export default ContextProvider;
