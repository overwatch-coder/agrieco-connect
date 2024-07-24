import { z } from "zod";

export const MarketplaceProductsSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  description: z.string().trim().min(1, "Description is required"),
  price: z.string().min(1, "Price is required"),
  location: z.string().trim().min(1, "Location is required"),
  seller: z.string().trim().min(1, "Seller is required"),
  image: z.any({ required_error: "Image is required" }),
});

export const MarketplaceEventsSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  location: z.string().trim().min(1, "Venue/Location is required"),
  // price: z.coerce.number().optional(),
  date: z.string().trim().min(1, "Date is required"),
  start_time: z.string().trim().min(1, "Start time is required"),
  end_time: z.string().trim().min(1, "End time is required"),
  description: z.string().trim().min(1, "Description is required"),
  image: z.any().optional(),
});
