import { api } from "../../lib/api";
import { EXPORT_LINKS_ENDPOINT } from "../endpoints";
import type { ExportLinksOutput } from "./types";

export async function exportLinks(): Promise<ExportLinksOutput> {
  const response = await api.post<ExportLinksOutput>(EXPORT_LINKS_ENDPOINT);
  return response.data;
}
