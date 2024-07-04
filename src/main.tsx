import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import AppProvider from "@/providers/AppProvider.tsx";
import { HelmetProvider } from "react-helmet-async";
import HolyLoader from "holy-loader";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppProvider>
      <HelmetProvider>
        <HolyLoader color="#4CAF50" />
        <App />
      </HelmetProvider>
    </AppProvider>
  </React.StrictMode>
);
