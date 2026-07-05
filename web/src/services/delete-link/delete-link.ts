import { api } from "../../lib/api";
import { linkByIdEndpoint } from "../endpoints";
import type { DeleteLinkInput } from "./types";

export async function deleteLink(input: DeleteLinkInput): Promise<void> {
  await api.delete(linkByIdEndpoint(input.id));
}
