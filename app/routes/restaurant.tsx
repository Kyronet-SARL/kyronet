import { useMemo, useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { motion, useMotionValue, useSpring } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ImageOff,
  Award,
  ExternalLink,
  TrendingUp,
  Users,
  CheckCircle2,
  ShoppingCart,
  LayoutGrid,
  Warehouse,
  Truck,
  Calculator,
  Settings,
  Sparkles,
  QrCode,
  Coffee,
  LayoutDashboard,
  CreditCard,
  X,
  Maximize2,
} from "lucide-react";
import i18n from "../i18n/i18n";
import RestaurantCover from "../asset/Projet/Restaurant.png";

export function meta() {
  return [
    { title: `RestoPro — ${i18n.t("navigation.projects")} · Kyronet` },
    { name: "description", content: i18n.t("restaurantPage.description") },
  ];
}

type ModuleItem = {
  id: string;
  title: string;
  description: string;
  features: string[];
};

type GalleryItem = {
  file: string;
  caption: string;
};

type Stat = {
  value: string;
  label: string;
};

const moduleIcons = [
  LayoutDashboard,
  ShoppingCart,
  LayoutGrid,
  Warehouse,
  Truck,
  CreditCard,
  Calculator,
  Settings,
];

const EASE = [0.22, 1, 0.36, 1] as const;

/* ---------------------------------------------------------- */
/* Curseur lumineux qui suit la souris                         */
/* ---------------------------------------------------------- */
function GlowCursor() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 60, damping: 20 });
  const sy = useSpring(y, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [x, y]);

  return (
    <motion.div
      className="pointer-events-none fixed z-0 h-[480px] w-[480px] rounded-full opacity-[0.15] blur-3xl"
      style={{
        left: sx,
        top: sy,
        translateX: "-50%",
        translateY: "-50%",
        background:
          "radial-gradient(circle, #C1673B 0%, transparent 70%)",
      }}
    />
  );
}

/* ---------------------------------------------------------- */
/* Texte qui se révèle mot par mot au scroll                   */
/* ---------------------------------------------------------- */
function RevealText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, delay: i * 0.04, ease: EASE }}
          className="inline-block mr-[0.3em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

/* ---------------------------------------------------------- */
/* Compteur animé                                              */
/* ---------------------------------------------------------- */
function AnimatedCounter({
  value,
  label,
  icon: Icon,
  index = 0,
}: {
  value: string;
  label: string;
  icon?: any;
  index?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const target = parseInt(value.replace(/[^0-9]/g, ""), 10) || 0;
  const suffix = value.replace(/[0-9]/g, "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const duration = 1600;
          const increment = target / (duration / 16);
          const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
          return () => clearInterval(timer);
        }
      },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: EASE }}
      className="relative text-center group"
    >
      <div className="flex flex-col items-center gap-3">
        {Icon && (
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#C1673B]/10 text-[#C1673B] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
            <Icon className="h-5 w-5" strokeWidth={1.5} />
          </div>
        )}
        <div className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-[#3A2E27] tabular-nums">
          {count}
          {suffix}
        </div>
        <div className="text-xs font-medium text-[#8A7A6D] tracking-[0.2em] uppercase">
          {label}
        </div>
      </div>
    </motion.div>
  );
}

/* ---------------------------------------------------------- */
/* Carte de module avec numéro géant en filigrane              */
/* ---------------------------------------------------------- */
function ModuleCard({
  mod,
  index,
  Icon,
}: {
  mod: ModuleItem;
  index: number;
  Icon: any;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.12, ease: EASE }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -6 }}
      className="group relative overflow-hidden rounded-[1.75rem] border border-[#C1673B]/10 bg-white p-8 shadow-sm transition-shadow duration-500 hover:shadow-2xl hover:shadow-[#C1673B]/10"
    >
      {/* numéro géant en filigrane */}
      <span className="pointer-events-none absolute -right-3 -top-6 select-none text-[7rem] font-black leading-none text-[#C1673B]/[0.05] transition-all duration-700 group-hover:text-[#C1673B]/[0.09] group-hover:scale-110">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="relative z-10 space-y-4">
        <motion.div
          className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-[#3A2E27] text-white"
          animate={{
            backgroundColor: hovered ? "#C1673B" : "#3A2E27",
          }}
          transition={{ duration: 0.4 }}
        >
          <Icon className="h-5 w-5" />
        </motion.div>

        <h3 className="text-xl font-medium tracking-[-0.02em] text-[#3A2E27]">
          {mod.title}
        </h3>

        <p className="text-sm font-light leading-relaxed text-[#8A7A6D]">
          {mod.description}
        </p>

        <ul className="space-y-2 pt-2">
          {mod.features?.map((feature, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="flex items-start gap-2.5 text-sm font-light text-[#3A2E27]"
            >
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#C1673B]" />
              {feature}
            </motion.li>
          ))}
        </ul>
      </div>

      {/* liseré animé au survol */}
      <motion.div
        className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-gradient-to-r from-[#C1673B] to-[#4A5D45]"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: EASE }}
      />
    </motion.div>
  );
}

