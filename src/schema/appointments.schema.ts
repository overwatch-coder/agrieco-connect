import { z } from "zod";

export const AppointmentsAvailabilitySchema = z.object({
  company_name: z.string().trim().min(1, "Company Name is required"),
  specialty: z.string().trim().min(1, "Specialty is required"),
  location: z.string().trim().min(1, "Location is required"),
  experience_level: z.string().trim().min(1, "Experience Level is required"),
  availabilitySlotStart: z
    .string()
    .trim()
    .min(1, "Availability Slot Start is required"),
  availabilitySlotEnd: z
    .string()
    .trim()
    .min(1, "Availability Slot End is required"),
  contact_info: z.string().trim().min(1, "Contact Info is required"),
  bio: z.string().trim().min(1, "Bio is required"),
});

export const AppointmentsSchema = z.object({
  fullName: z.string().trim().min(1, "Full Name is required"),
  speciality: z.string().trim().min(1, "Speciality is required"),
  location: z.string().trim().min(1, "Location is required"),
  experienceLevel: z.string().trim().min(1, "Experience Level is required"),
  availabilitySlot: z.string().trim().min(1, "Availability Slot is required"),
  bio: z.string().trim().min(1, "Bio is required"),
  title: z.string().trim().min(1, "Title is required"),
  email: z.string().trim().min(1, "Contact Info (email) is required"),
  status: z.string().trim().min(1, "Status is required"),
  id: z.string().trim().optional(),
});
