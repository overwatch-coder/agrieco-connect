import AuthBackgroundImage from "@/components/shared/AuthBackgroundImage";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schema/auth.schema";
import { Auth } from "@/types";
import { Eye, EyeOff, LockKeyhole, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/utils";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/useAuth";

type LoginType = Pick<Auth, "email" | "password" | "rememberMe">;

const Login = () => {
  const [auth, setAuth] = useAuth();
  //  usestate
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
    mode: "all",
  });

  // use mutation
  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: async (data: LoginType) => {
      const res = await axiosInstance.get("/users");
      const resData: Omit<Auth, "confirmPassword">[] = res.data;

      // check if user exists
      const user = resData.find((user) => user.email === data.email);
      if (!user) {
        throw new Error("Invalid credentials");
      }

      // check if password is correct
      const isCorrectPassword = user.email === data.email;
      if (!isCorrectPassword) {
        throw new Error("Invalid credentials");
      }

      const { password, ...rest } = user;

      return rest;
    },
    onSuccess: (data: Omit<Auth, "password" | "confirmPassword">) => {
      setAuth(data);

      toast.success("Login Successful");

      navigate("/dashboard");
    },
  });

  const handleLogin = async (data: LoginType) => {
    await mutateAsync(data);
  };

  return (
    <div className="place-items-center md:grid-cols-3 grid min-h-screen grid-cols-1">
      <Helmet>
        <title>Login | Agrieco-Connect</title>
        <meta name="description" content="Login to Agrieco-Connect" />
      </Helmet>

      {/* Login Bacground */}
      <AuthBackgroundImage />

      {/* Login Form */}
      <section className="md:col-span-2 bg-primary-brown oveflow-y-scroll scrollbar-hide w-full col-span-1">
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="flex flex-col gap-2 text-center text-white">
            {/* Title */}
            <div className="flex flex-col items-center gap-2">
              <h2 className="text-xl font-semibold">Stay Connected</h2>
              <p className="text-sm font-normal">
                Login with your credential to access your account
              </p>
            </div>

            {/* Login Form */}
            <form
              onSubmit={handleSubmit(handleLogin)}
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
                  <p className="text-start text-xs text-red-600">
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
                  "Login"
                )}
              </Button>
            </form>

            <div className="flex flex-col items-center gap-3 mt-4">
              <p className="text-sm font-light text-white">
                Don't have an account yet?
              </p>

              <Link
                to="/signup"
                className="hover:bg-white hover:scale-105 text-primary-green flex items-center justify-center w-full py-3 font-medium transition bg-white rounded-none"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
