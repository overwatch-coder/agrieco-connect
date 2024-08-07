import { z } from "zod";

export const AuthSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().email().trim().min(1, "Email is required"),
  topic: z.string().min(1, "Topic is required"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: z
    .string()
    .min(1, "Confirm Password is required")
    .min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().default(false),
  username: z.string().min(1, "Username is required"),
});

export const LoginSchema = AuthSchema.pick({
  username: true,
  password: true,
  rememberMe: true,
});

export const SignupSchema = AuthSchema.superRefine((data, context) => {
  if (data.password !== data.confirmPassword) {
    context.addIssue({
      code: "custom",
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });
  }
  return true;
});

export const ForgotPasswordSchema = AuthSchema.pick({
  email: true,
});

export const ResetPasswordSchema = AuthSchema.pick({
  email: true,
  password: true,
  confirmPassword: true,
}).superRefine((data, context) => {
  if (data.password !== data.confirmPassword) {
    context.addIssue({
      code: "custom",
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });
  }
  return true;
});
