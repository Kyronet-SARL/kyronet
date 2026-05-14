import { useTranslation } from "react-i18next";

function Partenaire() {
  const { t } = useTranslation("common");
  const partenaires = [
    "Oracle",
    "fortinet",
    "Synax technology",
    "Tenable",
    "Kaspersky",
  ];

  return (
    <div className="px-5 text-black pt-8 pb-10">
      <div className="mb-10">
        <h2 className="text-center tracking-tighter text-xl leading-none">
          {t("partenaire.title")}
        </h2>
      </div>
      <div className="overflow-hidden mask-l-from-90%  mask-r-from-90%">
        <div className="flex animate-marquee space-x-10">
          {partenaires.concat(partenaires).map((item, index) => (
            <div key={index} className="h-20 w-20 shrink-0 md:h-32 md:w-32">
              {item}
            </div>
          ))}
        </div>

        <style>
          {`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            display: flex;
            animation: marquee 15s linear infinite;
          }
        `}
        </style>
      </div>
    </div>
  );
}

export default Partenaire;
