import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

type FaqItem = { question: string; answer: string };

export default function FAQ() {
  const { t } = useTranslation("common");
  const raw = t("faq.items", { returnObjects: true });
  const faqs: FaqItem[] = Array.isArray(raw) ? (raw as FaqItem[]) : [];

  return (
    <section
      id="faq"
      className="relative my-10 py-5 px-6 bg-lime-300 md:mx-10 mx-4 rounded-3xl text-black overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-[-120px] left-[-120px] w-[500px] h-[500px] bg-black/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-120px] right-[-120px] w-[600px] h-[600px] bg-black/5 rounded-full blur-[160px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-black/5 rounded-full blur-[180px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center mb-24">
        <span className="uppercase tracking-[0.35em] text-xs text-black/50">
          {t("faq.eyebrow")}
        </span>

        <h2 className="mt-6 text-5xl md:text-7xl font-extralight leading-[1.05] tracking-[-0.04em]">
          {t("faq.titleLine1")}
          <br />
          <span className="font-normal">{t("faq.titleLine2")}</span>
        </h2>

        <p className="mt-8 text-black/60 text-lg">{t("faq.subtitle")}</p>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto space-y-6">
        {faqs.map((faq, index) => (
          <details
            key={index}
            className="border-b border-black/10 pb-6 last:border-b-0 [&[open]_summary_.faq-chevron]:rotate-180"
          >
            <summary className="flex w-full cursor-pointer list-none items-center justify-between gap-4 text-left [&::-webkit-details-marker]:hidden">
              <h3 className="text-xl md:text-2xl font-light leading-snug">
                {faq.question}
              </h3>

              <ChevronDown
                className="faq-chevron h-5 w-5 shrink-0 transition-transform duration-300"
                aria-hidden
              />
            </summary>

            <div className="pt-4">
              <p className="text-black/60 text-base leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </details>
        ))}
      </div>

      <div className="relative z-10 max-w-3xl mx-auto mt-24 text-center">
        <p className="text-black/60 mb-6">{t("faq.ctaPrompt")}</p>
        <a
          href="#contact"
          className="inline-flex cursor-pointer items-center justify-center rounded-full bg-black px-8 py-4 text-white no-underline transition hover:scale-105"
        >
          {t("faq.ctaButton")}
        </a>
      </div>
    </section>
  );
}
