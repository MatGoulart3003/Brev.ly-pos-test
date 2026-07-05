import { randomUUID } from "node:crypto";

import { eq } from "drizzle-orm";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { db, pg } from "../../../infra/db";
import { links } from "../../../infra/db/schemas/links";
import { incrementLinkAccess } from "./increment-link-access";

describe("incrementLinkAccess", () => {
  let linkId: string;

  beforeAll(async () => {
    const [created] = await db
      .insert(links)
      .values({
        originalUrl: "https://example.com",
        shortUrl: `test-${randomUUID().slice(0, 8)}`,
      })
      .returning({ id: links.id });

    if (!created) throw new Error("failed to create test link");
    linkId = created.id;
  });

  afterAll(async () => {
    await db.delete(links).where(eq(links.id, linkId));
    await pg.end();
  });

  it("increments the access count", async () => {
    const first = await incrementLinkAccess({ id: linkId });
    const second = await incrementLinkAccess({ id: linkId });

    expect(first?.accessCount).toBe(1);
    expect(second?.accessCount).toBe(2);
  });

  it("returns null when the link does not exist", async () => {
    const result = await incrementLinkAccess({ id: randomUUID() });

    expect(result).toBeNull();
  });
});
