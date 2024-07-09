import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "jotai";
import { createStore } from "jotai";
import { Toaster } from "@/components/ui/toaster";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// create a store for the app state
const store = createStore();

// create a query client
const queryClient = new QueryClient();

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster />
        <ReactQueryDevtools initialIsOpen={false} />
        <ToastContainer />
      </QueryClientProvider>
    </Provider>
  );
};

export default AppProvider;
