import { z } from "zod";

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  password: z.string(),
  name: z.string(),
  role: z.enum(["admin", "user"]),
});
