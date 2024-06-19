import { z } from "zod";
import { AuthSchema } from "@/schema/auth.schema";
import { SettingsSchema } from "@/schema/settings.schema";

export type Auth = z.infer<typeof AuthSchema>;
export type SettingsType = z.infer<typeof SettingsSchema>;
