import { useMutation, useQueryClient } from "@tanstack/react-query";
import { linkKeys } from "../lib/query-keys";
import { createLink } from "../services/create-link/create-link";

export function useCreateLink() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: linkKeys.list() });
    },
  });
}
