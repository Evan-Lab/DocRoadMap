import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";

import en from "./eng/translation.json";
import fr from "./fr/translation.json";
import es from "./spanish/translation.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    fr: { translation: fr },
    es: { translation: es },
  },
  lng: Localization.locale.startsWith("fr")
    ? "fr"
    : Localization.locale.startsWith("es")
      ? "es"
      : "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
