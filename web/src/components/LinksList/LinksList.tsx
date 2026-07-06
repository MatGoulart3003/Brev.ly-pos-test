import { Button, Heading, Spinner } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { PiDownloadSimple } from "react-icons/pi";
import { DeleteLinkDialog } from "../DeleteLinkDialog/DeleteLinkDialog";
import { EmptyState } from "../EmptyState/EmptyState";
import { LinkItem } from "../LinkItem/LinkItem";
import { useDownloadLinksReport } from "./hooks/useDownloadLinksReport";
import { useLinksList } from "./hooks/useLinksList";

const stylesheet = {
  card: "flex w-full flex-col gap-4 rounded-lg bg-gray-100 p-6 md:p-8",
  header: "flex items-center justify-between",
  list: "flex max-h-96 flex-col divide-y divide-gray-200 overflow-y-auto lg:max-h-[500px]",
  loadingRow: "flex items-center justify-center gap-2 py-8 text-gray-500",
  loadingMessage: "text-xs uppercase leading-4",
  sentinel: "h-px",
};

export function LinksList() {
  const { t } = useTranslation();
  const { links, isLoading, isEmpty, isFetchingNextPage, sentinelRef } =
    useLinksList();
  const { downloadReport, isExporting } = useDownloadLinksReport();

  return (
    <section className={stylesheet.card}>
      <header className={stylesheet.header}>
        <Heading textStyle="lg" color="gray.600">
          {t("linksList.title")}
        </Heading>
        <Button
          variant="subtle"
          size="sm"
          onClick={downloadReport}
          loading={isExporting}
          disabled={isLoading || isEmpty}
        >
          <PiDownloadSimple />
          {t("linksList.downloadCsv")}
        </Button>
      </header>

      {isLoading && (
        <div className={stylesheet.loadingRow}>
          <Spinner size="sm" color="primary" />
          <span className={stylesheet.loadingMessage}>
            {t("linksList.loading")}
          </span>
        </div>
      )}

      {isEmpty && <EmptyState />}

      {!isLoading && !isEmpty && (
        <ul className={stylesheet.list}>
          {links.map((link) => (
            <LinkItem key={link.id} link={link} />
          ))}
          <div ref={sentinelRef} className={stylesheet.sentinel} aria-hidden />
          {isFetchingNextPage && (
            <div className={stylesheet.loadingRow}>
              <Spinner size="sm" color="primary" />
            </div>
          )}
        </ul>
      )}

      <DeleteLinkDialog />
    </section>
  );
}
