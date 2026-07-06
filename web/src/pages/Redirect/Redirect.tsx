import { Heading } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { PiLinkBold } from "react-icons/pi";
import { useParams } from "react-router";
import { NotFound } from "../NotFound/NotFound";
import { useRedirectToOriginalUrl } from "./hooks/useRedirectToOriginalUrl";

const REDIRECT_ICON_SIZE = 40;

const stylesheet = {
  page: "flex min-h-dvh items-center justify-center px-3 py-8",
  card: "flex w-full max-w-xl flex-col items-center gap-6 rounded-lg bg-gray-100 px-5 py-12 text-center md:px-12 md:py-16",
  icon: "text-blue-base",
  description: "text-sm leading-[18px] font-semibold text-gray-500",
  fallbackLink: "text-blue-base underline",
};

export function Redirect() {
  const { t } = useTranslation();
  const { shortUrl } = useParams<{ shortUrl: string }>();
  const { originalUrl, isNotFound } = useRedirectToOriginalUrl(shortUrl ?? "");

  if (isNotFound) {
    return <NotFound />;
  }

  return (
    <main className={stylesheet.page}>
      <div className={stylesheet.card}>
        <span className={stylesheet.icon}>
          <PiLinkBold size={REDIRECT_ICON_SIZE} aria-hidden />
        </span>
        <Heading textStyle="xl" color="gray.600">
          {t("redirect.title")}
        </Heading>
        <div className={stylesheet.description}>
          <p>{t("redirect.description")}</p>
          {originalUrl && (
            <p>
              {t("redirect.fallback")}{" "}
              <a href={originalUrl} className={stylesheet.fallbackLink}>
                {t("redirect.fallbackLink")}
              </a>
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
