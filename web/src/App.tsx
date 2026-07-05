import { Button, Heading, Input } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

const stylesheet = {
  container: "flex min-h-dvh items-center justify-center p-3",
  card: "flex w-full max-w-sm flex-col gap-4 rounded-lg bg-gray-100 p-8",
};

// Temporary smoke test for the theme: replaced by the real pages in later steps.
export default function App() {
  const { t } = useTranslation();

  return (
    <main className={stylesheet.container}>
      <div className={stylesheet.card}>
        <Heading textStyle="lg">{t("createLinkForm.title")}</Heading>
        <Input
          size="xl"
          placeholder={t("createLinkForm.originalUrlPlaceholder")}
        />
        <Button size="xl">{t("createLinkForm.submit")}</Button>
        <Button variant="subtle" size="sm" alignSelf="flex-start">
          {t("linksList.downloadCsv")}
        </Button>
      </div>
    </main>
  );
}
