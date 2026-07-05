import type { Link } from "../types";

export interface CreateLinkInput {
  originalUrl: string;
  shortUrl: string;
}

export type CreateLinkOutput = Link;
