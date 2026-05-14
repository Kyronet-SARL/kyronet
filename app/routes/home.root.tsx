import { I18nextProvider } from "react-i18next";
import AboutUs from "../components/about";
import Contact from "../components/Contact";
import FAQ from "../components/FAQ";
import Hero from "../components/Hero";
import Navigation from "../components/Navigation";
import Partenaire from "../components/partenaire";
import Process from "../components/Process";
import Project from "../components/project";
import ServicesStacked from "../components/Services";
import Testimonials from "../components/Testimonials";
import i18n, { setServerLocale } from "../i18n/i18n";
import { getLocaleFromPathname } from "../i18n/locale";
import enCommon from "../locales/en/common.json";
import frCommon from "../locales/fr/common.json";
import type { Route } from "./+types/home.root";

export async function loader({ request }: Route.LoaderArgs) {
  const locale = getLocaleFromPathname(new URL(request.url).pathname);
  await setServerLocale(locale);
  return { locale };
}

export function meta({ data }: Route.MetaArgs) {
  const locale = data?.locale === "en" ? "en" : "fr";
  const bundle = locale === "en" ? enCommon : frCommon;
  return [
    { title: bundle.meta.title },
    { name: "description", content: bundle.meta.description },
  ];
}

export default function Home() {
  return (
    <I18nextProvider i18n={i18n}>
      <div className="bg-white">
        <Navigation />
        <Hero />
        <Partenaire />
        <AboutUs />
        <ServicesStacked />
        <Project />
        <Process />
        <Testimonials />
        <FAQ />
        <Contact />
      </div>
    </I18nextProvider>
  );
}
