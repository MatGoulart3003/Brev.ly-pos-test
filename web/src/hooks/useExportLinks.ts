import { useMutation } from "@tanstack/react-query";
import { exportLinks } from "../services/export-links/export-links";

export function useExportLinks() {
  return useMutation({
    mutationFn: exportLinks,
  });
}
