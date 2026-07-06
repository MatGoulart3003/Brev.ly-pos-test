import { useTranslation } from "react-i18next";
import { PiLink } from "react-icons/pi";

const EMPTY_STATE_ICON_SIZE = 32;

const stylesheet = {
  container: "flex flex-col items-center gap-3 px-6 py-8 text-gray-400",
  message: "text-[10px] font-normal uppercase leading-[14px] text-gray-500",
};

export function EmptyState() {
  const { t } = useTranslation();

  return (
    <div className={stylesheet.container}>
      <PiLink size={EMPTY_STATE_ICON_SIZE} aria-hidden />
      <span className={stylesheet.message}>{t("linksList.empty")}</span>
    </div>
  );
}
