import { RouterProvider } from "react-router-dom";
import ConfigureRoutes from "@/routes";

const App = () => {
  const { router } = ConfigureRoutes();
  return <RouterProvider router={router} />;
};

export default App;
