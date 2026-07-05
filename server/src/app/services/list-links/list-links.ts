import { count, desc } from "drizzle-orm";

import { db } from "../../../infra/db";
import { links } from "../../../infra/db/schemas/links";
import type { ListLinksInput, ListLinksResult } from "./types";

export async function listLinks(
  input: ListLinksInput,
): Promise<ListLinksResult> {
  const { page, pageSize } = input;

  const [rows, totalResult] = await Promise.all([
    db
      .select()
      .from(links)
      .orderBy(desc(links.createdAt))
      .limit(pageSize)
      .offset((page - 1) * pageSize),
    db.select({ total: count() }).from(links),
  ]);

  return { links: rows, total: totalResult[0]?.total ?? 0 };
}
