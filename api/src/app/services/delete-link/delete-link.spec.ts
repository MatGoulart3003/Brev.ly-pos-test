import { randomUUID } from "node:crypto";

import { afterAll, describe, expect, it } from "vitest";

import { db, pg } from "../../../infra/db";
import { links } from "../../../infra/db/schemas/links";
import { deleteLink } from "./delete-link";

describe("deleteLink", () => {
  afterAll(async () => {
    await pg.end();
  });

  it("deletes an existing link and returns true", async () => {
    const [created] = await db
      .insert(links)
      .values({
        originalUrl: "https://example.com",
        shortUrl: `test-${randomUUID().slice(0, 8)}`,
      })
      .returning({ id: links.id });

    if (!created) throw new Error("failed to create test link");

    const deleted = await deleteLink({ id: created.id });

    expect(deleted).toBe(true);
  });

  it("returns false when the link does not exist", async () => {
    const deleted = await deleteLink({ id: randomUUID() });

    expect(deleted).toBe(false);
  });
});
