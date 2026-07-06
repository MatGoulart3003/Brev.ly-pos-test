import { Button, Dialog, Portal } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useDeleteLinkConfirmation } from "./hooks/useDeleteLinkConfirmation";

export function DeleteLinkDialog() {
  const { t } = useTranslation();
  const { link, isOpen, isDeleting, close, confirmDeletion } =
    useDeleteLinkConfirmation();

  const shortLinkLabel = `${t("common.shortUrlPrefix")}${link?.shortUrl ?? ""}`;

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={({ open }) => {
        if (!open) {
          close();
        }
      }}
      role="alertdialog"
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title textStyle="lg" color="gray.600">
                {t("deleteLinkDialog.title")}
              </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body color="gray.500" textStyle="md" fontWeight="400">
              {t("deleteLinkDialog.description", {
                shortUrl: shortLinkLabel,
              })}
            </Dialog.Body>
            <Dialog.Footer>
              <Button variant="subtle" size="sm" onClick={close}>
                {t("deleteLinkDialog.cancel")}
              </Button>
              <Button
                size="sm"
                bg="danger"
                _hover={{ opacity: 0.9, bg: "danger" }}
                loading={isDeleting}
                onClick={confirmDeletion}
              >
                {t("deleteLinkDialog.confirm")}
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
