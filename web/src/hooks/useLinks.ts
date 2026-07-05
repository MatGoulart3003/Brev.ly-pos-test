import { useInfiniteQuery } from "@tanstack/react-query";
import { linkKeys } from "../lib/query-keys";
import { listLinks } from "../services/list-links/list-links";
import type { ListLinksOutput } from "../services/list-links/types";

const PAGE_SIZE = 20;
const FIRST_PAGE = 1;

function countLoadedLinks(pages: ListLinksOutput[]): number {
  return pages.reduce((total, page) => total + page.links.length, 0);
}

export function useLinks() {
  return useInfiniteQuery({
    queryKey: linkKeys.list(),
    queryFn: ({ pageParam }) =>
      listLinks({ page: pageParam, pageSize: PAGE_SIZE }),
    initialPageParam: FIRST_PAGE,
    getNextPageParam: (lastPage, allPages) =>
      countLoadedLinks(allPages) < lastPage.total
        ? allPages.length + 1
        : undefined,
  });
}
