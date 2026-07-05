import { randomUUID } from "node:crypto";

import { eq } from "drizzle-orm";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { db, pg } from "../../../infra/db";
import { links } from "../../../infra/db/schemas/links";
import { listLinks } from "./list-links";

describe("listLinks", () => {
  const shortUrl = `test-${randomUUID().slice(0, 8)}`;

  beforeAll(async () => {
    await db
      .insert(links)
      .values({ originalUrl: "https://example.com", shortUrl });
  });

  afterAll(async () => {
    await db.delete(links).where(eq(links.shortUrl, shortUrl));
    await pg.end();
  });

  it("lists links with pagination data", async () => {
    const result = await listLinks({ page: 1, pageSize: 10 });

    expect(result.total).toBeGreaterThanOrEqual(1);
    expect(result.links.length).toBeGreaterThanOrEqual(1);
    expect(result.links.length).toBeLessThanOrEqual(10);
    expect(result.links.some((link) => link.shortUrl === shortUrl)).toBe(true);
  });
});
