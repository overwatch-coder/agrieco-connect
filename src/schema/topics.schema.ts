import { z } from "zod";

export const TopicsSchema = z.object({
  id: z.string().optional(),
  topic: z.string().trim().min(1, "Topic is required"),
  category: z.string().trim().min(1, "Category is required"),
  description: z.string().trim().min(1, "Description is required"),
});
