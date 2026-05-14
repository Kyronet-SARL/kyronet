import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  Network,
  Server,
  ShieldCheck,
  Cloud,
  Database,
  Code,
  GraduationCap,
} from "lucide-react";

const SERVICE_KEYS = [
  "office",
  "managed",
  "netsec",
  "cloud",
  "backup",
  "devdb",
  "training",
] as const;

const SERVICE_ICONS = [
  Network,
  Server,
  ShieldCheck,
  Cloud,
  Database,
  Code,
  GraduationCap,
] as const;

export default function ServicesStacked() {
  const { t } = useTranslation();

  const services = useMemo(
    () =>
      SERVICE_KEYS.map((key, i) => ({
        icon: SERVICE_ICONS[i],
        title: t(`services.items.${key}.title`),
        description: t(`services.items.${key}.description`),
      })),
    [t],
  );

  return (
    <section
      id="services"
      className="relative bg-lime-300 text-black my-5 py-5 md:mx-10 mx-5 rounded-3xl"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-3 gap-20">

        {/* LEFT STICKY */}
        <div className="lg:sticky lg:top-32 h-fit">

          <span className="uppercase tracking-[0.35em] text-xs text-black/40">
            {t("services.eyebrow")}
          </span>

          <h2 className="mt-6 text-6xl font-extralight leading-[1.05] tracking-[-0.05em]">
            {t("services.titleLine1")}
            <br />
            <span className="font-normal">{t("services.titleLine2")}</span>
          </h2>

          <p className="mt-8 text-black/60 text-lg leading-relaxed">
            {t("services.intro")}
          </p>

          <div className="mt-10 w-20 h-[1px] bg-black/20" />

        </div>

        {/* RIGHT STACK */}
        <div className="lg:col-span-2 space-y-28">

          {services.map((service, i) => {
            const Icon = service.icon;

            return (
              <div
                key={i}
                className="group relative border-l border-black/10 pl-10"
              >

                {/* DOT */}
                <div className="absolute -left-[7px] top-2 w-3 h-3 rounded-full bg-black" />

                {/* ICON */}
                <div className="flex items-center gap-4">

                  <div className="w-12 h-12 rounded-xl bg-black text-white flex items-center justify-center">
                    <Icon size={20} />
                  </div>

                  <span className="text-sm text-black/40 tracking-[0.3em] uppercase">
                    0{i + 1}
                  </span>

                </div>

                {/* TITLE */}
                <h3 className="mt-6 text-4xl md:text-5xl font-light tracking-[-0.04em]">
                  {service.title}
                </h3>

                {/* DESCRIPTION */}
                <p className="mt-6 text-black/60 text-lg max-w-2xl leading-relaxed">
                  {service.description}
                </p>

                {/* HOVER LINE */}
                <div className="mt-8 w-0 group-hover:w-32 h-[1px] bg-black transition-all duration-500" />

              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}
