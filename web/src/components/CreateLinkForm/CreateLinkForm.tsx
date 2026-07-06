import {
  Button,
  Field,
  Heading,
  Icon,
  Input,
  InputGroup,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { PiWarning } from "react-icons/pi";
import { useCreateLinkForm } from "./hooks/useCreateLinkForm";

/** Width reserved for the static "brev.ly/" prefix inside the short URL input. */
const SHORT_URL_PREFIX_PADDING = "16";

const stylesheet = {
  card: "flex w-full flex-col gap-5 rounded-lg bg-gray-100 p-6 lg:p-8",
  fields: "flex flex-col gap-4",
};

export function CreateLinkForm() {
  const { t } = useTranslation();
  const { form, handleSubmit, isSubmitting } = useCreateLinkForm();
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <form className={stylesheet.card} onSubmit={handleSubmit} noValidate>
      <Heading textStyle="lg" color="gray.600">
        {t("createLinkForm.title")}
      </Heading>

      <div className={stylesheet.fields}>
        <Field.Root invalid={Boolean(errors.originalUrl)}>
          <Field.Label textStyle="xs" color="gray.500">
            {t("createLinkForm.originalUrlLabel")}
          </Field.Label>
          <Input
            size="xl"
            type="url"
            placeholder={t("createLinkForm.originalUrlPlaceholder")}
            {...register("originalUrl")}
          />
          <Field.ErrorText textStyle="sm" textTransform="none" color="gray.500">
            <Icon color="danger" aria-hidden>
              <PiWarning />
            </Icon>
            {errors.originalUrl?.message}
          </Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={Boolean(errors.shortUrl)}>
          <Field.Label textStyle="xs" color="gray.500">
            {t("createLinkForm.shortUrlLabel")}
          </Field.Label>
          <InputGroup
            startElement={t("common.shortUrlPrefix")}
            startElementProps={{ color: "gray.400" }}
          >
            <Input
              size="xl"
              ps={SHORT_URL_PREFIX_PADDING}
              {...register("shortUrl")}
            />
          </InputGroup>
          <Field.ErrorText textStyle="sm" textTransform="none" color="gray.500">
            <Icon color="danger" aria-hidden>
              <PiWarning />
            </Icon>
            {errors.shortUrl?.message}
          </Field.ErrorText>
        </Field.Root>
      </div>

      <Button type="submit" size="xl" loading={isSubmitting}>
        {t("createLinkForm.submit")}
      </Button>
    </form>
  );
}
