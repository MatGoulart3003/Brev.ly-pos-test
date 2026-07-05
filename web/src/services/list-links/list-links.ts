import { api } from "../../lib/api";
import { LINKS_ENDPOINT } from "../endpoints";
import type { ListLinksInput, ListLinksOutput } from "./types";

export async function listLinks(
  input: ListLinksInput,
): Promise<ListLinksOutput> {
  const response = await api.get<ListLinksOutput>(LINKS_ENDPOINT, {
    params: input,
  });
  return response.data;
}
