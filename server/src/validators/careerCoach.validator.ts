import { z } from "zod";

export const careerCoachSchema = z.object({
  message: z
    .string()
    .min(1, "Message is required")
    .max(
      2000,
      "Message must not exceed 2000 characters"
    ),

  targetCompany: z
    .string()
    .min(1)
    .max(100)
    .optional(),
});