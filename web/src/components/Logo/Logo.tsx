import { useTranslation } from "react-i18next";
import { PiLinkBold } from "react-icons/pi";

const LOGO_ICON_SIZE = 24;

const stylesheet = {
  container: "flex items-center gap-2 text-blue-base",
  wordmark: "text-2xl font-extrabold leading-none",
};

export function Logo() {
  const { t } = useTranslation();

  return (
    <div className={stylesheet.container}>
      <PiLinkBold size={LOGO_ICON_SIZE} aria-hidden />
      <span className={stylesheet.wordmark}>{t("common.brand")}</span>
    </div>
  );
}
