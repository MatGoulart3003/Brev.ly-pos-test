import { z } from "zod";

import type { links } from "../../../infra/db/schemas/links";

export const getLinkByShortUrlInputSchema = z.object({
  shortUrl: z.string(),
});

export type GetLinkByShortUrlInput = z.infer<
  typeof getLinkByShortUrlInputSchema
>;

export type Link = typeof links.$inferSelect;
