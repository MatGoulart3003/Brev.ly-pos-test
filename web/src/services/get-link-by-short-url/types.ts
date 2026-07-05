import type { Link } from "../types";

export interface GetLinkByShortUrlInput {
  shortUrl: string;
}

export type GetLinkByShortUrlOutput = Link;
