import { z } from "zod";

export const createCompanySchema = z.object({
  name: z
    .string()
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name must not exceed 100 characters"),

  logo: z
    .string()
    .url("Logo must be a valid URL")
    .optional(),

  description: z
    .string()
    .max(1000, "Description must not exceed 1000 characters")
    .optional(),

  website: z
    .string()
    .url("Website must be a valid URL")
    .optional(),

  industry: z
    .string()
    .max(100, "Industry must not exceed 100 characters")
    .optional(),

  location: z
    .string()
    .max(150, "Location must not exceed 150 characters")
    .optional(),

  companySize: z
    .string()
    .max(50, "Company size must not exceed 50 characters")
    .optional(),
});

export const updateCompanySchema = createCompanySchema.partial();