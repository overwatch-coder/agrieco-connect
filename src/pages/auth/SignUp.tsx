import AuthBackgroundImage from "@/components/shared/AuthBackgroundImage";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupSchema } from "@/schema/auth.schema";
import { Auth } from "@/types";
import { Eye, EyeOff, LockKeyhole, User } from "lucide-react";
import { MdOutlineTopic } from "react-icons/md";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/utils";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";

type SignUpType = Auth;

const SignUp = () => {
  //  usestate
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  // react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignUpType>({
    resolver: zodResolver(SignupSchema),
    mode: "all",
  });

  // use mutation
  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: async (data: SignUpType) => {
      const usersRes = await axiosInstance.get("/users");
      const users: Auth[] = usersRes.data;
      const userExists = users.find((user: Auth) => user.email === data.email);

      if (userExists) {
        throw new Error("User already exists");
      }

      const { confirmPassword, ...signUpData } = data;

      const res = await axiosInstance.post("/users", signUpData);

      const user: Omit<SignUpType, "confirmPassword"> = res.data;

      const { password, ...rest } = user;

      return rest;
    },
    onError: (error) => {
      console.log(error);
      reset({ password: "", confirmPassword: "" });
    },
    onSuccess: () => {
      toast.success("Signup Successful");
      navigate("/login");
    },
  });

  const handleSignUp = async (data: SignUpType) => {
    await mutateAsync(data);
  };

  return (
    <div className="place-items-center md:grid-cols-3 grid min-h-screen grid-cols-1">
      <Helmet>
        <title>Create New Account | Agrieco-Connect</title>
        <meta name="description" content="Create New Account" />
      </Helmet>

      {/* Sign Up Bacground */}
      <AuthBackgroundImage />

      {/* Sign Up Form */}
      <section className="md:col-span-2 bg-primary-brown scrollbar-hide w-full col-span-1 overflow-y-scroll">
        <div className="md:pt-32 flex flex-col items-center justify-center h-screen">
          <div className="flex flex-col gap-2 text-white">
            {/* Title */}
            <div className="flex flex-col items-center gap-2 text-center">
              <h2 className="text-xl font-semibold">Create Account</h2>
              <p className="text-sm font-normal">
                Create an account today to stay connected and explore!
              </p>
            </div>

            {/* Sign Up Form */}
            <form
              onSubmit={handleSubmit(handleSignUp)}
              className="flex flex-col w-full gap-5 mt-5"
            >
              {/* Error */}
              {isError && (
                <div className="flex flex-col items-center gap-2 p-4 bg-red-300 rounded">
                  <p className="text-start text-sm font-normal text-red-500">
                    {error.message}
                  </p>
                </div>
              )}

              {/* Full Name */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="name"
                  className="flex items-center gap-3 text-sm font-normal text-white"
                >
                  <User size={18} className="text-white" />
                  <span className="text-white/50">Full Name</span>
                </label>

                <input
                  type="text"
                  id="name"
                  className="border-b-primary-gray focus:border-b-2 w-full bg-transparent border-b-[1.5px] outline-none"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-xs text-red-500">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="flex items-center gap-3 text-sm font-normal text-white"
                >
                  <User size={18} className="text-white" />
                  <span className="text-white/50">Email</span>
                </label>

                <input
                  type="email"
                  id="email"
                  className="border-b-primary-gray focus:border-b-2 w-full bg-transparent border-b-[1.5px] outline-none"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email.message}</p>
                )}
              </div>

              {/* Topic Preference */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="topic"
                  className="flex items-center gap-3 text-sm font-normal text-white"
                >
                  <MdOutlineTopic size={18} className="text-white" />
                  <span className="text-white/50">Topic Preference</span>
                </label>

                <input
                  type="topic"
                  id="topic"
                  className="border-b-primary-gray focus:border-b-2 w-full bg-transparent border-b-[1.5px] outline-none"
                  {...register("topic")}
                />
                {errors.topic && (
                  <p className="text-xs text-red-500">{errors.topic.message}</p>
                )}
              </div>

              {/* Password */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="password"
                  className="flex items-center justify-between gap-3 text-sm font-normal text-white"
                >
                  <span className="flex items-center gap-2">
                    <LockKeyhole size={18} className="text-white" />
                    <span className="text-white/50">Password</span>
                  </span>

                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="cursor-pointer"
                  >
                    {showPassword ? (
                      <Eye size={18} className="text-white" />
                    ) : (
                      <EyeOff size={18} className="text-white" />
                    )}
                  </span>
                </label>

                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="border-b-primary-gray focus:border-b-2 w-full bg-transparent border-b-[1.5px] outline-none"
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
                    <LockKeyhole size={18} className="text-white" />
                    <span className="text-white/50">Confirm Password</span>
                  </span>

                  <span
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="cursor-pointer"
                  >
                    {showConfirmPassword ? (
                      <Eye size={18} className="text-white" />
                    ) : (
                      <EyeOff size={18} className="text-white" />
                    )}
                  </span>
                </label>

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  className="border-b-primary-gray focus:border-b-2 w-full bg-transparent border-b-[1.5px] outline-none"
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <p className="text-start text-xs italic text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    {...register("rememberMe")}
                  />

                  <label
                    htmlFor="rememberMe"
                    className="text-white/40 block text-sm"
                  >
                    Remember Me
                  </label>
                </div>

                <Link
                  to="/forgot-password"
                  className="text-white/40 hover:underline hover:text-white/70 text-sm"
                >
                  Forgot Password ?
                </Link>
              </div>

              <Button className="bg-primary-green hover:bg-primary-green hover:scale-105 flex items-center justify-center w-full py-6 font-medium text-white transition rounded-none">
                {isPending ? (
                  <ClipLoader size={28} loading={isPending} color="white" />
                ) : (
                  "Sign Up"
                )}
              </Button>
            </form>

            <div className="flex items-center justify-between pb-10 mt-4">
              <p className="text-sm font-light text-white">
                Already have an account?
              </p>

              <Link
                to="/login"
                className="text-primary-green hover:underline font-medium"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
