import { useMemo, useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  ImageOff,
  ArrowRight, 
  ChevronRight, 
  Award, 
  ExternalLink,
  TrendingUp,
  Users,
  CheckCircle2,
  LayoutGrid,
  Settings,
  Database,
  PieChart,
  Briefcase,
  X,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
} from "lucide-react";
import i18n from "../i18n/i18n";
import HotelProCover from "../asset/Projet/HotelPro.png";

export function meta() {
  return [
    { title: `HotelPro — ${i18n.t("navigation.projects")} · Kyronet` },
    { name: "description", content: i18n.t("hotelproPage.description") },
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

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

function DecorativeShapes() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div 
        className="absolute -top-40 -right-40 w-96 h-96 rounded-full border border-[#C9A84C]/20"
        animate={{ 
          rotate: 360,
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          rotate: { duration: 120, repeat: Infinity, ease: "linear" },
          scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
        }}
      />
      <motion.div 
        className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full border border-[#C9A84C]/10"
        animate={{ 
          rotate: -360,
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          rotate: { duration: 140, repeat: Infinity, ease: "linear" },
          scale: { duration: 10, repeat: Infinity, ease: "easeInOut" }
        }}
      />
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-[#C9A84C]/5"
        animate={{ 
          rotate: 360,
          scale: [1, 1.3, 1]
        }}
        transition={{ 
          rotate: { duration: 160, repeat: Infinity, ease: "linear" },
          scale: { duration: 12, repeat: Infinity, ease: "easeInOut" }
        }}
      />
    </div>
  );
}

function ElegantCard({ children, className = "", index = 0 }: { children: React.ReactNode; className?: string; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className={`relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-700 border border-[#C9A84C]/10 hover:border-[#C9A84C]/30 ${className}`}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white to-[#F7FAFC] opacity-0 hover:opacity-100 transition-opacity duration-700" />
      <div className="relative">
        {children}
      </div>
    </motion.div>
  );
}

function ImageSlot({
  file,
  caption,
  className = "",
  index = 0,
  onClick,
}: {
  file: string;
  caption?: string;
  className?: string;
  index?: number;
  onClick?: () => void;
}) {
  const [failed, setFailed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className={`group cursor-pointer ${className}`}
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded-2xl bg-[#F7FAFC] shadow-sm hover:shadow-xl transition-all duration-700 border border-[#C9A84C]/10 hover:border-[#C9A84C]/30">
        <div className="aspect-[4/3] relative">
          {!failed ? (
            <>
              <img
                src={`/hotelpro/${file}`}
                alt={caption ?? file}
                onError={() => setFailed(true)}
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <motion.div 
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                whileHover={{ scale: 1.1 }}
              >
                <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 border border-[#C9A84C]/20 shadow-xl">
                  <ExternalLink className="h-6 w-6 text-[#1A365D]" />
                </div>
              </motion.div>
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-sm text-white font-light text-center bg-black/50 backdrop-blur-sm py-2 px-4 rounded-full inline-block mx-auto w-full">
                  {caption}
                </p>
              </div>
            </>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#F7FAFC] text-gray-400">
              <ImageOff className="h-10 w-10" strokeWidth={1.2} />
              <span className="px-4 text-center text-xs font-light tracking-wider">
                {file}
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function AnimatedCounter({ value, label, icon: Icon, index = 0 }: { value: string; label: string; icon?: any; index?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const target = parseInt(value.replace(/[^0-9]/g, ''));
  const suffix = value.replace(/[0-9]/g, '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const duration = 2000;
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
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [target]);

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="text-center"
    >
      <div className="flex flex-col items-center gap-2">
        {Icon && (
          <div className="text-[#C9A84C]">
            <Icon className="h-6 w-6" strokeWidth={1.5} />
          </div>
        )}
        <div className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-[#1A365D]">
          {count}{suffix}
        </div>
        <div className="text-sm font-light text-[#718096] tracking-wider uppercase">
          {label}
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================ //
// COMPOSANT LIGHTBOX (PLEIN ÉCRAN)                              //
// ============================================================ //
function Lightbox({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}: {
  images: GalleryItem[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose, onNext, onPrev]);

  const currentImage = images[currentIndex];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-lg flex items-center justify-center"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-300"
      >
        <X className="h-8 w-8" />
      </button>

      <div className="absolute top-6 left-6 z-10 text-white/60 text-sm font-light tracking-wider">
        {currentIndex + 1} / {images.length}
      </div>

      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-6 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-300"
        >
          <ChevronLeft className="h-8 w-8" />
        </button>
      )}

      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="relative max-w-[90vw] max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={`/hotelpro/${currentImage.file}`}
          alt={currentImage.caption}
          className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg shadow-2xl"
        />
        {currentImage.caption && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm px-6 py-3 rounded-full">
            <p className="text-white text-sm font-light tracking-wider">
              {currentImage.caption}
            </p>
          </div>
        )}
      </motion.div>

      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-6 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-300"
        >
          <ChevronRightIcon className="h-8 w-8" />
        </button>
      )}

      {images.length > 1 && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentIndex 
                  ? 'w-8 bg-[#C9A84C]' 
                  : 'w-3 bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}

const moduleIcons = [LayoutGrid, Settings, Database, PieChart, Briefcase, Users];

export default function HotelProPage() {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const modules = useMemo(
    () => (t("hotelproPage.modules", { returnObjects: true }) as ModuleItem[]) ?? [],
    [t],
  );
  const gallery = useMemo(
    () => (t("hotelproPage.gallery", { returnObjects: true }) as GalleryItem[]) ?? [],
    [t],
  );
  const stats = useMemo(
    () => (t("hotelproPage.stats", { returnObjects: true }) as Stat[]) ?? [],
    [t],
  );

  const statIcons = [TrendingUp, Users, Award];

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % gallery.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  return (
    <div className="bg-[#F7FAFC] text-[#2D3748] selection:bg-[#C9A84C] selection:text-white overflow-x-hidden">
      
      {/* HEADER */}
      <motion.header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#C9A84C]/10' 
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <Link
            to="/"
            className="group inline-flex items-center gap-3 text-sm font-light text-[#718096] transition-all duration-300 hover:text-[#1A365D]"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1 text-[#C9A84C]" />
            <span className="uppercase text-xs tracking-[0.15em]">{t("hotelproPage.back")}</span>
          </Link>
          <motion.span 
            className="text-sm font-medium text-[#C9A84C]"
            whileHover={{ scale: 1.05 }}
          >
            Kyronet
          </motion.span>
        </div>
      </motion.header>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#1A365D]">
        <DecorativeShapes />
        
        <div className="absolute inset-0 -z-10">
          <motion.div 
            className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-[#C9A84C]/15 to-transparent rounded-full blur-3xl"
            animate={{ 
              x: [0, 50, 0],
              y: [0, -30, 0]
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#C9A84C]/8 to-transparent rounded-full blur-3xl"
            animate={{ 
              x: [0, -50, 0],
              y: [0, 30, 0]
            }}
            transition={{ 
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#2D4A7A]/20 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
            }}
            transition={{ 
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="mx-auto max-w-7xl px-6 py-32 lg:py-40 lg:px-10 w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              className="space-y-8"
              initial="initial"
              animate="animate"
              variants={staggerContainer}
            >
              <motion.h1 
                variants={fadeInUp}
                className="text-6xl sm:text-7xl md:text-8xl font-light leading-[1.05] tracking-[-0.03em] text-white"
              >
                {t("hotelproPage.title")}
              </motion.h1>

              <motion.p 
                variants={fadeInUp}
                className="text-2xl font-light text-[#C9A84C] leading-relaxed tracking-[-0.01em] max-w-xl"
              >
                {t("hotelproPage.subtitle")}
              </motion.p>

              <motion.p 
                variants={fadeInUp}
                className="text-lg text-gray-300/80 leading-relaxed max-w-xl font-light"
              >
                {t("hotelproPage.description")}
              </motion.p>
            </motion.div>

            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <motion.div 
                className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#C9A84C]/20"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="aspect-[4/3] relative">
                  <img
                    src={HotelProCover}
                    alt={t("hotelproPage.title")}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A365D]/30 to-transparent" />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-[#C9A84C]/10 bg-white py-16 relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-[#C9A84C]/5 to-transparent"
          animate={{ 
            x: ['-100%', '100%'],
          }}
          transition={{ 
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <div className="mx-auto max-w-7xl px-6 lg:px-10 relative">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
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
      <section className="py-28 lg:py-36 bg-[#F7FAFC]">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mb-4 inline-block text-xs font-medium uppercase tracking-[0.25em] text-[#C1673B]"
            >
              {t("restaurantPage.modulesLabel")}
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-light tracking-[-0.03em] text-[#1A365D]">
              {t("hotelproPage.modulesTitle")}
            </h2>
            <p className="mt-4 text-lg text-[#718096] font-light">
              {t("hotelproPage.modulesSubtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {modules.map((mod, index) => {
              const IconComponent = moduleIcons[index % moduleIcons.length];
              return (
                <ElegantCard key={mod.id} className="p-8" index={index}>
                  <motion.div 
                    className="space-y-4"
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center justify-between">
                      <motion.div 
                        className="w-12 h-12 rounded-xl bg-[#1A365D] flex items-center justify-center text-white text-lg font-light relative overflow-hidden"
                        whileHover={{ scale: 1.1 }}
                      >
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-r from-[#1A365D] to-[#C9A84C]"
                          animate={{ 
                            opacity: [0.5, 1, 0.5]
                          }}
                          transition={{ 
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                        <span className="relative z-10">
                          {IconComponent && <IconComponent className="h-5 w-5" />}
                        </span>
                      </motion.div>
                      <ChevronRight className="h-5 w-5 text-[#C9A84C] group-hover:text-[#1A365D] transition-colors duration-300" />
                    </div>
                    
                    <h3 className="text-xl font-medium tracking-[-0.02em] text-[#1A365D]">
                      {mod.title}
                    </h3>
                    
                    <p className="text-[#718096] leading-relaxed font-light text-sm">
                      {mod.description}
                    </p>
                    
                    <motion.ul 
                      className="space-y-2.5 pt-2"
                      initial="initial"
                      animate="animate"
                      variants={staggerContainer}
                    >
                      {mod.features?.map((feature, i) => (
                        <motion.li
                          key={i}
                          variants={fadeInUp}
                          className="flex items-start gap-3 text-sm text-[#2D3748] font-light"
                        >
                          <CheckCircle2 className="h-4 w-4 text-[#C9A84C] mt-0.5 shrink-0" />
                          {feature}
                        </motion.li>
                      ))}
                    </motion.ul>
                  </motion.div>
                </ElegantCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* GALLERY AVEC LIGHTBOX */}
      <section className="bg-white py-28 lg:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
           <span className="mb-4 inline-block text-xs font-medium uppercase tracking-[0.25em] text-[#C1673B]">
  {t("restaurantPage.galleryLabel")}
</span>
            <h2 className="text-4xl md:text-5xl font-light tracking-[-0.03em] text-[#1A365D]">
              {t("hotelproPage.galleryTitle")}
            </h2>
            <p className="mt-4 text-lg text-[#718096] font-light">
              {t("hotelproPage.gallerySubtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((item, i) => (
              <ImageSlot 
                key={i} 
                file={item.file} 
                caption={item.caption} 
                index={i}
                onClick={() => openLightbox(i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ================================================ */}
      {/* CTA FINAL - Version Or & Blanc (AJOUTÉ)          */}
      {/* ================================================ */}
      <section className="relative overflow-hidden bg-[#C9A84C] py-16 lg:py-20">
        <motion.div
          className="absolute -top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-white/10 blur-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="relative mx-auto max-w-3xl px-6 text-center lg:px-10">
          <h2 className="text-3xl font-light leading-[1.1] tracking-[-0.03em] text-white md:text-4xl">
            {t("hotelproPage.ctaTitle")}
          </h2>
          <div className="mt-8 flex justify-center">
            <Link
              to="/#contact"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-white px-8 py-4 text-sm font-medium uppercase tracking-[0.15em] text-[#C9A84C] transition-all duration-500 hover:bg-white/90 hover:shadow-xl"
            >
              {t("hotelproPage.ctaButton")}
              <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

     {/* FOOTER */}
<footer className="border-t border-[#C9A84C]/10 bg-[#1A365D] py-8">
  <div className="mx-auto max-w-7xl px-6 lg:px-10">
    <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
      <p className="text-sm text-gray-400 font-light">
        {t("footer.copyright", { year: new Date().getFullYear() })}
      </p>
      <div className="flex items-center gap-6">
        <span className="text-[11px] text-[#C9A84C] font-light tracking-[0.2em] uppercase">
          HotelPro
        </span>
        <span className="w-px h-4 bg-[#C9A84C]/20" />
        <span className="text-[11px] text-gray-400 font-light tracking-wider">
          v1.0
        </span>
      </div>
    </div>
  </div>
</footer>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {lightboxOpen && gallery.length > 0 && (
          <Lightbox
            images={gallery}
            currentIndex={currentImageIndex}
            onClose={closeLightbox}
            onNext={nextImage}
            onPrev={prevImage}
          />
        )}
      </AnimatePresence>
    </div>
  );
}