import { z } from "zod";

export const AppointmentsAvailabilitySchema = z.object({
  companyName: z.string().trim().min(1, "Company Name is required"),
  specialty: z.string().trim().min(1, "Specialty is required"),
  location: z.string().trim().min(1, "Location is required"),
  experienceLevel: z.string().trim().min(1, "Experience Level is required"),
  availabilitySlotStart: z
    .string()
    .trim()
    .min(1, "Availability Slot Start is required"),
  availabilitySlotEnd: z
    .string()
    .trim()
    .min(1, "Availability Slot End is required"),
  contactInfo: z.string().trim().min(1, "Contact Info is required"),
  bio: z.string().trim().min(1, "Bio is required"),
});
