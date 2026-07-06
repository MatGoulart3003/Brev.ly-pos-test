import { useTranslation } from "react-i18next";
import { useExportLinks } from "../../../hooks/useExportLinks";
import { toaster } from "../../Toaster/Toaster";

const REPORT_WINDOW_TARGET = "_blank";
const REPORT_WINDOW_FEATURES = "noopener";

export function useDownloadLinksReport() {
  const { t } = useTranslation();
  const exportLinks = useExportLinks();

  async function downloadReport() {
    try {
      const { reportUrl } = await exportLinks.mutateAsync();
      window.open(reportUrl, REPORT_WINDOW_TARGET, REPORT_WINDOW_FEATURES);
    } catch {
      toaster.error({
        title: t("errors.genericTitle"),
        description: t("errors.genericDescription"),
      });
    }
  }

  return {
    downloadReport,
    isExporting: exportLinks.isPending,
  };
}
