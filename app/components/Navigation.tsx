import { useState, useEffect, useMemo } from "react";
import {  Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import KyronetIcone from "../asset/kyronet_icon.png"
import { LANG_STORAGE_KEY } from "../i18n/i18n";

export default function Navigation() {
  const { t, i18n } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const links = useMemo(
    () => [
      { label: t("navigation.about"), id: "about" },
      { label: t("navigation.services"), id: "services" },
      { label: t("navigation.projects"), id: "projects" },
      { label: t("navigation.process"), id: "process" },
       { label: t("navigation.clients"), id: "clients" },
      { label: t("navigation.testimonials"), id: "testimonials" },
      { label: t("navigation.faq"), id: "faq" },
    ],
    [t],
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const setLanguage = (lng: "fr" | "en") => {
    void i18n.changeLanguage(lng).then(() => {
      try {
        localStorage.setItem(LANG_STORAGE_KEY, lng);
      } catch {
        /* ignore */
      }
    });
  };

  const langIs = (lng: "fr" | "en") => i18n.language.startsWith(lng);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });

      setMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-700
        ${
          scrolled
            ? "bg-white/80 backdrop-blur-2xl border-b border-black/10 py-4"
            : "bg-transparent  py-6"
        }
      `}
    >

      {/* GLOW BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden -z-10">

        <div
          className={`
            absolute top-[-120px] left-[10%]
            w-[350px] h-[350px]
            rounded-full blur-[120px]
            transition-all duration-700
            ${
              scrolled
                ? "bg-black/5"
                : ""
            }
          `}
        />

        <div
          className={`
            absolute top-[-100px] right-[10%]
            w-[300px] h-[300px]
            rounded-full blur-[120px]
            transition-all duration-700
            ${
              scrolled
                ? "bg-blue-500/5"
                : "bg-white/10"
            }
          `}
        />

      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <div className="flex items-center justify-between">

          {/* LOGO */}
          <button
            onClick={() => scrollToSection("home")}
            className="flex items-center gap-4 group"
          >

            <div
              className={`
                w-16 h-16 rounded-2xl
                flex items-center justify-center
                border transition-all duration-700 bg-black  border-black/10"
                
              `}
            >
              <img src={KyronetIcone} alt={t("navigation.logoAlt")} className="w-10 h-10"  />
            </div>
          </button>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex items-center gap-10">

            {links.map((link, i) => (
              <button
                key={i}
                onClick={() => scrollToSection(link.id)}
                className={`
                  text-lg relative font-extralight leading-[1.05] tracking-[-0.04em] transition-all duration-500
                  hover:opacity-100
                  ${
                    scrolled
                      ? "text-black/60 hover:text-black"
                      : "text-white hover:text-white"
                  }
                `}
              >
                {link.label}
              </button>
            ))}

            {/* Langue */}
            <div
              className={`
                flex items-center rounded-full p-0.5
                ${
                  scrolled
                    ? "border border-black/15 bg-black/[0.03]"
                    : "border border-white/25 bg-white/10"
                }
              `}
              role="group"
              aria-label={t("navigation.languageGroup")}
            >
              {(["fr", "en"] as const).map((lng) => (
                <button
                  key={lng}
                  type="button"
                  aria-pressed={langIs(lng)}
                  onClick={() => setLanguage(lng)}
                  className={`
                    px-3 py-1.5 rounded-full text-xs font-medium uppercase tracking-wide transition-all duration-500
                    ${
                      langIs(lng)
                        ? scrolled
                          ? "bg-black text-white"
                          : "bg-white text-black"
                        : scrolled
                          ? "text-black/50 hover:text-black"
                          : "text-white/65 hover:text-white"
                    }
                  `}
                >
                  {lng === "fr" ? t("navigation.langFr") : t("navigation.langEn")}
                </button>
              ))}
            </div>

            {/* CTA */}
            <button
              onClick={() => scrollToSection("contact")}
              className={`
                px-6 py-3 rounded-full
                transition-all duration-700
                ${
                  scrolled
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }
              `}
            >
              {t("navigation.cta")}
            </button>
          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`
              lg:hidden w-11 h-11 rounded-xl
              flex items-center justify-center
              transition-all duration-700
              ${
                scrolled
                  ? "bg-black text-white"
                  : "bg-white/10 text-white border border-white/10"
              }
            `}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>

        </div>

        {/* MOBILE MENU */}
        <div
          className={`
            lg:hidden overflow-hidden
            transition-all duration-700
            ${
              mobileMenuOpen
                ? "max-h-[600px] opacity-100 mt-6"
                : "max-h-0 opacity-0"
            }
          `}
        >

          <div
            className={`
              rounded-3xl p-6 space-y-5
              backdrop-blur-2xl border
              transition-all duration-700
              ${
                scrolled
                  ? "bg-white/90 border-black/10"
                  : "bg-black/70 border-white/10"
              }
            `}
          >

            {links.map((link, i) => (
              <button
                key={i}
                onClick={() => scrollToSection(link.id)}
                className={`
                  block w-full text-left transition
                  ${
                    scrolled
                      ? "text-black/70 hover:text-black"
                      : "text-white/70 hover:text-white"
                  }
                `}
              >
                {link.label}
              </button>
            ))}

            <div
              className={`
                flex items-center justify-center gap-2 rounded-2xl p-1
                ${
                  scrolled
                    ? "border border-black/10 bg-black/[0.03]"
                    : "border border-white/15 bg-white/5"
                }
              `}
              role="group"
              aria-label={t("navigation.languageGroup")}
            >
              {(["fr", "en"] as const).map((lng) => (
                <button
                  key={lng}
                  type="button"
                  aria-pressed={langIs(lng)}
                  onClick={() => setLanguage(lng)}
                  className={`
                    flex-1 py-2 rounded-xl text-sm font-medium uppercase tracking-wide transition-all duration-500
                    ${
                      langIs(lng)
                        ? scrolled
                          ? "bg-black text-white"
                          : "bg-white text-black"
                        : scrolled
                          ? "text-black/50"
                          : "text-white/65"
                    }
                  `}
                >
                  {lng === "fr" ? t("navigation.langFr") : t("navigation.langEn")}
                </button>
              ))}
            </div>

            <button
              onClick={() => scrollToSection("contact")}
              className={`
                w-full py-3 rounded-2xl mt-4
                transition-all duration-700
                ${
                  scrolled
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }
              `}
            >
              {t("navigation.cta")}
            </button>

          </div>

        </div>

      </div>
    </nav>
  );
}