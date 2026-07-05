import { eq } from "drizzle-orm";

import { db } from "../../../infra/db";
import { links } from "../../../infra/db/schemas/links";
import type { GetLinkByShortUrlInput, Link } from "./types";

export async function getLinkByShortUrl(
  input: GetLinkByShortUrlInput,
): Promise<Link | null> {
  const [link] = await db
    .select()
    .from(links)
    .where(eq(links.shortUrl, input.shortUrl));

  return link ?? null;
}
