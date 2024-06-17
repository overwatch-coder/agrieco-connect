import { z } from "zod";
import { UserSchema } from "@/schema/user.schema";

export type User = z.infer<typeof UserSchema>;
