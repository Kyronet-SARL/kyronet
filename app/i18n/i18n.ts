import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import frCommon from "../locales/fr/common.json";
import enCommon from "../locales/en/common.json";
import type { Locale } from "./locale";

const resources = {
  fr: { common: frCommon },
  en: { common: enCommon },
} as const;

let initPromise: Promise<void> | null = null;

function ensureI18nInit(): Promise<void> {
  if (i18next.isInitialized) {
    return Promise.resolve();
  }
  if (!initPromise) {
    i18next.use(initReactI18next);
    initPromise = i18next
      .init({
        lng: "fr",
        fallbackLng: "fr",
        supportedLngs: ["fr", "en"],
        ns: ["common"],
        defaultNS: "common",
        resources: resources as never,
        interpolation: { escapeValue: false },
        react: { useSuspense: false },
      })
      .then(() => undefined);
  }
  return initPromise;
}

export async function setServerLocale(locale: Locale): Promise<void> {
  await ensureI18nInit();
  await i18next.changeLanguage(locale);
}

export default i18next;
