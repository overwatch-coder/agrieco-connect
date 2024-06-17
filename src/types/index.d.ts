import { z } from "zod";
import { AuthSchema } from "@/schema/auth.schema";

export type Auth = z.infer<typeof AuthSchema>;
