import { z } from "zod";

export const SettingsSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z
    .string()
    .trim()
    .min(10, "Phone number must be at least 10 digits")
    .optional(),
  location: z.string().trim().min(1, "Location is required").optional(),
  username: z.string().trim().min(1, "Username is required"),
  bio: z.string().trim().min(1, "Bio is required").optional(),
  occupation: z.string().trim().min(1, "Occupation is required").optional(),
  company: z.string().trim().min(1, "Company is required").optional(),
  experience: z.string().trim().min(1, "Experience is required").optional(),
  primaryExpertise: z
    .string()
    .trim()
    .min(1, "Primary Expertise is required")
    .optional(),
  secondaryExpertise: z
    .string()
    .trim()
    .min(1, "Secondary Expertise is required")
    .optional(),
  interests: z.string().trim().min(1, "Interests is required").optional(),
  certifications: z
    .string()
    .trim()
    .min(1, "Certifications is required")
    .optional(),
  instuitionsAttended: z
    .string()
    .trim()
    .min(1, "Instuitions Attended is required")
    .optional(),
  awards: z.string().trim().min(1, "Awards is required").optional(),
  projects: z.string().trim().min(1, "Projects is required").optional(),
  publications: z.string().trim().min(1, "Publications is required").optional(),
  contributions: z
    .string()
    .trim()
    .min(1, "Contributions is required")
    .optional(),
  videos: z.string().trim().min(1, "Videos is required").optional(),
  groups: z.string().trim().min(1, "Groups is required").optional(),
  documents: z.string().trim().min(1, "Documents is required").optional(),
});
