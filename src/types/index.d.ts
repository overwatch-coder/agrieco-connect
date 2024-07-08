import { z } from "zod";
import { AuthSchema } from "@/schema/auth.schema";
import { SettingsSchema } from "@/schema/settings.schema";
import {
  MarketplaceEventsSchema,
  MarketplaceProductsSchema,
} from "@/schema/marketplace.schema";
import { FeedSchema } from "@/schema/feed.schema";
import {
  AppointmentsAvailabilitySchema,
  AppointmentsSchema,
} from "@/schema/appointments.schema";
import { SubcommunitySchema } from "@/schema/subcommunity.schema";
import { TopicsSchema } from "@/schema/topics.schema";

export type Auth = z.infer<typeof AuthSchema>;
export type SettingsType = z.infer<typeof SettingsSchema>;
export type MarketplaceProducts = z.infer<typeof MarketplaceProductsSchema>;
export type MarketplaceEvents = z.infer<typeof MarketplaceEventsSchema>;
export type FeedType = z.infer<typeof FeedSchema>;
export type AppointmentsAvailability = z.infer<
  typeof AppointmentsAvailabilitySchema
>;
export type AppointmentsType = z.infer<typeof AppointmentsSchema>;
export type Subcommunity = z.infer<typeof SubcommunitySchema>;
export type TopicsType = z.infer<typeof TopicsSchema>;
