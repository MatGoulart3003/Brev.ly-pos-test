import { useTranslation } from "react-i18next";
import { useDeleteLink } from "../../../hooks/useDeleteLink";
import { useDeleteLinkDialogStore } from "../../../stores/useDeleteLinkDialogStore";
import { toaster } from "../../Toaster/Toaster";

export function useDeleteLinkConfirmation() {
  const { t } = useTranslation();
  const { link, close } = useDeleteLinkDialogStore();
  const deleteLink = useDeleteLink();

  async function confirmDeletion() {
    if (!link) {
      return;
    }

    try {
      await deleteLink.mutateAsync({ id: link.id });
      toaster.success({ title: t("linksList.toasts.deletedTitle") });
    } catch {
      toaster.error({
        title: t("errors.genericTitle"),
        description: t("errors.genericDescription"),
      });
    } finally {
      close();
    }
  }

  return {
    link,
    isOpen: link !== null,
    isDeleting: deleteLink.isPending,
    close,
    confirmDeletion,
  };
}
