import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Hom from "../asset/Projet/Hom.png";
import HotelPro from "../asset/Projet/HotelPro.png";

type ProjectCopy = { title: string; category: string; description: string };

const projectExtras = [
  { year: "2025", lien: "https://www.hoom.space/", image: Hom },
  { year: "2026", image: HotelPro },
] as const;

function Project() {
  const { t } = useTranslation("common");
  const rawItems = t("project.items", { returnObjects: true });
  const copyItems: ProjectCopy[] = Array.isArray(rawItems)
    ? (rawItems as ProjectCopy[])
    : [];

  /** Toujours une entrée par carte (image + année) : les textes viennent des locales quand présents. */
  const projects = projectExtras.map((extra, i) => {
    const copy = copyItems[i];
    return {
      title: copy?.title ?? "",
      category: copy?.category ?? "",
      description: copy?.description ?? "",
      ...extra,
    };
  });

  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef<number | null>(null);

  const count = projects.length;
  const safeCount = count > 0 ? count : 1;

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % safeCount);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? safeCount - 1 : prev - 1));
  };

  useEffect(() => {
    if (count < 2) return;

    timeoutRef.current = window.setTimeout(() => {
      setCurrent((prev) => (prev + 1) % safeCount);
    }, 6000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [current, count, safeCount]);

  return (
    <section
      id="projects"
      className="relative py-32 bg-white text-black overflow-x-clip"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-black/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-200px] right-[-200px] w-[600px] h-[600px] bg-black/5 rounded-full blur-[160px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-black/5 rounded-full blur-[200px]" />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto mb-24 px-6">
        <span className="uppercase tracking-[0.35em] text-xs text-black/50">
          {t("project.eyebrow")}
        </span>

        <h2 className="mt-6 text-5xl md:text-7xl font-extralight leading-[1.05] tracking-[-0.05em]">
          {t("project.titleLine1")}
          <br />
          <span className="font-normal">{t("project.titleLine2")}</span>
        </h2>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        <div className="overflow-hidden rounded-[2rem]">
          <div
            className="flex transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              width: `${safeCount * 100}%`,
              transform: `translateX(-${(current * 100) / safeCount}%)`,
            }}
          >
            {projects.map((p, i) => (
              <div
                key={i}
                className="box-border min-w-0 shrink-0 flex flex-col lg:flex-row items-center gap-14 lg:gap-24"
                style={{ width: `${100 / safeCount}%` }}
              >
                <div className="relative flex-1 w-full">
                  <div className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-black/5 blur-[120px] scale-110" />

                  <div className="overflow-hidden rounded-[2rem]">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="
                        w-full
                        h-[320px] md:h-[500px]
                        object-cover
                        hover:scale-105
                        transition duration-[1800ms]
                      "
                    />
                  </div>
                </div>

                <div className="relative z-10 flex-1">
                  <div className="flex items-center gap-6 text-xs tracking-[0.3em] text-black/40 uppercase">
                    <span>{p.category}</span>

                    <span className="w-8 h-[1px] bg-black/20"></span>

                    <span>{p.year}</span>
                  </div>

                  <h3 className="mt-6 text-4xl md:text-6xl font-light tracking-[-0.04em] leading-[1.05]">
                    {p.title}
                  </h3>

                  <p className="mt-8 text-black/60 text-lg leading-relaxed max-w-xl">
                    {p.description}
                  </p>

                  {"lien" in p && p.lien ? (
                    <a
                      href={p.lien}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative z-10 mt-6 inline-flex flex-col items-start py-2 text-black no-underline"
                    >
                      <span className="text-sm font-medium uppercase tracking-[0.18em] text-black underline decoration-black/30 underline-offset-4 transition group-hover:decoration-black">
                        {t("project.viewProject")}
                      </span>

                      <div className="relative mt-3 h-px w-20 overflow-hidden bg-black/15">
                        <div className="absolute inset-0 origin-left scale-x-0 bg-black transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-x-100" />
                      </div>

                      <div className="pointer-events-none absolute -bottom-2 left-0 h-10 w-24 bg-black/[0.03] blur-2xl opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                    </a>
                  ) : (
                    <p className="relative z-10 mt-6 text-sm font-medium uppercase tracking-[0.18em] text-black/45">
                      {t("project.linkSoon")}
                    </p>
                  )}

                  <div className="mt-10 w-20 h-[1px] bg-black/20"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-50 isolate mt-14 flex pointer-events-auto touch-manipulation items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label={t("project.prev")}
              onClick={prevSlide}
              className="relative z-50 flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-full border border-black/15 bg-white text-black shadow-sm transition-all hover:bg-black hover:text-white md:h-14 md:w-14"
            >
              <ChevronLeft size={18} aria-hidden />
            </button>

            <button
              type="button"
              aria-label={t("project.next")}
              onClick={nextSlide}
              className="relative z-50 flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-full border border-black/15 bg-white text-black shadow-sm transition-all hover:bg-black hover:text-white md:h-14 md:w-14"
            >
              <ChevronRight size={18} aria-hidden />
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-2">
            {projects.map((_, i) => (
              <button
                type="button"
                key={i}
                aria-label={t("project.goToSlide", { n: i + 1 })}
                aria-pressed={current === i}
                onClick={() => setCurrent(i)}
                className="flex h-11 min-w-11 cursor-pointer items-center justify-center p-2"
              >
                <span
                  className={`block h-[3px] rounded-full transition-all duration-500 ${
                    current === i ? "w-12 bg-black" : "w-6 bg-black/25 hover:bg-black/45"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Project;
