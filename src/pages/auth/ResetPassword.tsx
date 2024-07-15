import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetPasswordSchema } from "@/schema/auth.schema";
import { ArrowLeft, Eye, EyeOff, LockKeyhole, User } from "lucide-react";
import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ClipLoader from "react-spinners/ClipLoader";
import { z } from "zod";
import { toast } from "react-toastify";
import { useMutateData } from "@/hooks/useFetch";
import CustomError from "@/components/shared/CustomError";

type ResetPasswordType = z.infer<typeof ResetPasswordSchema>;

const ResetPassword = () => {
  //  usestate
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // get token from url search params
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("reset_code");

  // react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ResetPasswordType>({
    resolver: zodResolver(ResetPasswordSchema),
    mode: "all",
  });

  // use mutation
  const { mutateAsync, isPending, isError, error } = useMutateData<
    {
      email: string;
      new_password: string;
    },
    { message: string }
  >({
    url: `/auth/reset-password?reset_code=${token}`,
    config: {
      method: "POST",
      reset: () => reset({ password: "", confirmPassword: "" }),
      resetValues: { password: "", confirmPassword: "" },
    },
  });

  const handleResetPassword = async (data: ResetPasswordType) => {
    const res = await mutateAsync({
      email: data.email,
      new_password: data.password,
    });

    toast.success(`${res.message}. Please login with your new password.`);

    navigate("/login");
  };

  if (!token) {
    toast.error("No token found");
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Helmet>
        <title>Forgot Password | Agrieco-Connect</title>
        <meta name="description" content="Forgot Password" />
      </Helmet>

      {/* Forgot Password */}
      <section className="bg-primary-green/10 w-full h-screen min-h-screen">
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="rounded-xl md:px-20 flex flex-col gap-6 px-10 py-10 bg-white shadow">
            {/* Title */}
            <div className="text-primary-brown flex flex-col items-center gap-4 text-center">
              <h2 className="md:text-4xl text-3xl font-semibold">
                Reset Password
              </h2>
              <p className="md:text-base text-sm font-medium">
                Enter new password to reset the old password
              </p>
            </div>

            {/* Reset Password Form */}
            <form
              onSubmit={handleSubmit(handleResetPassword)}
              className="gap-7 flex flex-col w-full mt-5"
            >
              {/* Error */}
              <CustomError isError={isError} error={error} />

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="flex items-center justify-between gap-3 text-sm font-normal text-white"
                >
                  <span className="flex items-center gap-2">
                    <User size={18} className="text-primary-brown" />
                    <span className="text-primary-brown/50">Email</span>
                  </span>
                </label>

                <input
                  type={"text"}
                  id="email"
                  className="border-b-primary-brown text-primary-brown focus:border-b-2 w-full bg-transparent border-b-[1.5px] outline-none"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-start text-xs italic text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="password"
                  className="flex items-center justify-between gap-3 text-sm font-normal text-white"
                >
                  <span className="flex items-center gap-2">
                    <LockKeyhole size={18} className="text-primary-brown" />
                    <span className="text-primary-brown/50">Password</span>
                  </span>

                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="cursor-pointer"
                  >
                    {showPassword ? (
                      <Eye size={18} className="text-primary-brown" />
                    ) : (
                      <EyeOff size={18} className="text-primary-brown" />
                    )}
                  </span>
                </label>

                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="border-b-primary-brown text-primary-brown focus:border-b-2 w-full bg-transparent border-b-[1.5px] outline-none"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-start text-xs italic text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="confirmPassword"
                  className="flex items-center justify-between gap-3 text-sm font-normal text-white"
                >
                  <span className="flex items-center gap-2">
                    <LockKeyhole size={18} className="text-primary-brown" />
                    <span className="text-primary-brown/50">
                      Confirm Password
                    </span>
                  </span>

                  <span
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="cursor-pointer"
                  >
                    {showConfirmPassword ? (
                      <Eye size={18} className="text-primary-brown" />
                    ) : (
                      <EyeOff size={18} className="text-primary-brown" />
                    )}
                  </span>
                </label>

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  className="border-b-primary-brown text-primary-brown focus:border-b-2 w-full bg-transparent border-b-[1.5px] outline-none"
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <p className="text-start text-xs italic text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <Button className="bg-primary-green/70 hover:bg-primary-green flex items-center justify-center w-full py-6 font-medium text-white rounded-none">
                {isPending ? (
                  <ClipLoader size={28} loading={isPending} color="white" />
                ) : (
                  "Change Password"
                )}
              </Button>
            </form>

            <Link
              to="/login"
              className="flex items-center justify-center gap-2 mt-5"
            >
              <ArrowLeft size={18} className="text-primary-green" />

              <span className="text-primary-green hover:underline text-sm font-medium">
                Go Back
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default ResetPassword;
