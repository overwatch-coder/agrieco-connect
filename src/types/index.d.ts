import { z } from "zod";
import { AuthSchema } from "@/schema/auth.schema";
import { SettingsSchema } from "@/schema/settings.schema";
import { MarketplaceProductsSchema } from "@/schema/marketplace.schema";

export type Auth = z.infer<typeof AuthSchema>;
export type SettingsType = z.infer<typeof SettingsSchema>;
export type MarketplaceProducts = z.infer<typeof MarketplaceProductsSchema>;
