import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgotPasswordSchema } from "@/schema/auth.schema";
import { ArrowLeft, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/utils";
import ClipLoader from "react-spinners/ClipLoader";
import { z } from "zod";

type ForgotPasswordType = z.infer<typeof ForgotPasswordSchema>;

const ForgotPassword = () => {
  //  usestate
  const [successMessage, setSuccessMessage] = useState("");

  // react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ForgotPasswordType>({
    resolver: zodResolver(ForgotPasswordSchema),
    mode: "all",
  });

  // use mutation
  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: async (data: ForgotPasswordType) => {
      const res = await axiosInstance.post("/users", data);

      return res.data;
    },
    onSuccess: (data, variable) => {
      setSuccessMessage(
        `An email has been sent to ${variable.email}. If an account with that address exists, instructions will be sent to it.`
      );
      reset();
    },
  });

  const handleForgotPassword = async (data: ForgotPasswordType) => {
    await mutateAsync(data);
  };

  return (
    <>
      <Helmet>
        <title>Forgot Password | Agrieco-Connect</title>
        <meta name="description" content="Forgot Password" />
      </Helmet>

      {/* Forgot Password */}
      <section className="w-full h-screen min-h-screen bg-white">
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="bg-primary-brown/10 flex flex-col gap-6 p-10 text-white rounded-lg shadow">
            {/* Title */}
            <div className=" text-primary-brown flex flex-col items-center gap-4">
              <h2 className="md:text-4xl text-3xl font-semibold">
                Forgot Password?
              </h2>
              <p className="font-medium">
                Enter the email address associated with the account.
              </p>
            </div>

            {successMessage ? (
              <div className="flex flex-col items-center w-full max-w-md gap-3 p-10 bg-green-300 rounded shadow">
                <p className="text-primary-gray leading-loose text-center">
                  {successMessage}
                </p>
                <Button
                  onClick={() => setSuccessMessage("")}
                  variant={"default"}
                  className="px-7 py-2 text-white"
                >
                  Go Back
                </Button>
              </div>
            ) : (
              <>
                {/* Forgot Password Form */}
                <form
                  onSubmit={handleSubmit(handleForgotPassword)}
                  className="flex flex-col w-full gap-5 mt-5"
                >
                  {/* Error */}
                  {isError && (
                    <div className="flex flex-col items-center gap-2 p-4 bg-red-300 rounded">
                      <p className="text-sm font-normal text-red-500">
                        {error.message}
                      </p>
                    </div>
                  )}

                  {/* Email */}
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="email"
                      className="flex items-center gap-3 text-sm font-normal text-white"
                    >
                      <User size={18} className="text-primary-brown" />
                      <span className="text-primary-brown/50">
                        Enter Your Email Address
                      </span>
                    </label>

                    <input
                      type="email"
                      id="email"
                      className="border-b-primary-brown focus:border-b-2 w-full bg-transparent border-b-[1.5px] outline-none text-primary-brown"
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-600">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <Button className="bg-primary-green/70 hover:bg-primary-green flex items-center justify-center w-full py-6 font-medium text-white rounded-none">
                    {isPending ? (
                      <ClipLoader size={28} loading={isPending} color="white" />
                    ) : (
                      "Send Link"
                    )}
                  </Button>
                </form>

                <div className="flex items-center justify-between mt-2">
                  <p className="text-primary-brown text-sm font-normal">
                    Didn’t receive link?
                  </p>

                  <Link
                    to="#"
                    className="text-[#1877F2] hover:underline font-medium text-sm"
                  >
                    Resend
                  </Link>
                </div>

                <Link
                  to="/login"
                  className="flex items-center justify-center gap-2 mt-5"
                >
                  <ArrowLeft size={18} className="text-primary-green" />

                  <span className="text-primary-green hover:underline text-sm font-medium">
                    Go Back
                  </span>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ForgotPassword;
