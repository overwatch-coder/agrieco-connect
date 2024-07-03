import { z } from "zod";
import { AuthSchema } from "@/schema/auth.schema";
import { SettingsSchema } from "@/schema/settings.schema";
import {
  MarketplaceEventsSchema,
  MarketplaceProductsSchema,
} from "@/schema/marketplace.schema";
import { FeedSchema } from "@/schema/feed.schema";
import { AppointmentsAvailabilitySchema } from "@/schema/appointments.schema";

export type Auth = z.infer<typeof AuthSchema>;
export type SettingsType = z.infer<typeof SettingsSchema>;
export type MarketplaceProducts = z.infer<typeof MarketplaceProductsSchema>;
export type MarketplaceEvents = z.infer<typeof MarketplaceEventsSchema>;
export type FeedType = z.infer<typeof FeedSchema>;
export type AppointmentsAvailability = z.infer<
  typeof AppointmentsAvailabilitySchema
>;
