import { randomUUID } from "node:crypto";

import { eq } from "drizzle-orm";
import { afterAll, describe, expect, it } from "vitest";

import { db, pg } from "../../../infra/db";
import { links } from "../../../infra/db/schemas/links";
import { createLink } from "./create-link";

describe("createLink", () => {
  const shortUrl = `test-${randomUUID().slice(0, 8)}`;

  afterAll(async () => {
    await db.delete(links).where(eq(links.shortUrl, shortUrl));
    await pg.end();
  });

  it("creates a link", async () => {
    const result = await createLink({
      originalUrl: "https://example.com",
      shortUrl,
    });

    expect(result.ok).toBe(true);

    if (result.ok) {
      expect(result.link.shortUrl).toBe(shortUrl);
      expect(result.link.accessCount).toBe(0);
      expect(result.link.id).toBeTruthy();
    }
  });

  it("does not create a link with an existing short url", async () => {
    const result = await createLink({
      originalUrl: "https://another.example.com",
      shortUrl,
    });

    expect(result).toEqual({ ok: false, error: "SHORT_URL_ALREADY_EXISTS" });
  });
});
