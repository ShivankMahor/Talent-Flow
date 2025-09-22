import { z } from "zod";

export const CandidateSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  stage: z.enum(["applied", "screen", "tech", "offer", "hired", "rejected"], {
    required_error: "Stage is required",
  }),
});
