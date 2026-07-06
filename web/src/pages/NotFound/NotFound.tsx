import { Heading } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

const HOME_ROUTE = "/";

const stylesheet = {
  page: "flex min-h-dvh items-center justify-center px-3 py-8",
  card: "flex w-full max-w-xl flex-col items-center gap-6 rounded-lg bg-gray-100 px-5 py-12 text-center md:px-12 md:py-16",
  graphic: "text-6xl font-extrabold leading-none text-blue-base",
  description: "text-sm leading-[18px] font-semibold text-gray-500",
  homeLink: "text-blue-base underline",
};

export function NotFound() {
  const { t } = useTranslation();

  return (
    <main className={stylesheet.page}>
      <div className={stylesheet.card}>
        <span className={stylesheet.graphic} aria-hidden>
          404
        </span>
        <Heading textStyle="xl" color="gray.600">
          {t("notFound.title")}
        </Heading>
        <p className={stylesheet.description}>
          {t("notFound.description")}{" "}
          <Link to={HOME_ROUTE} className={stylesheet.homeLink}>
            {t("notFound.homeLink")}
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
