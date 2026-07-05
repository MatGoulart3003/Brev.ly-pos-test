import { api } from "../../lib/api";
import { linkByShortUrlEndpoint } from "../endpoints";
import type { GetLinkByShortUrlInput, GetLinkByShortUrlOutput } from "./types";

export async function getLinkByShortUrl(
  input: GetLinkByShortUrlInput,
): Promise<GetLinkByShortUrlOutput> {
  const response = await api.get<GetLinkByShortUrlOutput>(
    linkByShortUrlEndpoint(input.shortUrl),
  );
  return response.data;
}
