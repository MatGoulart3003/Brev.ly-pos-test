import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { linkKeys } from "../../../lib/query-keys";
import { sleep } from "../../../lib/sleep";
import { getLinkByShortUrl } from "../../../services/get-link-by-short-url/get-link-by-short-url";
import { incrementLinkAccess } from "../../../services/increment-link-access/increment-link-access";

/** Redirect anyway if the access-count increment hangs; the count is best-effort. */
const INCREMENT_TIMEOUT_MS = 2000;

export function useRedirectToOriginalUrl(shortUrl: string) {
  const linkQuery = useQuery({
    queryKey: linkKeys.byShortUrl(shortUrl),
    queryFn: () => getLinkByShortUrl({ shortUrl }),
    retry: false,
    staleTime: Number.POSITIVE_INFINITY,
  });

  // Ref guard: StrictMode re-runs effects in dev, which would double-count the
  // access and call location.replace twice. Refs survive the simulated remount.
  const hasRedirected = useRef(false);
  const link = linkQuery.data;

  useEffect(() => {
    if (!link || hasRedirected.current) {
      return;
    }
    hasRedirected.current = true;

    // The PATCH must settle BEFORE location.replace: unloading the page
    // cancels in-flight requests and the increment would be lost.
    Promise.race([
      incrementLinkAccess({ id: link.id }).catch(() => undefined),
      sleep(INCREMENT_TIMEOUT_MS),
    ]).then(() => {
      window.location.replace(link.originalUrl);
    });
  }, [link]);

  return {
    originalUrl: link?.originalUrl ?? null,
    isNotFound: linkQuery.isError,
  };
}
