import { db } from "../../../infra/db";
import { links } from "../../../infra/db/schemas/links";
import type { CreateLinkInput, CreateLinkResult } from "./types";

export async function createLink(
  input: CreateLinkInput,
): Promise<CreateLinkResult> {
  const { originalUrl, shortUrl } = input;

  const [link] = await db
    .insert(links)
    .values({ originalUrl, shortUrl })
    .onConflictDoNothing()
    .returning();

  if (!link) {
    return { ok: false, error: "SHORT_URL_ALREADY_EXISTS" };
  }

  return { ok: true, link };
}
