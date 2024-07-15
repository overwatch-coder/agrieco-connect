import { isAxiosError } from "axios";

type CustomErrorProps = {
  isError: boolean;
  error: Error | null;
};

const CustomError = ({ isError, error }: CustomErrorProps) => {
  return (
    isError && (
      <div className="flex flex-col items-center gap-2 p-4 bg-red-300 rounded">
        <p className="text-sm font-normal text-red-500">
          {isAxiosError(error)
            ? error.response?.data.message ||
              "Server Error: Something went wrong"
            : error?.message}
        </p>
      </div>
    )
  );
};

export default CustomError;
