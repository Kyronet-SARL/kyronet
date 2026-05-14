import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Contact() {
  const { t } = useTranslation("common");

  return (
    <section
      id="contact"
      className="relative p-5 rounded-t-[5rem] bg-black text-white overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-180px] left-[-180px] w-[600px] h-[600px] bg-white/5 rounded-full blur-[180px]" />

        <div className="absolute bottom-[-180px] right-[-180px] w-[700px] h-[700px] bg-blue-500/10 rounded-full blur-[200px]" />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-[220px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-24 items-start">
          <div>
            <span className="uppercase tracking-[0.35em] text-xs text-white/50">
              {t("contact.eyebrow")}
            </span>

            <h2 className="mt-6 text-5xl md:text-7xl font-extralight leading-[1.05] tracking-[-0.04em]">
              {t("contact.titleLine1")}
              <br />
              <span className="font-normal">{t("contact.titleLine2")}</span>
            </h2>

            <p className="mt-8 text-white/60 text-lg leading-relaxed max-w-xl">
              {t("contact.intro")}
            </p>

            <div className="mt-14 space-y-10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-white/80" />
                </div>
                <div>
                  <p className="font-medium">{t("contact.phone")}</p>
                  <p className="text-white/60">+253 77 30 94 07</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-white/80" />
                </div>
                <div>
                  <p className="font-medium">{t("contact.email")}</p>
                  <p className="text-white/60">sales@kyronet.net / support@kyronet.net</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white/80" />
                </div>
                <div>
                  <p className="font-medium">{t("contact.address")}</p>
                  <p className="text-white/60">Djibouti-ville, Q6 , CLE</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10">
            <h3 className="text-2xl font-light mb-10">{t("contact.formTitle")}</h3>

            <form className="space-y-8">
              <input
                type="text"
                placeholder={t("contact.placeholderName")}
                className="w-full bg-transparent border-b border-white/20 py-3 focus:border-white outline-none"
              />

              <input
                type="email"
                placeholder={t("contact.placeholderEmail")}
                className="w-full bg-transparent border-b border-white/20 py-3 focus:border-white outline-none"
              />

              <input
                type="text"
                placeholder={t("contact.placeholderCompany")}
                className="w-full bg-transparent border-b border-white/20 py-3 focus:border-white outline-none"
              />

              <textarea
                rows={4}
                placeholder={t("contact.placeholderMessage")}
                className="w-full bg-transparent border-b border-white/20 py-3 focus:border-white outline-none resize-none"
              />

              <button
                type="submit"
                className="w-full bg-white text-black py-4 rounded-xl hover:opacity-90 transition flex items-center justify-center gap-2"
              >
                {t("contact.submit")}
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        <footer className="mt-32 border-t border-white/10 pt-10 text-white/50 text-sm">
          <div className="flex flex-col md:flex-row justify-between gap-6">
            <p>{t("contact.footerCopyright")}</p>

            <div className="flex gap-6">
              <a className="hover:text-white" href="#">
                {t("contact.legal")}
              </a>
              <a className="hover:text-white" href="#">
                {t("contact.privacy")}
              </a>
              <a className="hover:text-white" href="#">
                {t("contact.terms")}
              </a>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}
