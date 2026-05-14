import { Cog, FileText, Rocket, Search } from "lucide-react";
import { useTranslation } from "react-i18next";

const stepIcons = [Search, FileText, Cog, Rocket] as const;

type ProcessStep = {
  title: string;
  description: string;
  duration: string;
};

export default function Process() {
  const { t } = useTranslation("common");
  const stepTexts = t("process.steps", { returnObjects: true }) as ProcessStep[];

  const steps = stepTexts.map((step, index) => ({
    ...step,
    icon: stepIcons[index],
    color: ["text-teal-400", "text-cyan-400", "text-emerald-400", "text-lime-400"][
      index
    ],
    bgColor: ["bg-teal-500/10", "bg-cyan-500/10", "bg-emerald-500/10", "bg-lime-500/10"][
      index
    ],
    borderColor: [
      "border-teal-500/30",
      "border-cyan-500/30",
      "border-emerald-500/30",
      "border-lime-500/30",
    ][index],
  }));

  return (
    <section
      id="process"
      className="bg-black mx-10 rounded-3xl text-white relative overflow-hidden py-20"
    >
      <div className="absolute inset-0 bg-grid-white/[0.02]"></div>
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-lime-300/10 rounded-full blur-[180px]"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-lime-500/10 rounded-full blur-[180px]"></div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="uppercase tracking-[0.35em] text-xs text-white/50">
            {t("process.eyebrow")}
          </span>
          <h2 className="mt-6 text-4xl md:text-5xl font-extralight tracking-[-0.05em] leading-none">
            {t("process.titleLine1")}
            <br />
            <span className="font-normal">{t("process.titleLine2")}</span>
          </h2>
          <p className="mt-8 text-slate-400 text-lg max-w-3xl mx-auto leading-relaxed">
            {t("process.intro")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center group"
              >
                <div
                  className={`w-20 h-20 rounded-2xl ${step.bgColor} ${step.borderColor} border-2 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className={`w-10 h-10 ${step.color}`} strokeWidth={1.5} />
                </div>

                <span className="text-white/30 text-sm font-light mb-3">
                  {t("process.stepLabel", {
                    n: String(index + 1).padStart(2, "0"),
                  })}
                </span>

                <h3 className="text-xl font-light mb-3 tracking-tight">
                  {step.title}
                </h3>

                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  {step.description}
                </p>

                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-lime-300/80">
                  <div className="w-8 h-px bg-lime-300/50"></div>
                  {step.duration}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
