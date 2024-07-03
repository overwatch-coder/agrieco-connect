import { z } from "zod";

export const MarketplaceProductsSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  description: z.string().trim().min(1, "Description is required"),
  price: z.string().min(1, "Price is required"),
  location: z.string().trim().min(1, "Location is required"),
  seller: z.string().trim().min(1, "Seller is required"),
  attachments: z.any().optional(),
});

export const MarketplaceEventsSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  venue: z.string().trim().min(1, "Venue is required"),
  date: z.string().trim().min(1, "Date is required"),
  price: z.string().trim().min(1, "Price is required"),
  startTime: z.string().trim().min(1, "Start time is required"),
  endTime: z.string().trim().min(1, "End time is required"),
  description: z.string().trim().min(1, "Description is required"),
  attachments: z.any().optional(),
});
