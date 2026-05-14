import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqItems = useMemo(() => {
    const raw = t("faq.items", { returnObjects: true });
    return Array.isArray(raw)
      ? (raw as { question: string; answer: string }[])
      : [];
  }, [t]);

  return (
    <section id="faq" className="relative my-10 py-5 px-6 bg-lime-300 md:mx-10 mx-4 rounded-3xl text-black overflow-hidden">

      {/* 🌫️ AWWARDS CIRCLES BACKGROUND */}
      <div className="absolute inset-0 -z-10">

        <div className="absolute top-[-120px] left-[-120px] w-[500px] h-[500px] bg-black/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-120px] right-[-120px] w-[600px] h-[600px] bg-black/5 rounded-full blur-[160px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-black/5 rounded-full blur-[180px]" />

      </div>

      {/* HEADER */}
      <div className="max-w-4xl mx-auto text-center mb-24">
        <span className="uppercase tracking-[0.35em] text-xs text-black/50">
          {t("faq.eyebrow")}
        </span>

        <h2 className="mt-6 text-5xl md:text-7xl font-extralight leading-[1.05] tracking-[-0.04em]">
          {t("faq.titleLine1")}
          <br />
          <span className="font-normal">{t("faq.titleLine2")}</span>
        </h2>

        <p className="mt-8 text-black/60 text-lg">
          {t("faq.subtitle")}
        </p>
      </div>

      {/* ACCORDION */}
      <div className="max-w-3xl mx-auto space-y-6">

        {faqItems.map((faq, index) => (
          <div
            key={index}
            className="border-b border-black/10 pb-6 group"
          >

            {/* question */}
            <button
              onClick={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
              className="w-full flex justify-between items-center text-left"
            >
              <h3 className="text-xl md:text-2xl font-light leading-snug group-hover:opacity-70 transition">
                {faq.question}
              </h3>

              <ChevronDown
                className={`w-5 h-5 transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* answer */}
            <div
              className={`overflow-hidden transition-all duration-500 ${
                openIndex === index
                  ? "max-h-40 opacity-100 mt-4"
                  : "max-h-0 opacity-0"
              }`}
            >
              <p className="text-black/60 text-base leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="max-w-3xl mx-auto mt-24 text-center">
        <p className="text-black/60 mb-6">
          {t("faq.moreQuestion")}
        </p>
        <a href="#contact">
          <button className="px-8 py-4 rounded-full bg-black text-white hover:scale-105 transition">
            {t("faq.cta")}
          </button>
        </a>
      </div>
    </section>
  );
}
