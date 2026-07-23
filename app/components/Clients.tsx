import { useTranslation } from "react-i18next";

// Logos clients
import ansieLogo from "~/asset/clients/ansie.jpeg";
import bossLogo from "~/asset/clients/boss.jpeg";
import eastAfricaLogo from "~/asset/clients/east-africa-bank.jpeg";
import eximLogo from "~/asset/clients/exim.jpeg";

function Clients() {
  const { t } = useTranslation();

  const clients = [
    { 
      name: "ANSIE", 
      logo: ansieLogo,
      bg: "bg-white/90"
    },
    { 
      name: "Bank of South Sudan", 
      logo: bossLogo,
      bg: "bg-white/90"
    },
    { 
      name: "East Africa Bank", 
      logo: eastAfricaLogo,
      bg: "bg-white/90"
    },
    { 
      name: "Exim Bank", 
      logo: eximLogo,
      bg: "bg-white/90"
    },
  ];

  return (
    <section
      id="clients"
      className="relative py-20 md:mx-10 mx-6 bg-white text-black overflow-hidden"
    >
      {/* HEADER */}
      <div className="max-w-4xl mx-auto text-center mb-16 relative">
        <span className="uppercase tracking-[0.35em] text-xs text-black/50">
          {t("clients.eyebrow")}
        </span>

        <h2 className="mt-6 text-4xl md:text-6xl font-extralight leading-[1.05] tracking-[-0.04em]">
          {t("clients.titleLine1")}{" "}
          <span className="font-normal">{t("clients.titleLine2")}</span>
        </h2>

        <p className="mt-6 text-black/60 text-lg">
          {t("clients.subtitle")}
        </p>
      </div>

      {/* GRID CLIENTS */}
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 relative">
        {clients.map((item, index) => (
          <div
            key={index}
            className={`
              group relative flex items-center justify-center
              rounded-2xl p-6 md:p-8 h-40 md:h-48
              transition-all duration-500 hover:shadow-xl hover:-translate-y-2
              ${item.bg} border border-black/5
            `}
          >
            <div className="w-full h-full flex items-center justify-center relative">
              {/* Image du logo avec suppression du fond */}
              <img
                src={item.logo}
                alt={item.name}
                className="
                  w-auto h-auto max-h-[75%] max-w-[80%] 
                  object-contain transition-all duration-500 
                  group-hover:scale-110
                "
                loading="lazy"
                style={{
                  mixBlendMode: 'multiply',
                }}
              />
              
              {/* Effet de survol avec gradient */}
              <div className="
                absolute inset-0 
                bg-gradient-to-br from-white/0 via-white/30 to-white/0 
                opacity-0 group-hover:opacity-100 
                transition-opacity duration-500 
                rounded-2xl
              " />
              
              {/* Ombre subtile au survol */}
              <div className="
                absolute inset-0 
                shadow-inner opacity-0 group-hover:opacity-100 
                transition-opacity duration-500 
                rounded-2xl
              " />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Clients;