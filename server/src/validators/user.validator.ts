import { z } from "zod";

export const updateProfileSchema = z.object({
  firstName: z
    .string()
    .min(2)
    .max(50)
    .optional(),

  lastName: z
    .string()
    .min(2)
    .max(50)
    .optional(),

  bio: z
    .string()
    .max(500)
    .optional(),

  location: z
    .string()
    .max(100)
    .optional(),

  university: z
    .string()
    .max(150)
    .optional(),

  degree: z
    .string()
    .max(100)
    .optional(),

  graduationYear: z
    .number()
    .int()
    .min(1950)
    .max(2100)
    .optional(),

  skills: z
    .array(z.string().min(1).max(50))
    .max(50)
    .optional(),
});