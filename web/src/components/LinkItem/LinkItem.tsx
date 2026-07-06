import { IconButton } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { PiCopy, PiTrash } from "react-icons/pi";
import type { Link } from "../../services/types";
import { useLinkItemActions } from "./hooks/useLinkItemActions";

const stylesheet = {
  container: "flex items-center gap-4 py-4",
  urls: "flex min-w-0 flex-1 flex-col gap-1",
  shortLink:
    "truncate text-sm font-semibold leading-[18px] text-blue-base hover:underline",
  originalUrl: "truncate text-xs leading-4 text-gray-500",
  meta: "flex items-center gap-4",
  accessCount: "whitespace-nowrap text-xs leading-4 text-gray-500",
  actions: "flex items-center gap-1",
};

interface LinkItemProps {
  link: Link;
}

export function LinkItem({ link }: LinkItemProps) {
  const { t } = useTranslation();
  const { shortLinkUrl, shortLinkLabel, copyShortLink, requestDeletion } =
    useLinkItemActions(link);

  return (
    <li className={stylesheet.container}>
      <div className={stylesheet.urls}>
        <a href={shortLinkUrl} className={stylesheet.shortLink}>
          {shortLinkLabel}
        </a>
        <span className={stylesheet.originalUrl}>{link.originalUrl}</span>
      </div>
      <div className={stylesheet.meta}>
        <span className={stylesheet.accessCount}>
          {t("linksList.accessCount", { count: link.accessCount })}
        </span>
        <div className={stylesheet.actions}>
          <IconButton
            variant="subtle"
            size="sm"
            aria-label={t("linksList.copy")}
            onClick={copyShortLink}
          >
            <PiCopy />
          </IconButton>
          <IconButton
            variant="subtle"
            size="sm"
            aria-label={t("linksList.delete")}
            onClick={requestDeletion}
          >
            <PiTrash />
          </IconButton>
        </div>
      </div>
    </li>
  );
}
