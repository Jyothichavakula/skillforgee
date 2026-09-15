import { z } from "zod";

export const createDiscussionSchema =
  z.object({
    title: z
      .string()
      .trim()
      .min(5, "Title must be at least 5 characters")
      .max(200, "Title cannot exceed 200 characters"),

    content: z
      .string()
      .trim()
      .min(10, "Content must be at least 10 characters")
      .max(5000, "Content cannot exceed 5000 characters"),

    category: z
      .enum([
        "GENERAL",
        "PLACEMENTS",
        "CODING",
        "CAREER",
        "RESUME",
        "INTERVIEWS",
      ])
      .optional(),

    tags: z
      .array(
        z
          .string()
          .trim()
          .min(1)
          .max(50)
      )
      .max(10)
      .optional(),
  });

export const updateDiscussionSchema =
  createDiscussionSchema.partial();

export const createCommentSchema =
  z.object({
    content: z
      .string()
      .trim()
      .min(1, "Comment cannot be empty")
      .max(2000, "Comment cannot exceed 2000 characters"),
  });