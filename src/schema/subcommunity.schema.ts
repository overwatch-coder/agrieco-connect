import { z } from "zod";

export const SubcommunitySchema = z.object({
  name: z.string().min(1, "Community name is required"),
  category: z.string().min(1, "Category is required"),
  location: z.string().min(1, "Location is required"),
  description: z.string().min(1, "Description is required"),
});
