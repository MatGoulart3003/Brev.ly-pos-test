import { z } from "zod";

import type { links } from "../../../infra/db/schemas/links";

export const createLinkInputSchema = z.object({
  originalUrl: z.url(),
  shortUrl: z
    .string()
    .min(3)
    .max(30)
    .regex(
      /^[a-z0-9-]+$/,
      "shortUrl must contain only lowercase letters, numbers and hyphens",
    ),
});

export type CreateLinkInput = z.infer<typeof createLinkInputSchema>;

export type Link = typeof links.$inferSelect;

export type CreateLinkResult =
  | { ok: true; link: Link }
  | { ok: false; error: "SHORT_URL_ALREADY_EXISTS" };
