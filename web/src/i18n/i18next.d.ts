import type { ptBR } from "./locales/pt-br";

declare module "i18next" {
  interface CustomTypeOptions {
    resources: {
      translation: typeof ptBR;
    };
  }
}
