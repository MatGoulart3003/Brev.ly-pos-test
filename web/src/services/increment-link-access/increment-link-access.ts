import { api } from "../../lib/api";
import { linkAccessEndpoint } from "../endpoints";
import type {
  IncrementLinkAccessInput,
  IncrementLinkAccessOutput,
} from "./types";

export async function incrementLinkAccess(
  input: IncrementLinkAccessInput,
): Promise<IncrementLinkAccessOutput> {
  const response = await api.patch<IncrementLinkAccessOutput>(
    linkAccessEndpoint(input.id),
  );
  return response.data;
}
