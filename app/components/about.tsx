import { useTranslation } from "react-i18next";

function AboutUs() {
  const { t } = useTranslation("common");

  return (
    <section
      id="about"
      className="relative md:mx-10 mx-4 py-5 text-black overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 grid-cols-1 gap-24 items-center">
        <div>
          <h2 className="mt-6 text-5xl md:text-7xl font-extralight leading-[1.05] tracking-[-0.04em]">
            {t("about.headingLine1")}
            <br />
            <span className="font-normal">{t("about.headingLine2")}</span>{" "}
            {t("about.headingLine3")}
          </h2>

          <div className="mt-10 space-y-6 text-black/70 text-lg leading-relaxed">
            <p>{t("about.p1")}</p>

            <p>{t("about.p2")}</p>
          </div>

          <div className="mt-12 w-24   h-[1px] bg-black/20"></div>

          <div className="mt-10 flex flex-wrap gap-14">
            <div>
              <div className="text-4xl font-light">10+</div>
              <div className="text-xs uppercase tracking-[0.3em] text-black/50 mt-2">
                {t("about.statProjects")}
              </div>
            </div>

            <div>
              <div className="text-4xl font-light">24/7</div>
              <div className="text-xs uppercase tracking-[0.3em] text-black/50 mt-2">
                {t("about.statMonitoring")}
              </div>
            </div>

            <div>
              <div className="text-4xl font-light">99%</div>
              <div className="text-xs uppercase tracking-[0.3em] text-black/50 mt-2">
                {t("about.statUptime")}
              </div>
            </div>
          </div>
        </div>

        <div className="relative flex justify-center lg:justify-end">
          <div className="relative md:w-[460px] w-[300px] h-[300px] md:h-[460px]">
            <div className="absolute inset-0 rounded-full border border-black/10"></div>

            <div className="absolute inset-10 rounded-full border border-black/5"></div>

            <div className="absolute inset-20 rounded-full border border-black/10"></div>

            <div className="absolute inset-32 rounded-full bg-black"></div>

            <div className="absolute inset-0 flex items-center justify-center text-center text-white">
              <div>
                <p className="text-xs md:flex uppercase hidden tracking-[0.4em] text-white/60">
                  {t("about.visualLabel")}
                </p>
                <h3 className="text-2xl md:flex hidden font-light mt-2 tracking-wide">
                  {t("about.visualTitleLine1")}
                  <br />
                  {t("about.visualTitleLine2")}
                </h3>
              </div>
            </div>

            <div className="absolute top-10 right-10 w-3 h-3 bg-black rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
