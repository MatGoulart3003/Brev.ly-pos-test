import { randomUUID } from "node:crypto";

import { eq } from "drizzle-orm";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { db, pg } from "../../../infra/db";
import { links } from "../../../infra/db/schemas/links";
import { getLinkByShortUrl } from "./get-link-by-short-url";

describe("getLinkByShortUrl", () => {
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

  it("returns the link for an existing short url", async () => {
    const link = await getLinkByShortUrl({ shortUrl });

    expect(link).not.toBeNull();
    expect(link?.originalUrl).toBe("https://example.com");
  });

  it("returns null for an unknown short url", async () => {
    const link = await getLinkByShortUrl({ shortUrl: "does-not-exist" });

    expect(link).toBeNull();
  });
});
