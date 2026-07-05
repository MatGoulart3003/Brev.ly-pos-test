import { eq } from "drizzle-orm";

import { db } from "../../../infra/db";
import { links } from "../../../infra/db/schemas/links";
import type { DeleteLinkInput } from "./types";

export async function deleteLink(input: DeleteLinkInput): Promise<boolean> {
  const [deleted] = await db
    .delete(links)
    .where(eq(links.id, input.id))
    .returning({ id: links.id });

  return Boolean(deleted);
}
