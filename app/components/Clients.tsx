import { useTranslation } from "react-i18next";
import { useState, useRef } from "react";

// Logos clients
import ansieLogo from "~/asset/clients/ansie.jpeg";
import bossLogo from "~/asset/clients/boss.jpeg";
import eastAfricaLogo from "~/asset/clients/east-africa-bank.jpeg";
import eximLogo from "~/asset/clients/exim.jpeg";
import banqueCentraleLogo from "~/asset/clients/banquecentrale.jpeg";

function Clients() {
  const { t } = useTranslation();
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const clients = [
    { 
      name: "ANSIE", 
      logo: ansieLogo,
      bg: "bg-white/90",
      color: "#1a1a1a",
      // Certains logos ont besoin d'un traitement spécial
      useMixBlend: true
    },
    { 
      name: "Bank of South Sudan", 
      logo: bossLogo,
      bg: "bg-white/90",
      color: "#1a1a1a",
      // Ce logo a des problèmes avec mixBlendMode, on le désactive
      useMixBlend: false
    },
    { 
      name: "East Africa Bank", 
      logo: eastAfricaLogo,
      bg: "bg-white/90",
      color: "#1a1a1a",
      useMixBlend: true
    },
    { 
      name: "Exim Bank", 
      logo: eximLogo,
      bg: "bg-white/90",
      color: "#1a1a1a",
      useMixBlend: true
    },
    { 
      name: "Banque Centrale de Djibouti", 
      logo: banqueCentraleLogo,
      bg: "bg-white/90",
      color: "#1a1a1a",
      useMixBlend: true
    },
  ];

  const scrollLeft = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({ left: -300, behavior: 'smooth' });
      setIsPaused(true);
      setTimeout(() => setIsPaused(false), 3000);
    }
  };

  const scrollRight = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({ left: 300, behavior: 'smooth' });
      setIsPaused(true);
      setTimeout(() => setIsPaused(false), 3000);
    }
  };

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

      {/* MARQUEE CLIENTS AVEC BOUCLE INFINIE */}
      <div className="relative overflow-hidden py-8">
        {/* Gradients de fondu sur les bords */}
        <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Flèche gauche */}
        <button 
          onClick={scrollLeft}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl border border-gray-200"
          aria-label="Défiler vers la gauche"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Flèche droite */}
        <button 
          onClick={scrollRight}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl border border-gray-200"
          aria-label="Défiler vers la droite"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Conteneur de défilement */}
        <div 
          ref={scrollContainerRef}
          className="overflow-x-auto scrollbar-hide relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div 
            className={`flex gap-12 md:gap-16 items-center ${
              !isPaused ? "animate-marquee-clients" : "animate-marquee-paused-clients"
            }`}
            style={{ width: 'max-content' }}
          >
            {[...clients, ...clients, ...clients].map((item, index) => (
              <div
                key={index}
                className="client-card group relative flex-shrink-0 w-40 h-40 md:w-52 md:h-52 
                         flex items-center justify-center p-6
                         hover:scale-110 hover:-translate-y-2
                         transition-all duration-500 cursor-pointer
                         rounded-2xl border border-black/5 bg-white/90
                         shadow-sm hover:shadow-xl"
              >
                {/* Effet de glow */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                  style={{ background: `radial-gradient(circle, ${item.color}20, transparent 70%)` }}
                />
                
                {/* Logo - avec ou sans mixBlendMode selon le logo */}
                <img
                  src={item.logo}
                  alt={item.name}
                  className="w-full h-full object-contain relative z-10 
                           transition-all duration-500 
                           group-hover:scale-110"
                  style={{ 
                    // On applique mixBlendMode uniquement si le logo le supporte
                    mixBlendMode: item.useMixBlend ? 'multiply' : 'normal',
                    // Pour les logos avec fond blanc, on force un fond transparent
                    backgroundColor: item.useMixBlend ? 'transparent' : 'white',
                    padding: item.useMixBlend ? '0' : '0.5rem',
                    borderRadius: item.useMixBlend ? '0' : '0.5rem',
                  }}
                  loading="lazy"
                />

                {/* Tooltip avec le nom */}
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 
                              opacity-0 group-hover:opacity-100 transition-all duration-300
                              bg-gray-800 text-white text-xs font-medium px-3 py-1 rounded-full
                              whitespace-nowrap pointer-events-none">
                  {item.name}
                </div>

                {/* Icône de survol */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes marquee-clients {
            0% { transform: translateX(0); }
            100% { transform: translateX(-33.33%); }
          }
          
          .animate-marquee-clients {
            animation: marquee-clients 35s linear infinite;
            width: max-content;
          }
          
          .animate-marquee-paused-clients {
            animation-play-state: paused;
            width: max-content;
          }
          
          .client-card {
            opacity: 0;
            animation: fadeInUp 0.6s ease forwards;
          }
          
          .client-card:nth-child(1) { animation-delay: 0.05s; }
          .client-card:nth-child(2) { animation-delay: 0.1s; }
          .client-card:nth-child(3) { animation-delay: 0.15s; }
          .client-card:nth-child(4) { animation-delay: 0.2s; }
          .client-card:nth-child(5) { animation-delay: 0.25s; }
          .client-card:nth-child(6) { animation-delay: 0.05s; }
          .client-card:nth-child(7) { animation-delay: 0.1s; }
          .client-card:nth-child(8) { animation-delay: 0.15s; }
          .client-card:nth-child(9) { animation-delay: 0.2s; }
          .client-card:nth-child(10) { animation-delay: 0.25s; }
          .client-card:nth-child(11) { animation-delay: 0.05s; }
          .client-card:nth-child(12) { animation-delay: 0.1s; }
          .client-card:nth-child(13) { animation-delay: 0.15s; }
          .client-card:nth-child(14) { animation-delay: 0.2s; }
          .client-card:nth-child(15) { animation-delay: 0.25s; }
          
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px) scale(0.9);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
          
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          
          @media (max-width: 640px) {
            .client-card {
              width: 6.5rem !important;
              height: 6.5rem !important;
              padding: 1rem !important;
            }
            .gap-12 { gap: 1.5rem !important; }
            
            .absolute.left-2,
            .absolute.right-2 {
              width: 2.5rem !important;
              height: 2.5rem !important;
              padding: 0.5rem !important;
            }
            
            .absolute.left-2 svg,
            .absolute.right-2 svg {
              width: 1.25rem !important;
              height: 1.25rem !important;
            }
          }
        `}
      </style>
    </section>
  );
}

export default Clients;