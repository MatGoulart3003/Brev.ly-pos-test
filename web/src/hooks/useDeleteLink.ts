import { useMutation, useQueryClient } from "@tanstack/react-query";
import { linkKeys } from "../lib/query-keys";
import { deleteLink } from "../services/delete-link/delete-link";

export function useDeleteLink() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLink,
    onSettled: () => {
      // Refetch even when the link was already gone (404): the list is stale either way.
      queryClient.invalidateQueries({ queryKey: linkKeys.list() });
    },
  });
}
