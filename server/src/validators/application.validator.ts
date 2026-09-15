import { z } from "zod";

export const createApplicationSchema = z.object({
  jobId: z
    .string()
    .min(1, "Job ID is required"),

  coverLetter: z
    .string()
    .max(3000, "Cover letter must not exceed 3000 characters")
    .optional(),

  resumeUrl: z
    .string()
    .url("Resume URL must be a valid URL")
    .optional(),
});

export const updateApplicationStatusSchema = z.object({
  status: z.enum([
    "APPLIED",
    "SHORTLISTED",
    "INTERVIEW",
    "SELECTED",
    "REJECTED",
  ]),
});