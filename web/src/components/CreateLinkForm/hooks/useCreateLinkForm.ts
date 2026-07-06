import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { useCreateLink } from "../../../hooks/useCreateLink";
import { toaster } from "../../Toaster/Toaster";

/** Mirrors the API validation in server/src/app/services/create-link/types.ts */
const SHORT_URL_MIN_LENGTH = 3;
const SHORT_URL_MAX_LENGTH = 30;
const SHORT_URL_PATTERN = /^[a-z0-9-]+$/;
const HTTP_STATUS_CONFLICT = 409;

export function useCreateLinkForm() {
  const { t } = useTranslation();
  const createLink = useCreateLink();

  const schema = useMemo(
    () =>
      z.object({
        originalUrl: z.url(t("createLinkForm.errors.invalidUrl")),
        shortUrl: z
          .string()
          .min(SHORT_URL_MIN_LENGTH, t("createLinkForm.errors.invalidShortUrl"))
          .max(SHORT_URL_MAX_LENGTH, t("createLinkForm.errors.invalidShortUrl"))
          .regex(SHORT_URL_PATTERN, t("createLinkForm.errors.invalidShortUrl")),
      }),
    [t],
  );

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { originalUrl: "", shortUrl: "" },
  });

  const handleSubmit = form.handleSubmit(async (values) => {
    try {
      await createLink.mutateAsync(values);
      form.reset();
      toaster.success({ title: t("createLinkForm.toasts.createdTitle") });
    } catch (error) {
      const isDuplicate =
        isAxiosError(error) && error.response?.status === HTTP_STATUS_CONFLICT;

      if (isDuplicate) {
        form.setError("shortUrl", {
          message: t("createLinkForm.toasts.duplicateDescription"),
        });
        toaster.error({
          title: t("createLinkForm.toasts.duplicateTitle"),
          description: t("createLinkForm.toasts.duplicateDescription"),
        });
        return;
      }

      toaster.error({
        title: t("errors.genericTitle"),
        description: t("errors.genericDescription"),
      });
    }
  });

  return {
    form,
    handleSubmit,
    isSubmitting: createLink.isPending,
  };
}
