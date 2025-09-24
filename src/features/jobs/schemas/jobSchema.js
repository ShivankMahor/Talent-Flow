// features/jobs/schemas/jobSchema.js
import { z } from "zod";

export const jobSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  status: z.enum(["active", "archived"]).default("active"),
  tags: z.array(z.string()).default([]),
  order: z.number().int().positive("Order must be a positive number"),

  company: z.string().min(1, "Company is required"),
  location: z.string().min(1, "Location is required"),
  salary: z.string().optional(),
  postedDate: z.string().optional(),
  applicants: z.number().int().nonnegative().default(0),
  description: z.string().optional(),
  experience: z.string().optional(),
  type: z.string().optional(),
});