/* ---------------------------------------------------------- */
/* Lightbox - Affichage plein écran                            */
/* ---------------------------------------------------------- */
function Lightbox({ 
  src, 
  caption, 
  onClose 
}: { 
  src: string; 
  caption?: string; 
  onClose: () => void;
}) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex cursor-zoom-out items-center justify-center bg-black/95 p-4 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[90vh] max-w-[90vw]"
      >
        <img
          src={src}
          alt={caption}
          className="max-h-[85vh] w-auto max-w-[90vw] rounded-lg object-contain shadow-2xl"
        />
        {caption && (
          <div className="absolute -bottom-12 left-0 right-0 text-center text-sm font-light text-white/70">
            {caption}
          </div>
        )}
        <button
          onClick={onClose}
          className="absolute -right-4 -top-4 rounded-full bg-white/10 p-2 text-white transition-all hover:bg-white/20 hover:scale-110"
        >
          <X className="h-5 w-5" />
        </button>
      </motion.div>
    </motion.div>
  );
}

/* ---------------------------------------------------------- */
/* Vignette de galerie avec clic pour agrandir                 */
/* ---------------------------------------------------------- */
function GalleryTile({
  file,
  caption,
  index,
}: {
  file: string;
  caption?: string;
  index: number;
}) {
  const [failed, setFailed] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: EASE }}
        className="group relative overflow-hidden rounded-2xl border border-[#C1673B]/10 bg-[#FBF7F1] shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
        onClick={() => setLightboxOpen(true)}
      >
        <div className="relative aspect-[4/3]">
          {!failed ? (
            <>
              <img
                src={`/restaurant/${file}`}
                alt={caption ?? file}
                onError={() => setFailed(true)}
                loading="lazy"
                className="absolute inset-0 h-full w-full scale-100 object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3A2E27]/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              
              {/* Indicateur "Agrandir" */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="rounded-full bg-black/60 p-3 backdrop-blur-sm">
                  <Maximize2 className="h-6 w-6 text-white" strokeWidth={1.5} />
                </div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 translate-y-4 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="inline-flex items-center gap-1.5 text-xs font-light tracking-wider text-white">
                  <ExternalLink className="h-3.5 w-3.5" />
                  {caption}
                </span>
              </div>
            </>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-gray-400">
              <ImageOff className="h-9 w-9" strokeWidth={1.2} />
              <span className="px-4 text-center text-xs font-light tracking-wider">
                {file}
              </span>
            </div>
          )}
        </div>
        {caption && (
          <div className="px-4 py-3 text-center text-xs font-light tracking-wider text-[#8A7A6D]">
            {caption}
          </div>
        )}
      </motion.div>

      {/* Lightbox */}
      {lightboxOpen && !failed && (
        <Lightbox
          src={`/restaurant/${file}`}
          caption={caption}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  );
}

/* ---------------------------------------------------------- */
/* Bouton "magnétique" — suit légèrement le curseur             */
/* ---------------------------------------------------------- */
function MagneticButton({
  children,
  href,
  external,
}: {
  children: React.ReactNode;
  href: string;
  external?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.25;
    setPos({ x, y });
  };

  const Comp: any = external ? "a" : Link;
  const compProps = external
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : { to: href };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 150, damping: 12 }}
      className="inline-block"
    >
      <Comp
        {...compProps}
        className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[#3A2E27] px-8 py-4 text-sm font-medium uppercase tracking-[0.15em] text-white transition-colors duration-500 hover:bg-[#C1673B]"
      >
        {children}
        <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
      </Comp>
    </motion.div>
  );
}

