import type { Link } from "../types";

export interface ListLinksInput {
  page: number;
  pageSize: number;
}

export interface ListLinksOutput {
  links: Link[];
  total: number;
}
