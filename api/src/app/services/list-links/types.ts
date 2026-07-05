import { z } from "zod";

import type { links } from "../../../infra/db/schemas/links";

export const listLinksInputSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  pageSize: z.coerce.number().min(1).max(100).default(20),
});

export type ListLinksInput = z.infer<typeof listLinksInputSchema>;

export type Link = typeof links.$inferSelect;

export interface ListLinksResult {
  links: Link[];
  total: number;
}
