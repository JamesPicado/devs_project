"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useLanguage } from "../LanguageContext";

const SERVICES = [
  {
    number: "01",
    title: "Diagnostics & Review",
    description: "A complete initial evaluation to identify hardware, software and performance problems before any work begins.",
    features: [
      "Computer diagnosis and review",
      "Hardware and software troubleshooting",
      "Clear repair recommendations",
    ],
    note: "Ideal for slow, unstable or non-working computers",
    icon: "repair",
  },
  {
    number: "02",
    title: "Software & Operating System",
    description: "Professional installation of licensed software for work, study, design and everyday computer use.",
    features: [
      "Installation of Microsoft Office",
      "Installation of Windows 11 Pro",
      "Installation of Adobe Illustrator and other licensed programs",
    ],
    note: "Installation is available for any compatible program with a valid license",
    icon: "sales",
  },
  {
    number: "03",
    title: "Preventive Maintenance",
    description: "Professional internal cleaning and system care that helps reduce heat, noise and unexpected component failure.",
    features: [
      "Deep internal cleaning",
      "Cooling and component inspection",
      "Operating system and maintenance service",
    ],
    note: "Recommended every 6–12 months depending on use",
    icon: "maintenance",
  },
];

const SERVICE_IMAGES = [
  { src: "/img_projects/DSC02380-gallery.webp", label: "Initial assessment", detail: "Inspection before service" },
  { src: "/img_projects/DSC02354-gallery.webp", label: "Professional tools", detail: "Safe maintenance products" },
  { src: "/img_projects/spray-gallery.webp", label: "Deep cleaning", detail: "Cooling system care" },
  { src: "/img_projects/gpu-gallery.webp", label: "Component care", detail: "Graphics card maintenance" },
  { src: "/img_projects/DSC02359-gallery.webp", label: "Component installation", detail: "Precise hardware handling" },
  { src: "/img_projects/DSC02433-gallery.webp", label: "Final assembly", detail: "Careful installation" },
  { src: "/img_projects/DSC02390-gallery.webp", label: "Ready to perform", detail: "Tested and reassembled" },
];

const SERVICES_ES = [
  { title: "Diagnóstico y revisión", description: "Evaluación completa para identificar problemas de hardware, software y rendimiento antes de iniciar cualquier trabajo.", features: ["Diagnóstico y revisión del equipo", "Detección de fallas de hardware y software", "Recomendaciones claras de reparación"], note: "Ideal para equipos lentos, inestables o que no encienden" },
  { title: "Software y sistema operativo", description: "Instalación profesional de software con licencia para trabajo, estudio, diseño y uso cotidiano.", features: ["Instalación de Microsoft Office", "Instalación de Windows 11 Pro", "Adobe Illustrator y otros programas con licencia"], note: "Instalamos cualquier programa compatible que cuente con una licencia válida" },
  { title: "Mantenimiento preventivo", description: "Limpieza interna profesional y cuidado del sistema para reducir calor, ruido y fallas inesperadas.", features: ["Limpieza interna profunda", "Revisión de enfriamiento y componentes", "Sistema operativo y mantenimiento"], note: "Recomendado cada 6–12 meses según el uso" },
];

function ServiceIcon({ type }: { type: string }) {
  if (type === "repair") return <svg viewBox="0 0 48 48" className="h-8 w-8 fill-none stroke-current" aria-hidden="true"><path d="M29 9a10 10 0 0 0-11 13L7 33a4 4 0 0 0 6 6l11-11A10 10 0 0 0 37 17l-7 7-6-6 7-7Z" strokeWidth="1.5" strokeLinejoin="round" /></svg>;
  if (type === "maintenance") return <svg viewBox="0 0 48 48" className="h-8 w-8 fill-none stroke-current" aria-hidden="true"><path d="M24 14a10 10 0 1 0 10 10A10 10 0 0 0 24 14Z" strokeWidth="1.5" /><path d="M24 5v5m0 28v5M5 24h5m28 0h5M10.5 10.5l3.5 3.5m20 20 3.5 3.5m0-27L34 14M14 34l-3.5 3.5" strokeWidth="1.5" strokeLinecap="round" /></svg>;
  return <svg viewBox="0 0 48 48" className="h-8 w-8 fill-none stroke-current" aria-hidden="true"><rect x="6" y="8" width="36" height="27" rx="2" strokeWidth="1.5" /><path d="M6 29h36M17 41h14m-10-6v6m6-6v6" strokeWidth="1.5" strokeLinecap="round" /></svg>;
}

function ServiceCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [preview, setPreview] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (paused || reduceMotion) return;
    const interval = window.setInterval(() => setActive((current) => (current + 1) % SERVICE_IMAGES.length), 5500);
    return () => window.clearInterval(interval);
  }, [paused, reduceMotion]);

  const move = (direction: number) => setActive((current) => (current + direction + SERVICE_IMAGES.length) % SERVICE_IMAGES.length);

  useEffect(() => {
    if (preview === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPreview(null);
      if (event.key === "ArrowRight") setPreview((current) => current === null ? null : (current + 1) % SERVICE_IMAGES.length);
      if (event.key === "ArrowLeft") setPreview((current) => current === null ? null : (current - 1 + SERVICE_IMAGES.length) % SERVICE_IMAGES.length);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [preview]);

  return (
    <div
      className="service-carousel group relative h-full overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Service details"
    >
      <motion.div
        className="absolute inset-x-0 top-0 bottom-14 cursor-grab touch-pan-y active:cursor-grabbing"
        drag={reduceMotion ? false : "x"}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.14}
        onDragEnd={(_, info) => {
          if (Math.abs(info.offset.x) > 45) move(info.offset.x < 0 ? 1 : -1);
        }}
      >
        {SERVICE_IMAGES.map((item, index) => {
          let position = index - active;
          if (position > SERVICE_IMAGES.length / 2) position -= SERVICE_IMAGES.length;
          if (position < -SERVICE_IMAGES.length / 2) position += SERVICE_IMAGES.length;
          const isActive = position === 0;
          const isVisible = Math.abs(position) <= 2;

          if (!isVisible) return null;

          return (
            <motion.button
              key={item.src}
              type="button"
              onClick={() => isActive ? setPreview(index) : setActive(index)}
              className="service-gallery-card absolute inset-y-[3%] left-1/2 aspect-[3/4] overflow-hidden rounded-[18px] text-left"
              initial={reduceMotion ? false : { opacity: 0, scale: 0.64, x: `calc(-50% + ${position * 82}%)` }}
              animate={{
                x: `calc(-50% + ${position * 82}%)`,
                scale: isActive ? 1.06 : Math.abs(position) === 1 ? 0.76 : 0.64,
                opacity: isActive ? 1 : 0.46,
                rotateY: reduceMotion ? 0 : position * -5,
                rotateZ: reduceMotion ? 0 : position * 0.8,
                zIndex: isActive ? 4 : 3 - Math.abs(position),
              }}
              transition={{ type: "tween", duration: reduceMotion ? 0 : 0.82, ease: [0.22, 1, 0.36, 1] }}
              aria-label={`Show ${item.label}`}
              aria-current={isActive ? "true" : undefined}
            >
              <motion.div className="absolute inset-0" animate={{ scale: isActive && !reduceMotion ? 1.035 : 1 }} transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}>
                <Image src={item.src} alt="" fill sizes="(min-width: 1024px) 320px, 55vw" className="object-cover" priority={index === 0} />
              </motion.div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent px-4 pb-4 pt-12 text-white">
                <p className="text-sm font-medium">{item.label}</p>
                <p className="mt-0.5 text-[11px] text-white/55">{item.detail}</p>
              </div>
            </motion.button>
          );
        })}
      </motion.div>
      <div className="absolute inset-x-0 bottom-0 flex h-11 items-center justify-center gap-3">
        <button type="button" onClick={() => move(-1)} className="service-gallery-arrow" aria-label="Previous image">←</button>
        <button type="button" onClick={() => move(1)} className="service-gallery-arrow" aria-label="Next image">→</button>
      </div>
      {typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {preview !== null && (
            <motion.div
              className="fixed inset-0 z-[1200] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm sm:p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPreview(null)}
              role="dialog"
              aria-modal="true"
              aria-label="Image preview"
            >
              <motion.div
                key={SERVICE_IMAGES[preview].src}
                className="relative h-full w-full max-w-6xl"
                initial={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: reduceMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
                onClick={(event) => event.stopPropagation()}
              >
                <Image src={SERVICE_IMAGES[preview].src} alt={SERVICE_IMAGES[preview].label} fill sizes="100vw" className="object-contain" priority />
                <p className="absolute inset-x-0 bottom-1 text-center text-xs tracking-wide text-white/65">{SERVICE_IMAGES[preview].label}</p>
              </motion.div>
              <button type="button" className="service-preview-close" onClick={() => setPreview(null)} aria-label="Close preview">×</button>
              <button type="button" className="service-preview-arrow left-3 sm:left-6" onClick={(event) => { event.stopPropagation(); setPreview((preview - 1 + SERVICE_IMAGES.length) % SERVICE_IMAGES.length); }} aria-label="Previous image">←</button>
              <button type="button" className="service-preview-arrow right-3 sm:right-6" onClick={(event) => { event.stopPropagation(); setPreview((preview + 1) % SERVICE_IMAGES.length); }} aria-label="Next image">→</button>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </div>
  );
}

export default function ComputerServices() {
  const { language } = useLanguage();
  const es = language === "es";
  const [expandedServices, setExpandedServices] = useState<Set<number>>(() => new Set());

  const toggleService = (index: number) => {
    setExpandedServices((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <section className="relative overflow-hidden px-4 py-24 sm:px-6 lg:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_45%,rgba(22,140,255,0.12),transparent_30%)]" />
      <div className="relative mx-auto max-w-[1480px]">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid gap-10 border-y border-[var(--foreground)]/15 py-14 lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:gap-6 lg:py-20">
          <div>
            <p className="text-[13px] font-medium uppercase tracking-[0.25em] text-[#168cff]">{es ? "Hardware y servicios técnicos" : "Hardware & Technical Services"}</p>
            <h2 className="mt-5 max-w-2xl text-4xl font-semibold leading-[1.08] tracking-[-0.04em] sm:text-5xl lg:text-[56px]">{es ? <>Tecnología confiable,<br />más allá de la pantalla.</> : <>Reliable technology,<br />beyond the screen.</>}</h2>
            <p className="mt-6 max-w-xl text-[17px] leading-7 text-[var(--foreground)]/60">{es ? "Cuidado profesional para los equipos de los que depende tu hogar o negocio, desde el diagnóstico preciso hasta el mantenimiento." : "Professional care for the computers your home or business depends on—from precise diagnostics to the right replacement equipment."}</p>
          </div>
          <div className="mx-auto h-[300px] w-full max-w-[820px] sm:h-[360px] lg:h-[420px]"><ServiceCarousel /></div>
        </motion.div>

        <div className="grid items-start border-b border-[var(--foreground)]/15 md:grid-cols-3">
          {SERVICES.map((service, index) => (
            <motion.article key={service.title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className={`group relative flex flex-col px-7 py-10 sm:px-9 lg:py-12 ${index ? "border-t border-[var(--foreground)]/15 md:border-l md:border-t-0" : ""}`}>
              <div className="flex items-center justify-between"><span className="text-sm text-[#168cff]">{service.number}</span><span className="text-[#168cff] transition-transform duration-300 group-hover:scale-110"><ServiceIcon type={service.icon} /></span></div>
              <h3 className="mt-10 text-2xl font-medium tracking-[-0.025em]">{es ? SERVICES_ES[index].title : service.title}</h3>
              <p className="mt-4 max-w-sm text-[15px] leading-6 text-[var(--foreground)]/60">{es ? SERVICES_ES[index].description : service.description}</p>
              <button
                type="button"
                onClick={() => toggleService(index)}
                className="mt-6 flex w-fit items-center gap-3 text-sm text-[#168cff]"
                aria-expanded={expandedServices.has(index)}
              >
                {expandedServices.has(index) ? (es ? "Ver menos" : "Show less") : (es ? "Ver más" : "View more")}
                <motion.span animate={{ rotate: expandedServices.has(index) ? 45 : 0 }} aria-hidden="true">＋</motion.span>
              </button>
              <AnimatePresence initial={false}>
                {expandedServices.has(index) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="mt-6 border-t border-[var(--foreground)]/10 pt-6">
                      <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--foreground)]/45">{es ? "Servicios ofrecidos" : "Services offered"}</p>
                      <ul className="mt-4 space-y-3">
                        {(es ? SERVICES_ES[index].features : service.features).map((feature) => (
                          <li key={feature} className="flex items-start gap-3 text-[14px] leading-5 text-[var(--foreground)]/70">
                            <span className="mt-[8px] h-px w-3 shrink-0 bg-[#168cff]" aria-hidden="true" />
                            <span className="min-w-0 flex-1">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="mt-6 text-xs italic text-[var(--foreground)]/45">{es ? SERVICES_ES[index].note : service.note}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <a
                href="#contact"
                onClick={() => window.dispatchEvent(new CustomEvent("service-selected", { detail: service.title }))}
                className="mt-auto inline-flex w-fit items-center gap-5 border-b border-blue-500/70 pb-2 pt-8 text-sm text-[#168cff]"
              >
                {es ? "Solicitar servicio" : "Request service"} <span aria-hidden="true">→</span>
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
