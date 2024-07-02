import { z } from "zod";

export const FeedSchema = z.object({
  content: z.string().trim().min(1, "Content is required"),
  tags: z.string().trim().optional(),
  images: z.any().optional(),
});
