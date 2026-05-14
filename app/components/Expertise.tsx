import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { CheckCircle2, Shield, Cpu, Database, Code2 } from 'lucide-react';

export default function Expertise() {
  const { t } = useTranslation();

  const networkBullets = useMemo(() => {
    const raw = t("expertise.network.bullets", { returnObjects: true });
    return Array.isArray(raw) ? (raw as string[]) : [];
  }, [t]);

  const virtualizationBullets = useMemo(() => {
    const raw = t("expertise.virtualization.bullets", { returnObjects: true });
    return Array.isArray(raw) ? (raw as string[]) : [];
  }, [t]);

  const backupBullets = useMemo(() => {
    const raw = t("expertise.backup.bullets", { returnObjects: true });
    return Array.isArray(raw) ? (raw as string[]) : [];
  }, [t]);

  const devBullets = useMemo(() => {
    const raw = t("expertise.dev.bullets", { returnObjects: true });
    return Array.isArray(raw) ? (raw as string[]) : [];
  }, [t]);

  return (
    <section  className="py-24 bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              {t("expertise.network.badge")}
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              {t("expertise.network.title")}
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              {t("expertise.network.intro")}
            </p>
            <div className="space-y-4">
              {networkBullets.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-[3rem] blur-3xl opacity-20"></div>
            <div className="relative bg-white border border-slate-200 rounded-[3rem] p-12 shadow-2xl">
              <Shield className="w-full h-64 text-blue-600" strokeWidth={1} />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-purple-600 rounded-[3rem] blur-3xl opacity-20"></div>
            <div className="relative bg-white border border-slate-200 rounded-[3rem] p-12 shadow-2xl">
              <Cpu className="w-full h-64 text-violet-600" strokeWidth={1} />
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="inline-block bg-violet-100 text-violet-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              {t("expertise.virtualization.badge")}
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              {t("expertise.virtualization.title")}
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              {t("expertise.virtualization.intro")}
            </p>
            <div className="space-y-4">
              {virtualizationBullets.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-violet-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              {t("expertise.backup.badge")}
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              {t("expertise.backup.title")}
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              {t("expertise.backup.intro")}
            </p>
            <div className="space-y-4">
              {backupBullets.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-green-600 rounded-[3rem] blur-3xl opacity-20"></div>
            <div className="relative bg-white border border-slate-200 rounded-[3rem] p-12 shadow-2xl">
              <Database className="w-full h-64 text-emerald-600" strokeWidth={1} />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-600 to-orange-600 rounded-[3rem] blur-3xl opacity-20"></div>
            <div className="relative bg-white border border-slate-200 rounded-[3rem] p-12 shadow-2xl">
              <Code2 className="w-full h-64 text-amber-600" strokeWidth={1} />
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="inline-block bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              {t("expertise.dev.badge")}
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              {t("expertise.dev.title")}
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              {t("expertise.dev.intro")}
            </p>
            <div className="space-y-4">
              {devBullets.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
