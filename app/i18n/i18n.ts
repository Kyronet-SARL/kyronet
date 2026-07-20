import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import fr from "./locales/fr.json";

export const LANG_STORAGE_KEY = "kyronet-lang";

function getInitialLanguage(): "fr" | "en" {
  // Côté serveur (SSR), pas de localStorage : on rend en FR par défaut.
  if (typeof window === "undefined") return "fr";

  try {
    const stored = window.localStorage.getItem(LANG_STORAGE_KEY);
    if (stored === "fr" || stored === "en") return stored;
  } catch {
    /* localStorage indisponible (navigation privée, etc.) : on ignore */
  }

  return "fr";
}

void i18n.use(initReactI18next).init({
  resources: {
    fr: { translation: fr },
    en: { translation: en },
  },
  lng: getInitialLanguage(),
  fallbackLng: "fr",
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
});

export default i18n;