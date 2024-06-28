import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate("/login", { replace: true });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-100">
      <Helmet>
        <title>404 - Page Not Found | Agrieco-Connect</title>
        <meta name="description" content="Page not found" />
      </Helmet>

      <h1 className="mb-4 text-4xl font-bold text-gray-800">
        404 - Page Not Found
      </h1>

      <img
        src={"/images/not-found.jpg"}
        alt="Page not found"
        className="w-full max-w-xl mb-8"
      />
      <p className="mb-8 text-lg text-gray-600">
        Sorry, the page you are looking for does not exist.
      </p>
      <button
        onClick={handleGoBack}
        className="hover:bg-primary-green bg-primary-green hover:scale-105 hover:bg-opacity-85 px-6 py-3 text-white transition duration-300 rounded"
      >
        Go Back
      </button>
    </div>
  );
};

export default NotFound;
