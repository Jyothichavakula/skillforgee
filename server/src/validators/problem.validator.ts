import { z } from "zod";

export const createProblemSchema = z.object({
  title: z
    .string()
    .min(2)
    .max(200),

  difficulty: z.enum([
    "EASY",
    "MEDIUM",
    "HARD",
  ]),

  topics: z
    .array(z.string().min(1))
    .max(20)
    .optional(),

  companyTags: z
    .array(z.string().min(1))
    .max(50)
    .optional(),

  leetcodeUrl: z
    .string()
    .url(),

  description: z
    .string()
    .max(1000)
    .optional(),
});

export const updateProblemSchema =
  createProblemSchema.partial().extend({
    isActive: z.boolean().optional(),
  });