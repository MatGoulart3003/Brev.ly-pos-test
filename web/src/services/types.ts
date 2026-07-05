/** Shared shape returned by the links API. */
export interface Link {
  id: string;
  originalUrl: string;
  shortUrl: string;
  accessCount: number;
  /** ISO date string on the wire */
  createdAt: string;
}
