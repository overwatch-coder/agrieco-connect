import { z } from "zod";

export const FeedSchema = z.object({
  content: z.string().trim().min(1, "Content is required"),
  topics: z.string().trim().optional(),
  photo: z
    .array(z.instanceof(File))
    .min(1, "Photo is required")
    .refine((files) => files.length <= 5, "You can only upload 5 images"),
});
