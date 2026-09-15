import { z } from "zod";

export const updateProblemProgressSchema = z.object({
  status: z.enum([
    "NOT_STARTED",
    "ATTEMPTED",
    "SOLVED",
  ]),
});