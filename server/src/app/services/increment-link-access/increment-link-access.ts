import { eq, sql } from "drizzle-orm";

import { db } from "../../../infra/db";
import { links } from "../../../infra/db/schemas/links";
import type {
  IncrementLinkAccessInput,
  IncrementLinkAccessResult,
} from "./types";

export async function incrementLinkAccess(
  input: IncrementLinkAccessInput,
): Promise<IncrementLinkAccessResult | null> {
  const [updated] = await db
    .update(links)
    .set({ accessCount: sql`${links.accessCount} + 1` })
    .where(eq(links.id, input.id))
    .returning({ accessCount: links.accessCount });

  return updated ?? null;
}
