import { z } from "zod";
import { publicLeadStatuses } from "../utils/lead-status.js";

export const createLeadSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name cannot exceed 100 characters"),

    email: z
      .string()
      .trim()
      .email("Invalid email address")
      .transform((email) => email.toLowerCase()),

    status: z.enum(publicLeadStatuses),
  }),
});

export type CreateLeadInput =
  z.infer<typeof createLeadSchema>["body"];
