import { z } from "zod";

export const createJobSchema = z.object({
  title: z
    .string()
    .min(2, "Job title must be at least 2 characters")
    .max(150, "Job title must not exceed 150 characters"),

  companyId: z
    .string()
    .min(1, "Company ID is required"),

  description: z
    .string()
    .min(10, "Job description must be at least 10 characters")
    .max(5000, "Job description must not exceed 5000 characters"),

  requirements: z
    .array(z.string().min(1))
    .max(50)
    .optional(),

  skills: z
    .array(z.string().min(1))
    .max(50)
    .optional(),

  location: z
    .string()
    .min(2)
    .max(150),

  jobType: z.enum([
    "FULL_TIME",
    "PART_TIME",
    "INTERNSHIP",
  ]),

  salaryMin: z
    .number()
    .min(0)
    .optional(),

  salaryMax: z
    .number()
    .min(0)
    .optional(),

  applicationDeadline: z.coerce.date(),
});

export const updateJobSchema = createJobSchema
  .omit({
    companyId: true,
  })
  .partial();