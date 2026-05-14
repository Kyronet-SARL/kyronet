import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
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

  if (
    import.meta.env.DEV &&
    copyItems.length > 0 &&
    copyItems.length !== projectExtras.length
  ) {
    console.warn(
      `[project] project.items (${copyItems.length}) ne correspond pas à projectExtras (${projectExtras.length}).`,
    );
  }

  const projects = projectExtras.map((extra, i) => {
    const copy = copyItems[i];
    return {
      title: copy?.title ?? "",
      category: copy?.category ?? "",
      description: copy?.description ?? "",
      ...extra,
    };
  });

  const count = projects.length;
  const safeCount = count > 0 ? count : 1;

  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [current, setCurrent] = useState(0);
  const currentRef = useRef(0);
  currentRef.current = current;

  const scrollToIndex = useCallback(
    (index: number, smooth: boolean) => {
      const root = scrollerRef.current;
      if (!root || safeCount < 1) return;
      const w = root.clientWidth;
      if (w <= 0) return;
      const clamped = ((index % safeCount) + safeCount) % safeCount;
      const left = clamped * w;
      if (smooth) {
        root.scrollTo({ left, behavior: "smooth" });
      } else {
        root.scrollLeft = left;
      }
      setCurrent(clamped);
    },
    [safeCount],
  );

  useLayoutEffect(() => {
    const root = scrollerRef.current;
    if (!root) return;
    const sync = () => {
      const w = root.clientWidth;
      if (w <= 0) return;
      root.scrollLeft = currentRef.current * w;
    };
    sync();
    const ro = new ResizeObserver(() => {
      requestAnimationFrame(sync);
    });
    ro.observe(root);
    return () => ro.disconnect();
  }, [safeCount]);

  useEffect(() => {
    if (safeCount < 2) return;
    const id = window.setTimeout(() => {
      scrollToIndex(currentRef.current + 1, true);
    }, 6000);
    return () => window.clearTimeout(id);
  }, [current, safeCount, scrollToIndex]);

  const onScrollSnap = () => {
    const root = scrollerRef.current;
    if (!root) return;
    const w = root.clientWidth;
    if (w <= 0) return;
    const idx = Math.round(root.scrollLeft / w);
    const clamped = Math.max(0, Math.min(safeCount - 1, idx));
    if (clamped !== currentRef.current) setCurrent(clamped);
  };

  return (
    <section
      id="projects"
      className="relative overflow-x-visible py-32 bg-white text-black"
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
        <div
          ref={scrollerRef}
          onScroll={onScrollSnap}
          className="
            grid w-full snap-x snap-mandatory overflow-x-auto overflow-y-hidden
            rounded-[2rem] [-webkit-overflow-scrolling:touch] [grid-auto-flow:column]
            [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
          "
          style={{ gridAutoColumns: "100%" }}
        >
          {projects.map((p, i) => (
            <article
              key={i}
              className="box-border flex min-w-0 snap-start flex-col items-center gap-14 lg:flex-row lg:gap-24"
            >
              <div className="relative w-full flex-1">
                <div className="pointer-events-none absolute inset-0 -z-10 scale-110 rounded-full bg-black/5 blur-[120px]" />

                <div className="overflow-hidden rounded-[2rem]">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="
                      h-[320px] w-full object-cover
                      transition duration-[1800ms]
                      hover:scale-105
                      md:h-[500px]
                    "
                  />
                </div>
              </div>

              <div className="relative z-10 w-full flex-1">
                <div className="flex items-center gap-6 text-xs uppercase tracking-[0.3em] text-black/40">
                  <span>{p.category}</span>
                  <span className="h-[1px] w-8 bg-black/20" />
                  <span>{p.year}</span>
                </div>

                <h3 className="mt-6 text-4xl font-light leading-[1.05] tracking-[-0.04em] md:text-6xl">
                  {p.title}
                </h3>

                <p className="mt-8 max-w-xl text-lg leading-relaxed text-black/60">
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

                    <div className="pointer-events-none absolute -bottom-2 left-0 h-10 w-24 bg-black/[0.03] opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100" />
                  </a>
                ) : (
                  <p className="relative z-10 mt-6 text-sm font-medium uppercase tracking-[0.18em] text-black/45">
                    {t("project.linkSoon")}
                  </p>
                )}

                <div className="mt-10 h-[1px] w-20 bg-black/20" />
              </div>
            </article>
          ))}
        </div>

        <div className="relative z-50 mt-14 flex touch-manipulation items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label={t("project.prev")}
              onClick={() => scrollToIndex(current - 1, true)}
              className="relative z-50 flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-full border border-black/15 bg-white text-black shadow-sm transition-all hover:bg-black hover:text-white md:h-14 md:w-14"
            >
              <ChevronLeft size={18} aria-hidden />
            </button>

            <button
              type="button"
              aria-label={t("project.next")}
              onClick={() => scrollToIndex(current + 1, true)}
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
                onClick={() => scrollToIndex(i, true)}
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
