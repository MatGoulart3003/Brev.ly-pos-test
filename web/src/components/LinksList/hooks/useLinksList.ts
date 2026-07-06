import { useEffect, useMemo, useRef } from "react";
import { useLinks } from "../../../hooks/useLinks";

export function useLinksList() {
  const linksQuery = useLinks();
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const { fetchNextPage, hasNextPage, isFetchingNextPage } = linksQuery;

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      const isSentinelVisible = entries.some((entry) => entry.isIntersecting);

      if (isSentinelVisible && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    });

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const links = useMemo(
    () => linksQuery.data?.pages.flatMap((page) => page.links) ?? [],
    [linksQuery.data],
  );

  return {
    links,
    isLoading: linksQuery.isLoading,
    hasError: linksQuery.isError,
    isEmpty: !linksQuery.isLoading && !linksQuery.isError && links.length === 0,
    isFetchingNextPage,
    sentinelRef,
  };
}
