export const linkKeys = {
  all: ["links"] as const,
  list: () => [...linkKeys.all, "list"] as const,
  byShortUrl: (shortUrl: string) =>
    [...linkKeys.all, "by-short-url", shortUrl] as const,
};
