import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { ptBR } from "./locales/pt-br";

export const DEFAULT_LANGUAGE = "pt_BR";

i18n.use(initReactI18next).init({
  resources: {
    [DEFAULT_LANGUAGE]: { translation: ptBR },
  },
  lng: DEFAULT_LANGUAGE,
  fallbackLng: DEFAULT_LANGUAGE,
  interpolation: {
    // React already escapes rendered values
    escapeValue: false,
  },
});

export default i18n;
