export const LINKS_ENDPOINT = "/links";
export const EXPORT_LINKS_ENDPOINT = `${LINKS_ENDPOINT}/export`;

export function linkByShortUrlEndpoint(shortUrl: string): string {
  return `${LINKS_ENDPOINT}/${shortUrl}`;
}

export function linkByIdEndpoint(id: string): string {
  return `${LINKS_ENDPOINT}/${id}`;
}

export function linkAccessEndpoint(id: string): string {
  return `${linkByIdEndpoint(id)}/access`;
}
