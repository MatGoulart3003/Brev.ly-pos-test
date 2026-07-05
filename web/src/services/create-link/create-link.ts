import { api } from "../../lib/api";
import { LINKS_ENDPOINT } from "../endpoints";
import type { CreateLinkInput, CreateLinkOutput } from "./types";

export async function createLink(
  input: CreateLinkInput,
): Promise<CreateLinkOutput> {
  const response = await api.post<CreateLinkOutput>(LINKS_ENDPOINT, input);
  return response.data;
}
