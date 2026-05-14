import { useTranslation } from "react-i18next";

type TestimonialItem = { name: string; role: string; text: string };

function Testimonials() {
  const { t } = useTranslation("common");
  const testimonials = t("testimonials.items", {
    returnObjects: true,
  }) as TestimonialItem[];

  return (
    <section
      id="testimonials"
      className="relative py-5 md:mx-10 mx-6 bg-white text-black overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-[-120px] left-[-120px] w-[500px] h-[500px] bg-black/5 rounded-full blur-[140px]"></div>

        <div className="absolute bottom-[-150px] right-[-150px] w-[600px] h-[600px] bg-black/5 rounded-full blur-[160px]"></div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-black/5 rounded-full blur-[180px]"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto mb-24 text-center">
        <span className="uppercase tracking-[0.35em] text-xs text-black/50">
          {t("testimonials.eyebrow")}
        </span>

        <h2 className="mt-6 text-5xl md:text-7xl font-extralight leading-[1.05] tracking-[-0.04em]">
          {t("testimonials.titleLine1")}
          <br />
          <span className="font-normal">{t("testimonials.titleLine2")}</span>
        </h2>

        <p className="mt-8 text-black/60 text-lg">{t("testimonials.subtitle")}</p>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto grid md:grid-cols-3 gap-12">
        {testimonials.map((item, i) => (
          <div key={i} className="relative group">
            <div className="text-6xl text-black/10 absolute -top-6 left-0 group-hover:text-black/20 transition">
              “
            </div>

            <p className="text-lg text-black/70 leading-relaxed mb-8">{item.text}</p>

            <div className="space-y-1">
              <h4 className="text-lg font-light">{item.name}</h4>
              <span className="text-sm text-black/40">{item.role}</span>
            </div>

            <div className="w-0 group-hover:w-16 h-[1px] bg-black/30 transition-all duration-500 mt-4"></div>
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 w-24 h-24 bg-black/10 rounded-full blur-2xl" />
    </section>
  );
}

export default Testimonials;
