import {
  Cloud,
  Code,
  Database,
  GraduationCap,
  Network,
  Server,
  ShieldCheck,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const serviceIcons = [
  Network,
  Server,
  ShieldCheck,
  Cloud,
  Database,
  Code,
  GraduationCap,
];

type ServiceItem = { title: string; description: string };

export default function ServicesStacked() {
  const { t } = useTranslation("common");
  const items = t("services.items", { returnObjects: true }) as ServiceItem[];

  return (
    <section
      id="services"
      className="relative bg-lime-300 text-black my-5 py-5 md:mx-10 mx-5 rounded-3xl"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-3 gap-20">
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

        <div className="lg:col-span-2 space-y-28">
          {items.map((service, i) => {
            const Icon = serviceIcons[i];
            if (!Icon) return null;

            return (
              <div
                key={i}
                className="group relative border-l border-black/10 pl-10"
              >
                <div className="absolute -left-[7px] top-2 w-3 h-3 rounded-full bg-black" />

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-black text-white flex items-center justify-center">
                    <Icon size={20} />
                  </div>

                  <span className="text-sm text-black/40 tracking-[0.3em] uppercase">
                    0{i + 1}
                  </span>
                </div>

                <h3 className="mt-6 text-4xl md:text-5xl font-light tracking-[-0.04em]">
                  {service.title}
                </h3>

                <p className="mt-6 text-black/60 text-lg max-w-2xl leading-relaxed">
                  {service.description}
                </p>

                <div className="mt-8 w-0 group-hover:w-32 h-[1px] bg-black transition-all duration-500" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
