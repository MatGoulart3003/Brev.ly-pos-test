import { z } from "zod";

/** Fails fast at startup when a required variable is missing or malformed. */
const envSchema = z.object({
  VITE_FRONTEND_URL: z.url(),
  VITE_BACKEND_URL: z.url(),
});

export const env = envSchema.parse(import.meta.env);
