import { useTranslation } from "react-i18next";
import { env } from "../../../lib/env";
import type { Link } from "../../../services/types";
import { useDeleteLinkDialogStore } from "../../../stores/useDeleteLinkDialogStore";
import { toaster } from "../../Toaster/Toaster";

export function useLinkItemActions(link: Link) {
  const { t } = useTranslation();
  const openDeleteDialog = useDeleteLinkDialogStore((state) => state.open);

  const shortLinkUrl = `${env.VITE_FRONTEND_URL}/${link.shortUrl}`;
  const shortLinkLabel = `${t("common.shortUrlPrefix")}${link.shortUrl}`;

  async function copyShortLink() {
    await navigator.clipboard.writeText(shortLinkUrl);
    toaster.success({
      title: t("linksList.toasts.copiedTitle"),
      description: t("linksList.toasts.copiedDescription", {
        shortUrl: shortLinkLabel,
      }),
    });
  }

  function requestDeletion() {
    openDeleteDialog(link);
  }

  return {
    shortLinkUrl,
    shortLinkLabel,
    copyShortLink,
    requestDeletion,
  };
}
