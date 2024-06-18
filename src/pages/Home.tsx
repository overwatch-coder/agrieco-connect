import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6">
      <Button>Hello World</Button>
      <div className="flex items-center justify-center gap-4">
        <Button>
          <Link to="/login">Login</Link>
        </Button>

        <Button>
          <Link to="/admin/dashboard">Dashboard</Link>
        </Button>
      </div>
    </div>
  );
};

export default Home;
