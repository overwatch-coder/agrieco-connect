import { isAxiosError } from "axios";
import { useEffect, useState } from "react";

type CustomErrorProps = {
  isError: boolean;
  error: Error | null;
};

const CustomError = ({ isError, error }: CustomErrorProps) => {
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (isError) {
      setShowError(true);
      // Close the error message after 5 seconds
      setTimeout(() => setShowError(false), 5000);
    }

    return () => {
      setShowError(false);
    };
  }, [isError]);

  return (
    showError &&
    isError && (
      <div className="flex flex-col items-center gap-2 p-4 bg-red-300 rounded">
        <p className="text-sm font-normal text-red-500">
          {isAxiosError(error)
            ? error.response?.data.message ||
              "Something went wrong. Please try again later"
            : error?.message || "Something went wrong. Please try again later"}
        </p>
      </div>
    )
  );
};

export default CustomError;
