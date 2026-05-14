import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import KyronetIcone from "../asset/kyronet_icon.png";

const linkIds = [
  "about",
  "services",
  "projects",
  "process",
  "testimonials",
  "faq",
] as const;

function sectionTo(location: { pathname: string }, fragment: string) {
  const path = location.pathname === "/" ? "" : location.pathname;
  return `${path}#${fragment}`;
}

export default function Navigation() {
  const { t } = useTranslation("common");
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isEn =
    location.pathname === "/en" || location.pathname.startsWith("/en/");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const langToggleClass = `
    cursor-pointer text-xs font-medium uppercase tracking-widest px-3 py-2 rounded-full border transition no-underline
    ${
      scrolled
        ? "border-black/15 text-black hover:bg-black hover:text-white"
        : "border-white/25 text-white hover:bg-white hover:text-black"
    }
  `;

  const desktopNavLinkClass = `
    cursor-pointer text-lg relative font-extralight leading-[1.05] tracking-[-0.04em] transition-all duration-500 no-underline
    hover:opacity-100
    ${
      scrolled
        ? "text-black/60 hover:text-black"
        : "text-white hover:text-white"
    }
  `;

  return (
    <nav
      className={`
        pointer-events-auto fixed top-0 left-0 right-0 z-[100] isolate
        transition-all duration-700
        ${
          scrolled
            ? "bg-white/80 backdrop-blur-2xl border-b border-black/10 py-4"
            : "bg-transparent  py-6"
        }
      `}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
        <div
          className={`
            absolute top-[-120px] left-[10%]
            w-[350px] h-[350px]
            rounded-full blur-[120px]
            transition-all duration-700
            ${scrolled ? "bg-black/5" : ""}
          `}
        />

        <div
          className={`
            absolute top-[-100px] right-[10%]
            w-[300px] h-[300px]
            rounded-full blur-[120px]
            transition-all duration-700
            ${scrolled ? "bg-blue-500/5" : "bg-white/10"}
          `}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10">
        <div className="relative z-[110] flex w-full min-h-[3.25rem] items-center justify-between gap-4 pointer-events-auto touch-manipulation">
          <Link
            to={sectionTo(location, "home")}
            className="flex min-w-0 cursor-pointer items-center gap-4 group no-underline"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div
              className={`
                w-16 h-16 rounded-2xl
                flex items-center justify-center
                border transition-all duration-700 bg-black border-black/10
              `}
            >
              <img src={KyronetIcone} alt="Kyronet Icon" className="w-10 h-10" />
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {linkIds.map((id) => (
              <Link
                key={id}
                to={sectionTo(location, id)}
                className={desktopNavLinkClass}
                onClick={() => setMobileMenuOpen(false)}
              >
                {t(`nav.${id}`)}
              </Link>
            ))}

            <Link
              to={isEn ? "/" : "/en"}
              className={langToggleClass}
              aria-label={isEn ? t("nav.switchToFr") : t("nav.switchToEn")}
            >
              {isEn ? t("nav.langFr") : t("nav.langEn")}
            </Link>

            <Link
              to={sectionTo(location, "contact")}
              className={`
                cursor-pointer no-underline px-6 py-3 rounded-full
                transition-all duration-700
                ${
                  scrolled
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }
              `}
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("nav.contact")}
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`
              relative z-[120] shrink-0 lg:hidden
              flex h-12 w-12 cursor-pointer items-center justify-center rounded-xl
              transition-all duration-700 touch-manipulation
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

        <div
          className={`
            relative z-[105] lg:hidden overflow-hidden
            transition-all duration-700
            ${
              mobileMenuOpen
                ? "max-h-[500px] opacity-100 mt-6"
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
            {linkIds.map((id) => (
              <Link
                key={id}
                to={sectionTo(location, id)}
                className={`
                  block w-full cursor-pointer text-left transition no-underline
                  ${
                    scrolled
                      ? "text-black/70 hover:text-black"
                      : "text-white/70 hover:text-white"
                  }
                `}
                onClick={() => setMobileMenuOpen(false)}
              >
                {t(`nav.${id}`)}
              </Link>
            ))}

            <Link
              to={isEn ? "/" : "/en"}
              className={`block w-full cursor-pointer text-center py-3 rounded-2xl text-sm font-medium uppercase tracking-widest no-underline ${
                scrolled ? "bg-black/5 text-black border border-black/10" : "bg-white/10 text-white border border-white/10"
              }`}
              onClick={() => setMobileMenuOpen(false)}
              aria-label={isEn ? t("nav.switchToFr") : t("nav.switchToEn")}
            >
              {isEn ? t("nav.langFr") : t("nav.langEn")}
            </Link>

            <Link
              to={sectionTo(location, "contact")}
              className={`
                block w-full text-center cursor-pointer no-underline py-3 rounded-2xl mt-4
                transition-all duration-700
                ${
                  scrolled
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }
              `}
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("nav.contact")}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