/* ============================================================ */
/* PAGE PRINCIPALE                                                */
/* ============================================================ */
export default function RestaurantPage() {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const modules = useMemo(
    () =>
      (t("restaurantPage.modules", { returnObjects: true }) as ModuleItem[]) ??
      [],
    [t],
  );
  const gallery = useMemo(
    () =>
      (t("restaurantPage.gallery", { returnObjects: true }) as GalleryItem[]) ??
      [],
    [t],
  );
  const stats = useMemo(
    () => (t("restaurantPage.stats", { returnObjects: true }) as Stat[]) ?? [],
    [t],
  );

  const statIcons = [TrendingUp, Users, Award];

  return (
    <div className="relative overflow-x-hidden bg-[#FBF7F1] text-[#3A2E27] selection:bg-[#C1673B] selection:text-white">
      <GlowCursor />

      {/* HEADER */}
      <motion.header
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "border-b border-[#C1673B]/10 bg-white/90 shadow-sm backdrop-blur-md"
            : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <Link
            to="/"
            className="group inline-flex items-center gap-3 text-sm font-light text-[#8A7A6D] transition-all duration-300 hover:text-[#3A2E27]"
          >
            <ArrowLeft className="h-4 w-4 text-[#C1673B] transition-transform duration-300 group-hover:-translate-x-1" />
            <span className="text-xs uppercase tracking-[0.15em]">
              {t("restaurantPage.back")}
            </span>
          </Link>
          <motion.span
            className="text-sm font-medium text-[#C1673B]"
            whileHover={{ scale: 1.05 }}
          >
             Kyronet
          </motion.span>
        </div>
      </motion.header>

      {/* HERO — image à gauche, texte à droite (sans badge) */}
      <section className="relative overflow-hidden bg-[#1E1712] pb-24 pt-40 lg:pb-32 lg:pt-48">
        <div className="pointer-events-none absolute inset-0 opacity-[0.06]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "28px 28px",
            }}
          />
        </div>

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2 lg:px-10">
          {/* IMAGE — à gauche */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="relative order-1"
          >
            <div className="relative overflow-hidden rounded-[2rem] border border-[#C1673B]/20 shadow-2xl">
              <img
                src={RestaurantCover}
                alt={t("restaurantPage.title")}
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E1712]/40 to-transparent" />
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
              className="absolute -bottom-8 -right-6 flex items-center gap-3 rounded-2xl border border-[#C1673B]/20 bg-white px-6 py-4 shadow-xl sm:-right-8"
            >
              <QrCode className="h-8 w-8 text-[#C1673B]" strokeWidth={1.2} />
              <div>
                <div className="text-sm font-medium text-[#3A2E27]">
                  {t("restaurantPage.title")}
                </div>
                <div className="text-xs font-light text-[#8A7A6D]">
                  Carte publique QR
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* TEXTE — à droite (sans le badge) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
            className="order-2 space-y-6"
          >
            <h1 className="text-5xl font-light leading-[1.05] tracking-[-0.03em] text-white sm:text-6xl md:text-7xl">
              <RevealText text={t("restaurantPage.title")} />
            </h1>

            <p className="max-w-xl text-2xl font-light leading-relaxed tracking-[-0.01em] text-[#E3A87C]">
              {t("restaurantPage.subtitle")}
            </p>

            <p className="max-w-xl text-lg font-light leading-relaxed text-white/70">
              {t("restaurantPage.description")}
            </p>

            <div className="pt-4">
              <MagneticButton href="#modules">
                {t("restaurantPage.modulesTitle")}
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="relative border-y border-[#C1673B]/10 bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
            {stats.map((stat, i) => (
              <AnimatedCounter
                key={i}
                value={stat.value}
                label={stat.label}
                icon={statIcons[i % statIcons.length]}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* MODULES */}
      <section id="modules" className="bg-[#FBF7F1] py-28 lg:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mx-auto mb-20 max-w-3xl text-center">
            <motion.span
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
  className="mb-4 inline-block text-xs font-medium uppercase tracking-[0.25em] text-[#C1673B]"
>
  {t("restaurantPage.modulesLabel")}
</motion.span>
            <h2 className="text-4xl font-light tracking-[-0.03em] text-[#3A2E27] md:text-5xl">
              <RevealText text={t("restaurantPage.modulesTitle")} />
            </h2>
            <p className="mt-4 text-lg font-light text-[#8A7A6D]">
              {t("restaurantPage.modulesSubtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {modules.map((mod, index) => (
              <ModuleCard
                key={mod.id}
                mod={mod}
                index={index}
                Icon={moduleIcons[index % moduleIcons.length]}
              />
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="bg-white py-28 lg:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mx-auto mb-20 max-w-3xl text-center">
            <span className="mb-4 inline-block text-xs font-medium uppercase tracking-[0.25em] text-[#C1673B]">
            {t("restaurantPage.galleryLabel")}
          </span>
            <h2 className="text-4xl font-light tracking-[-0.03em] text-[#3A2E27] md:text-5xl">
              {t("restaurantPage.galleryTitle")}
            </h2>
            <p className="mt-4 text-lg font-light text-[#8A7A6D]">
              {t("restaurantPage.gallerySubtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((item, i) => (
              <GalleryTile key={i} file={item.file} caption={item.caption} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL — taille réduite */}
      <section className="relative overflow-hidden bg-[#3A2E27] py-16 lg:py-20">
        <motion.div
          className="absolute -top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-[#C1673B]/10 blur-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="relative mx-auto max-w-3xl px-6 text-center lg:px-10">
          <h2 className="text-3xl font-light leading-[1.1] tracking-[-0.03em] text-white md:text-4xl">
            {t("restaurantPage.ctaTitle")}
          </h2>
          <div className="mt-8 flex justify-center">
            <MagneticButton href="/#contact">
              {t("restaurantPage.ctaButton")}
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      {/* FOOTER */}
<footer className="border-t border-[#C1673B]/10 bg-[#1E1712] py-8">
  <div className="mx-auto max-w-7xl px-6 lg:px-10">
    <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
      <p className="text-sm font-light text-gray-400">
        {t("footer.copyright", { year: new Date().getFullYear() })}
      </p>
      <div className="flex items-center gap-6">
        <span className="text-[11px] font-light uppercase tracking-[0.2em] text-[#C1673B]">
          RestoPro
        </span>
        <span className="h-4 w-px bg-[#C1673B]/20" />
        <span className="text-[11px] font-light tracking-wider text-gray-400">
          v1.0
        </span>
      </div>
    </div>
  </div>
</footer>
    </div>
  );
}