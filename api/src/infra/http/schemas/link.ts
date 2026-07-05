import { z } from "zod";

export const linkSchema = z.object({
  id: z.uuid(),
  originalUrl: z.url(),
  shortUrl: z.string(),
  accessCount: z.number(),
  createdAt: z.date(),
});
