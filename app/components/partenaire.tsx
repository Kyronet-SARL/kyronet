import { useTranslation } from "react-i18next";
import { useState, useRef } from "react";

// Imports des 8 logos
import dellLogo from "~/asset/partenaires/Dell.jpg";
import fortinetLogo from "~/asset/partenaires/fortinet.jpeg";
import kasperskyLogo from "~/asset/partenaires/kaspersky.jpeg";
import microsoftLogo from "~/asset/partenaires/microsoft.jpeg";
import netappLogo from "~/asset/partenaires/netapp.jpeg";
import sophosLogo from "~/asset/partenaires/sophos.jpeg";
import tenableLogo from "~/asset/partenaires/tenable.jpeg";
import veeamLogo from "~/asset/partenaires/veeam.jpeg";

function Partenaire() {
  const { t } = useTranslation();
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const partenaires = [
    { 
      name: "DELL", 
      logo: dellLogo, 
      color: "#007DB8",
      url: "https://www.dell.com"
    },
    { 
      name: "Microsoft", 
      logo: microsoftLogo, 
      color: "#00A4EF",
      url: "https://www.microsoft.com"
    },
    { 
      name: "Fortinet", 
      logo: fortinetLogo, 
      color: "#EE3124",
      url: "https://www.fortinet.com"
    },
    { 
      name: "NetApp", 
      logo: netappLogo, 
      color: "#0067C5",
      url: "https://www.netapp.com"
    },
    { 
      name: "Sophos", 
      logo: sophosLogo, 
      color: "#E74A2B",
      url: "https://www.sophos.com"
    },
    { 
      name: "Tenable", 
      logo: tenableLogo, 
      color: "#0078D4",
      url: "https://www.tenable.com"
    },
    { 
      name: "Veeam", 
      logo: veeamLogo, 
      color: "#00B336",
      url: "https://www.veeam.com"
    },
    { 
      name: "Kaspersky", 
      logo: kasperskyLogo, 
      color: "#00A651",
      url: "https://www.kaspersky.com"
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

  const handleViewCertificates = () => {
    window.open('https://1drv.ms/f/c/6a37313e293d29ec/IgAFT8oytUyuQ6ewv-Nh_VJLAQncgrAaKItqUgrsSwcoCb0?e=tYvf3e', '_blank');
  };

  return (
    <div className="px-5 text-black pt-8 pb-10 bg-gradient-to-b from-white to-gray-50 relative">
      <div className="mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
          {t("partenaire.heading")}
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-4 rounded-full" />
      </div>

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
              !isPaused ? "animate-marquee" : "animate-marquee-paused"
            }`}
            style={{ width: 'max-content' }}
          >
            {[...partenaires, ...partenaires, ...partenaires].map((item, index) => (
              <div
                key={index}
                className="group relative flex-shrink-0 w-28 h-28 md:w-40 md:h-40 
                         flex items-center justify-center p-4
                         hover:scale-110 hover:-translate-y-2
                         transition-all duration-500 cursor-pointer"
                onDoubleClick={() => window.open(item.url, '_blank')}
                title={`Double-cliquez pour visiter ${item.name}`}
              >
                {/* Effet de glow */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                  style={{ background: `radial-gradient(circle, ${item.color}20, transparent 70%)` }}
                />
                
                {/* Logo avec mix-blend-mode pour supprimer le fond blanc */}
                <img
                  src={item.logo}
                  alt={item.name}
                  className="w-full h-full object-contain relative z-10 
                           transition-all duration-500 
                           group-hover:scale-110"
                  style={{ mixBlendMode: 'multiply' }}
                  loading="lazy"
                />

                {/* Tooltip */}
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 
                              opacity-0 group-hover:opacity-100 transition-all duration-300
                              bg-gray-800 text-white text-xs font-medium px-3 py-1 rounded-full
                              whitespace-nowrap pointer-events-none">
                  {item.name}
                </div>

                {/* Indicateur "Double-cliquez" */}
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

      {/* SECTION: Bouton Certificats + Message Information */}
      <div className="text-center mt-6 space-y-3">
        {/* Bouton Certificats - Version Discrète et Épurée */}
        <button
          onClick={handleViewCertificates}
          className="inline-flex items-center gap-2 px-5 py-2 
                   text-sm font-medium text-blue-600 
                   hover:text-blue-800 hover:bg-blue-50/80
                   rounded-lg transition-all duration-200
                   border border-transparent hover:border-blue-200/50
                   group"
        >
          <svg 
            className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>Certificats de partenariat</span>
          <svg 
            className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 opacity-60" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>

        {/* Message d'information */}
        <div className="text-xs text-gray-400 flex items-center justify-center gap-2">
          <span>🖱️</span>
          <span>Double-cliquez sur un logo pour visiter son site officiel</span>
        </div>
      </div>

      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-33.33%); }
          }
          
          .animate-marquee {
            animation: marquee 30s linear infinite;
            width: max-content;
          }
          
          .animate-marquee-paused {
            animation-play-state: paused;
            width: max-content;
          }
          
          .group {
            opacity: 0;
            animation: fadeInUp 0.6s ease forwards;
          }
          
          .group:nth-child(1) { animation-delay: 0.05s; }
          .group:nth-child(2) { animation-delay: 0.1s; }
          .group:nth-child(3) { animation-delay: 0.15s; }
          .group:nth-child(4) { animation-delay: 0.2s; }
          .group:nth-child(5) { animation-delay: 0.25s; }
          .group:nth-child(6) { animation-delay: 0.3s; }
          .group:nth-child(7) { animation-delay: 0.35s; }
          .group:nth-child(8) { animation-delay: 0.4s; }
          .group:nth-child(9) { animation-delay: 0.05s; }
          .group:nth-child(10) { animation-delay: 0.1s; }
          .group:nth-child(11) { animation-delay: 0.15s; }
          .group:nth-child(12) { animation-delay: 0.2s; }
          .group:nth-child(13) { animation-delay: 0.25s; }
          .group:nth-child(14) { animation-delay: 0.3s; }
          .group:nth-child(15) { animation-delay: 0.35s; }
          .group:nth-child(16) { animation-delay: 0.4s; }
          .group:nth-child(17) { animation-delay: 0.05s; }
          .group:nth-child(18) { animation-delay: 0.1s; }
          .group:nth-child(19) { animation-delay: 0.15s; }
          .group:nth-child(20) { animation-delay: 0.2s; }
          .group:nth-child(21) { animation-delay: 0.25s; }
          .group:nth-child(22) { animation-delay: 0.3s; }
          .group:nth-child(23) { animation-delay: 0.35s; }
          .group:nth-child(24) { animation-delay: 0.4s; }
          
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
            .group {
              width: 5rem !important;
              height: 5rem !important;
              padding: 0.75rem !important;
            }
            .gap-12 { gap: 1.5rem !important; }
            
            .absolute.left-2, .absolute.right-2 {
              width: 2.5rem !important;
              height: 2.5rem !important;
              padding: 0.5rem !important;
            }
            
            .absolute.left-2 svg, .absolute.right-2 svg {
              width: 1.25rem !important;
              height: 1.25rem !important;
            }

            .inline-flex.items-center.gap-2.px-5.py-2 {
              padding: 0.4rem 1rem !important;
              font-size: 0.75rem !important;
            }
          }
        `}
      </style>
    </div>
  );
}

export default Partenaire;