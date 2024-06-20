import { z } from "zod";

export const MarketplaceProductsSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  description: z.string().trim().min(1, "Description is required"),
  price: z.string().min(1, "Price is required"),
  location: z.string().trim().min(1, "Location is required"),
  seller: z.string().trim().min(1, "Seller is required"),
  attachments: z.any().optional(),
});
