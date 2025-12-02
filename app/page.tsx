"use client";

import { motion, AnimatePresence, useInView, type Variants } from "framer-motion";
import { useState, useEffect, useRef } from "react";
const SKILL_GALLERY_ROWS = [
  {
    direction: "left",
    images: [
      { src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80", alt: "Retrato creativo con luces neón" },
      { src: "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?auto=format&fit=crop&w=1600&q=80", alt: "Diseño interior cálido" },
      { src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1600&q=80", alt: "Ambiente arquitectónico moderno" },
      { src: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1600&q=80", alt: "Detalle editorial de moda" },
    ],
  },
  {
    direction: "right",
    images: [
      { src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80", alt: "Retrato creativo con luces neón" },
      { src: "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?auto=format&fit=crop&w=1600&q=80", alt: "Diseño interior cálido" },
      { src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1600&q=80", alt: "Ambiente arquitectónico moderno" },
      { src: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1600&q=80", alt: "Detalle editorial de moda" },
    ],
  },
  {
    direction: "left",
    images: [
      { src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80", alt: "Retrato creativo con luces neón" },
      { src: "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?auto=format&fit=crop&w=1600&q=80", alt: "Diseño interior cálido" },
      { src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1600&q=80", alt: "Ambiente arquitectónico moderno" },
      { src: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1600&q=80", alt: "Detalle editorial de moda" },
    ],
  },
] as const;

const GALLERY_SCROLL_FRAMES = {
  left: ["0%", "-50%"],
  right: ["-50%", "0%"],
} as const;

const GALLERY_SCROLL_DURATION = 45;

const PROJECTS = [
  {
    title: "Temco Engineered Products, Inc.",
    role: "Truck Manufacturers",
    image: "/img_projects/temcousa.png",
    imageAlt: "Pagina de inicio, con 3 imagenes diferentes tematicasWelder performing high-precision metal fabrication during the manufacturing process at TEMCO.",
    description:
      "Sitio web corporativo para destacar capacidades industriales, procesos de manufactura, control de calidad y catálogo de servicios, con secciones claras y enfoque en convertir clientes B2B.",
    highlights: [
      "Architected a modular Next.js dashboard with live scheduling, advanced filtering, and financial rollups.",
      "Set up streaming data sync jobs that hydrate insights dashboards in seconds instead of hours.",
      "Partnered with product to prototype new coaching tools, compressing release cycles from weeks to days.",
    ],
    stack: ["Next.js", "React Query", "Node.js", "PostgreSQL", "AWS", "Tailwind"],
    link: "https://temcousa.com",
    accent: "from-blue-500/40 via-cyan-400/20 to-transparent",
  },
  {
    title: "Restaurante Costa Rica",
    role: "Full-Stack Engineer · Atlantbh",
    image: "/img_projects/temcousa.png",
    imageAlt: "Analytics dashboard mockup with charts and KPIs",
    description:
      "Diseñé una web moderna para un restaurante, con enfoque en elegancia y usabilidad. Incluye menú digital interactivo, sistema de reservas, galería de platillos, sección del chef y reseñas dinámicas de clientes.",
    highlights: [
      "Menú digital interactivo: Navegación fluida con imágenes de alta calidad, precios y descripciones de los platillos.",
      "Sistema de reservas: Integración de un formulario dinámico que permite agendar mesas en tiempo real.",
      "Galería dinámica: Carrusel de fotografías optimizado con animaciones suaves y carga diferida.",
    ],
    stack: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
    link: "",
    accent: "from-indigo-500/40 via-purple-500/20 to-transparent",
  },
  {
    title: "Gym Costa Rica",
    role: "Full-Stack Engineer · Atlantbh",
    image: "/img_projects/temcousa.png",
    imageAlt: "Analytics dashboard mockup with charts and KPIs",
    description:
      "Diseñé una web moderna para un restaurante, con enfoque en elegancia y usabilidad. Incluye menú digital interactivo, sistema de reservas, galería de platillos, sección del chef y reseñas dinámicas de clientes.",
    highlights: [
      "Menú digital interactivo: Navegación fluida con imágenes de alta calidad, precios y descripciones de los platillos.",
      "Sistema de reservas: Integración de un formulario dinámico que permite agendar mesas en tiempo real.",
      "Galería dinámica: Carrusel de fotografías optimizado con animaciones suaves y carga diferida.",
    ],
    stack: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
    link: "",
    accent: "from-indigo-500/40 via-purple-500/20 to-transparent",
  },
] as const;

const PROJECT_GRID_VARIANTS = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.1,
    },
  },
} as const;

const PROJECT_CARD_VARIANTS = {
  hidden: { opacity: 0, y: 36, rotateX: -6, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
} as const;

const EXPERIENCES = [
  {
    title: "Diseño Web / UI–UX",
    subtitle: "Software Engineer | Aplicaciones / Sistemas Web",
    highlights: [
      "Diseño de sitios web modernos y responsivos con enfoque en usabilidad (UX) y estética profesional (UI).",
      "Creación de landing pages optimizadas para conversiones y campañas marketing.",
      "Diseño de interfaces intuitivas para paneles administrativos, dashboards y herramientas internas.",
    ],
    badge: "Soluciones a medida",
    accent: "from-sky-500/45 via-blue-500/10 to-transparent",
    icon: "/icons/diseno_web.png",
  },
  {
    title: "Sistemas Web y Aplicaciones",
    subtitle: "Software Engineer | Aplicaciones / Sistemas Web",
    highlights: [
      "Desarrollo de sistemas empresariales a la medida (inventarios, CRM, ventas, control de procesos).",
      "Implementación de plataformas de reservas, catálogos dinámicos, blogs, ecommerce",
      "Migración y modernización de sistemas existentes a tecnologías web actuales.",
    ],
    badge: "Plataformas",
    accent: "from-emerald-500/45 via-lime-400/15 to-transparent",
    icon: "/icons/sistemas_aplicaciones.png",
  },
  {
    title: "Contenido Visual / Fotografía / Multimedia",
    subtitle: "Software Engineer | Aplicaciones / Sistemas Web",
    highlights: [
      "Producción y edición de fotografías para sitios web, catálogos y contenido corporativo.",
      "Creación de material visual para banners, portadas, redes sociales y contenido publicitario.",
      "Captura visual profesional orientada a negocios como restaurantes, productos, servicios, turismo, etc.",
    ],
    badge: "Branding",
    accent: "from-fuchsia-500/40 via-pink-500/15 to-transparent",
    icon: "/icons/contenido_visual.png",
  },
  {
    title: "Mantenimiento y soporte web mensual",
    subtitle: "",
    highlights: [
      "Actualizaciones, mejoras, backups y optimización continua del sitio.",
      "Corrección de errores, monitoreo y mejoras de seguridad.",
    ],
    badge: "Continuidad",
    accent: "from-indigo-500/40 via-purple-500/20 to-transparent",
    icon: "/icons/soporte_mantenimiento.png",
  },
] as const;

const ORBIT_GLOWS = [
  { left: "8%", top: "25%", size: 260, duration: 8, delay: 0, colors: ["rgba(56,189,248,0.4)", "rgba(59,130,246,0.1)"] },
  { left: "38%", top: "10%", size: 320, duration: 10, delay: 0.4, colors: ["rgba(129,140,248,0.35)", "rgba(56,189,248,0.08)"] },
  { left: "62%", top: "32%", size: 280, duration: 9, delay: 0.7, colors: ["rgba(14,165,233,0.35)", "rgba(59,130,246,0.08)"] },
  { left: "80%", top: "18%", size: 240, duration: 11, delay: 1, colors: ["rgba(99,102,241,0.32)", "rgba(59,130,246,0.1)"] },
] as const;

const STREAKS: never[] = [];

const HERO_TEXT_SEGMENTS = [
  { text: "Java and React/Next.js ", className: "text-[var(--foreground)]" },
  { text: "developer", className: "text-blue-500" },
] as const;

export default function HomePage() {
  const [navOpen, setNavOpen] = useState(false);
  const [socialOpen, setSocialOpen] = useState(false);
  const [themeMode, setThemeMode] = useState<"dark" | "light">("dark");
  const [themeReady, setThemeReady] = useState(false);
  const [galleryModal, setGalleryModal] = useState<{ src: string; alt: string } | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);
  const experienceRef = useRef<HTMLElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);

  const heroInView = useInView(heroRef, { amount: 0.75 });
  const [textCycle, setTextCycle] = useState(0);
  const letterVariants: Variants = {
    hidden: { opacity: 0, x: -12 },
    visible: {
      opacity: 0.95,
      x: 0,
      transition: { duration: 0.28, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setNavOpen(false);
        setSocialOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (heroInView) {
      setTextCycle((prev) => prev + 1);
    }
  }, [heroInView]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem("theme-mode");
    const initial: "dark" | "light" = stored === "light" ? "light" : "dark";
    setThemeMode(initial);
    document.documentElement.dataset.theme = initial;
    setThemeReady(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    document.documentElement.dataset.theme = themeMode;
    localStorage.setItem("theme-mode", themeMode);
  }, [themeMode]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setNavOpen(false);
      setSocialOpen(false);
    }
  };
  let letterCounter = 0;
  return (
    <div className="relative min-h-screen w-full bg-[var(--background)] text-[var(--foreground)]">
      {/* Subtle dot background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,var(--dot-color)_1.4px,transparent_1.4px)] bg-[length:14px_14px] opacity-45" />

      {/* Vertical animated lines */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {ORBIT_GLOWS.map((glow) => (
          <motion.div
            key={`${glow.left}-${glow.top}`}
            className="absolute rounded-[999px] blur-3xl mix-blend-screen"
            initial={{ scale: 0.9, y: "-12%" }}
            animate={{ scale: 1.2, y: "14%" }}
            transition={{
              duration: glow.duration,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: glow.delay,
            }}
            style={{
              left: glow.left,
              top: glow.top,
              width: glow.size,
              height: glow.size,
              background: `radial-gradient(circle, ${glow.colors[0]} 0%, ${glow.colors[1]} 60%, transparent 100%)`,
              boxShadow: "0 0 40px rgba(14,165,233,0.15)",
            }}
          />
        ))}

        <motion.div
          className="absolute left-1/2 top-[32%] -translate-x-1/2 rounded-full blur-[120px] mix-blend-screen"
          initial={{ opacity: 0.2, scale: 0.95 }}
          animate={{ opacity: 0.35, scale: 1.05 }}
          transition={{ duration: 5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          style={{
            width: 520,
            height: 520,
            background: "radial-gradient(circle, rgba(255,255,255,0.45) 0%, rgba(14,165,233,0.15) 45%, transparent 75%)",
          }}
        />

        <div className="absolute inset-0 rotate-[25deg] opacity-20">
          <div className="w-full h-full bg-[radial-gradient(circle,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[length:120px_120px]" />
        </div>
      </div>

      {/* NAVBAR */}
      <div
        className="w-full flex justify-center mt-0 mb-4 sticky top-0 z-20 bg-[rgba(var(--background-rgb),0.85)] backdrop-blur-md"
        ref={navRef}
      >
        <div className="backdrop-blur-xl bg-[rgba(var(--background-rgb),0.65)] border border-white/10 text-sm px-10 py-4 rounded-full flex items-center gap-8 shadow-[0_0_20px_rgba(0,0,0,0.4)] relative">
          {/* Navigation dropdown */}
          <div className="relative mr-6">
            <button
              onClick={() => {
                setNavOpen((prev) => !prev);
                setSocialOpen(false);
              }}
              className="text-[15px] font-medium hover:text-blue-400 transition"
            >
              Navigation
            </button>
            <AnimatePresence>
              {navOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: -6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -6 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-44 backdrop-blur-xl bg-[rgba(var(--background-rgb),0.85)] border border-white/10 rounded-lg py-2 z-50"
                >
                  <button
                    onClick={() => scrollToSection("home")}
                    className="block w-full text-left px-4 py-2 text-sm hover:text-blue-400 transition"
                  >
                    Home
                  </button>
                  <button
                    onClick={() => scrollToSection("experience")}
                    className="block w-full text-left px-4 py-2 text-sm hover:text-blue-400 transition"
                  >
                    Experience
                  </button>
                  <button
                    onClick={() => scrollToSection("skills")}
                    className="block w-full text-left px-4 py-2 text-sm hover:text-blue-400 transition"
                  >
                    Skills
                  </button>
                  <button
                    onClick={() => scrollToSection("projects")}
                    className="block w-full text-left px-4 py-2 text-sm hover:text-blue-400 transition"
                  >
                    Projects
                  </button>
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="block w-full text-left px-4 py-2 text-sm hover:text-blue-400 transition"
                  >
                    Contact
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Social dropdown */}
          <div className="relative">
            <button
              className="text-[15px] font-medium hover:text-blue-400 transition"
              onClick={() => {
                setSocialOpen((prev) => !prev);
                setNavOpen(false);
              }}
            >
              Social
            </button>
            <AnimatePresence>
              {socialOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: -6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -6 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-44 backdrop-blur-xl bg-[rgba(var(--background-rgb),0.85)] border border-white/10 rounded-lg py-2 z-50"
                >
                  <a
                    href="https://wa.me/50600000000"
                    target="_blank"
                    rel="noreferrer"
                    className="block px-4 py-2 text-sm hover:text-blue-400 transition"
                  >
                    WhatsApp
                  </a>
                  <a
                    href="https://instagram.com/tuusuario"
                    target="_blank"
                    rel="noreferrer"
                    className="block px-4 py-2 text-sm hover:text-blue-400 transition"
                  >
                    Instagram
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Theme toggle */}
          {themeReady ? (
            <button
              onClick={() => setThemeMode((prev) => (prev === "dark" ? "light" : "dark"))}
              className="relative flex items-center gap-2 rounded-full border border-white/15 bg-[rgba(var(--background-rgb),0.35)] px-4 py-2 shadow-[0_0_20px_rgba(0,0,0,0.35)] transition hover:border-white/30"
              aria-label="Cambiar tema"
            >
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xl transition ${
                  themeMode === "dark" ? "bg-yellow-300/20 text-yellow-200" : "text-[var(--foreground)]/50"
                }`}
              >
                ☾
              </span>
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xl transition ${
                  themeMode === "light" ? "bg-yellow-300/30 text-yellow-500" : "text-[var(--foreground)]/50"
                }`}
              >
                ☀
              </span>
            </button>
          ) : (
            <div className="relative flex items-center gap-2 rounded-full border border-white/15 bg-[rgba(var(--background-rgb),0.35)] px-4 py-2 opacity-40 pointer-events-none">
              <span className="flex h-8 w-8 items-center justify-center rounded-full text-xl">☾</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full text-xl">☀</span>
            </div>
          )}
        </div>
      </div>

      {/* HERO TEXT */}
      <section
        id="home"
        ref={heroRef}
        className="relative z-10 flex flex-col items-center justify-center text-center min-h-screen px-4 sm:px-6"
      >
        <p className="text-xs uppercase tracking-[0.35em] text-[var(--foreground)]/70 mb-4">
          Hello, I’m James Picado. A passionate Software Engineer.
        </p>

        <h1 className="font-extrabold text-3xl md:text-5xl lg:text-4xl leading-tight max-w-3xl">
          <motion.span key={textCycle} className="inline-flex flex-wrap justify-center">
            {HERO_TEXT_SEGMENTS.map((segment, segmentIdx) => {
              const chars = segment.text.split("");
              const rendered = chars.map((char, charIdx) => {
                const index = letterCounter + charIdx;
                return (
                  <motion.span
                    key={`${segmentIdx}-${charIdx}-${textCycle}`}
                    transition={{ delay: index * 0.035 }}
                    variants={letterVariants}
                    initial="hidden"
                    animate="visible"
                    className="inline-block"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                );
              });
              letterCounter += chars.length;
              return (
                <span
                  key={`${segmentIdx}-${textCycle}`}
                  className={`whitespace-pre ${segment.className}`}
                >
                  {rendered}
                </span>
              );
            })}
            <motion.span
              key={`cursor-${textCycle}`}
              custom={letterCounter}
              variants={letterVariants}
              initial="hidden"
              animate="visible"
              className="inline-block text-blue-400"
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                |
              </motion.span>
            </motion.span>
          </motion.span>
        </h1>

        <div className="mt-8 flex gap-3 text-sm">
          <a
            href="/cv.pdf"
            className="bg-[var(--foreground)]/10 backdrop-blur-md border border-[var(--foreground)]/20 text-[var(--foreground)] px-5 py-2.5 rounded-md hover:bg-[var(--foreground)]/15 transition"
          >
            Download CV
          </a>

          <button className="bg-blue-700/50 backdrop-blur-md border border-blue-500/30 text-[var(--foreground)] px-5 py-2.5 rounded-md hover:bg-blue-700 transition">
            Contact Me
          </button>
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section
        id="experience"
        ref={experienceRef}
        className="relative z-10 w-full min-h-screen bg-[var(--background)] text-[var(--foreground)] px-4 py-24 sm:px-6 overflow-hidden"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 right-12 h-80 w-80 rounded-full bg-blue-500/10 blur-[140px]" />
          <div className="absolute bottom-10 left-10 h-72 w-72 rounded-full bg-emerald-500/10 blur-[160px]" />
          <div className="absolute inset-x-12 top-16 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-xs uppercase tracking-[0.4em] text-[var(--foreground)]/50">Servicios y experiencia</p>
            <motion.h2
              key={themeMode}
              className={`text-3xl sm:text-4xl font-black mt-4 uppercase tracking-[0.2em] sm:tracking-[0.35em] ${
                themeMode === "dark" ? "text-white" : "text-black"
              }`}
              style={{ fontFamily: "var(--font-mono, 'Space Grotesk', sans-serif)" }}
              initial={{ opacity: 1 }}
              animate={{
                color: themeMode === "dark" ? ["#f8fafc", "#94a3b8", "#f8fafc"] : ["#0f172a", "#1f2937", "#0f172a"],
                y: [0, -8, 0],
                textShadow: [
                  "0 0 0px rgba(59,130,246,0.0)",
                  "0 0 12px rgba(59,130,246,0.6)",
                  "0 0 0px rgba(59,130,246,0.0)",
                ],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {Array.from("EXPERIENCIA").map((letter, idx) => (
                <motion.span
                  key={`${letter}-${idx}`}
                  animate={{ y: [0, idx % 2 === 0 ? -6 : 4, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: idx * 0.08, ease: "easeInOut" }}
                  className="inline-block"
                >
                  {letter}
                </motion.span>
              ))}
            </motion.h2>
            <p className="mt-5 text-lg leading-relaxed text-[var(--foreground)]/90 tracking-[0.02em]">
              Diseño y desarrollo soluciones digitales adaptadas a cualquier necesidad, desde interfaces y sitios web hasta aplicaciones y sistemas empresariales, incluyendo contenido visual, optimización y soporte continuo.
            </p>
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            {EXPERIENCES.map((exp, index) => (
              <motion.article
                key={exp.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-[rgba(var(--background-rgb),0.78)] p-6 md:p-8 shadow-[0_25px_80px_rgba(0,0,0,0.35)]"
              >
                <div className="absolute inset-0 opacity-50 group-hover:opacity-80 transition duration-300">
                  <div className={`absolute inset-[1px] rounded-[26px] bg-gradient-to-br ${exp.accent} blur-3xl`} />
                  <div className="absolute inset-[1px] rounded-[26px] border border-white/10" />
                </div>

                <div className="relative z-10 flex items-center justify-between text-[11px] uppercase tracking-[0.35em] text-[var(--foreground)]/55">
                  <span>{exp.badge}</span>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </div>

                <div className="relative z-10 mt-5 flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-2xl overflow-hidden">
                    {typeof exp.icon === "string" && exp.icon.endsWith(".png") ? (
                      <img src={exp.icon} alt={`${exp.title} icon`} className="h-10 w-10 object-contain" />
                    ) : (
                      exp.icon || "∎"
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold leading-snug text-[var(--foreground)]">{exp.title}</h3>
                    {exp.subtitle ? (
                      <p className="text-[12px] uppercase tracking-[0.25em] text-[var(--foreground)]/55 mt-2">{exp.subtitle}</p>
                    ) : null}
                  </div>
                </div>

                <ul className="relative z-10 mt-6 space-y-3 text-sm text-[var(--foreground)]/80">
                  {exp.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3">
                      <span className="mt-[7px] inline-flex h-2 w-2 rounded-full bg-blue-400/80 shadow-[0_0_10px_rgba(56,189,248,0.6)]" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className="relative z-10 w-full min-h-screen bg-[var(--background)] text-[var(--foreground)] px-0 py-24 overflow-hidden">
        <div className="space-y-12">
          <div className="text-center space-y-4 px-4 sm:px-6">
            <p className="text-xs uppercase tracking-[0.5em] text-[var(--foreground)]/60">Photography</p>
            <h2 className="text-4xl font-extrabold">Galería dinámica</h2>
            <p className="text-sm text-[var(--foreground)]/75 max-w-3xl mx-auto">
             Produccion de fotografias para turismo etc
            </p>
          </div>

          <div className="space-y-10">
            {SKILL_GALLERY_ROWS.map((row, rowIdx) => {
              const animation = row.direction === "left" ? GALLERY_SCROLL_FRAMES.left : GALLERY_SCROLL_FRAMES.right;
              const trackClass = `flex w-max gap-6 sm:gap-8 ${row.direction === "right" ? "flex-row-reverse" : ""}`;
              return (
                <div
                  key={rowIdx}
                  className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[rgba(var(--background-rgb),0.25)] p-4 shadow-[0_25px_70px_rgba(0,0,0,0.45)] sm:rounded-[50px] sm:p-6 lg:rounded-[80px] lg:p-8"
                >
                  <motion.div
                    className={trackClass}
                    animate={{ x: animation }}
                    transition={{ duration: GALLERY_SCROLL_DURATION, repeat: Infinity, repeatType: "loop", ease: "linear" }}
                  >
                    {[...row.images, ...row.images].map((image, idx) => (
                      <button
                        key={`${image.src}-${idx}`}
                        type="button"
                        onClick={() => setGalleryModal({ src: image.src, alt: image.alt })}
                        className="relative h-[16rem] w-[85vw] flex-shrink-0 overflow-hidden rounded-[32px] border border-white/15 bg-black/20 shadow-[0_25px_80px_rgba(0,0,0,0.45)] transition hover:-translate-y-1 hover:border-white/40 sm:h-[20rem] sm:w-[28rem] lg:h-[22rem] lg:w-[32rem] lg:rounded-[48px]"
                      >
                        <img src={image.src} alt={image.alt} className="h-full w-full object-cover" loading="lazy" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-80" />
                        <span className="absolute bottom-5 left-6 text-[12px] uppercase tracking-[0.4em] text-white/85">{image.alt}</span>
                      </button>
                    ))}
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="relative z-10 w-full bg-[var(--background)] text-[var(--foreground)] px-4 py-24 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-x-0 top-24 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          <div className="absolute left-10 top-10 h-64 w-64 rounded-full bg-blue-500/10 blur-[140px]" />
          <div className="absolute right-12 bottom-16 h-72 w-72 rounded-full bg-purple-500/10 blur-[160px]" />
        </div>

        <div className="relative max-w-5xl mx-auto text-center space-y-4">
          <p className="text-xs uppercase tracking-[0.55em] text-[var(--foreground)]/60">Trabajos seleccionados</p>
          <h2 className="text-4xl font-extrabold">Proyectos</h2>
          <p className="text-[var(--foreground)]/70 text-sm leading-relaxed">
            Cada página web que construyo es un proyecto completamente único. Escucho lo que cada cliente necesita y transformo esas ideas en experiencias digitales personalizadas, funcionales y alineadas con la esencia de su negocio.
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto mt-16">
          <motion.div
            className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3"
            variants={PROJECT_GRID_VARIANTS}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {PROJECTS.map((project, index) => {
              const hasLink = Boolean(project.link);
              return (
                <motion.article
                  key={project.title}
                  variants={PROJECT_CARD_VARIANTS}
                  className="group flex h-full flex-col gap-6 rounded-[32px] border border-white/15 p-6 transition duration-300 hover:border-white/45 hover:bg-[rgba(var(--background-rgb),0.25)]"
                >
                  <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[rgba(var(--background-rgb),0.35)] shadow-[0_10px_45px_rgba(0,0,0,0.35)] transition duration-500 group-hover:-translate-y-1 group-hover:border-white/40">
                    <div className="relative aspect-[4/3] w-full">
                      <img src={project.image} alt={project.imageAlt} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                      <div className={`absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-70 bg-gradient-to-br ${project.accent}`} />
                    </div>
                    <div className="absolute inset-4 rounded-[20px] border border-white/25 opacity-0 transition duration-500 group-hover:opacity-80" />
                  </div>

                  <div className="flex flex-1 flex-col gap-3 px-1">
                    <p className="text-[11px] uppercase tracking-[0.45em] text-[var(--foreground)]/60">0{index + 1} · {project.role}</p>
                    <h3 className="text-2xl font-semibold leading-snug">{project.title}</h3>
                    <p className="text-sm text-[var(--foreground)]/75">{project.description}</p>

                    <div className="flex flex-wrap gap-2 pt-3 text-[10px] uppercase tracking-[0.35em] text-[var(--foreground)]/70">
                      {project.stack.map((tech) => (
                        <span key={tech} className="rounded-full border border-white/15 bg-white/5 px-3 py-1">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="pt-4">
                      {hasLink ? (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-blue-300 transition hover:text-white"
                        >
                          Ver detalles
                          <span aria-hidden="true">↗</span>
                        </a>
                      ) : (
                        <span className="text-sm uppercase tracking-[0.3em] text-[var(--foreground)]/45">Proyecto privado</span>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>
      {galleryModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6">
          <button className="absolute inset-0 cursor-default" onClick={() => setGalleryModal(null)} aria-label="Cerrar galería" />
          <div className="relative z-10 max-w-6xl w-full">
            <div className="flex justify-end mb-4">
              <button
                type="button"
                onClick={() => setGalleryModal(null)}
                className="rounded-full border border-white/40 px-4 py-1 text-sm uppercase tracking-[0.3em] text-white hover:border-white"
              >
                Cerrar
              </button>
            </div>
            <div className="overflow-hidden rounded-[48px] border border-white/20 bg-black/40 shadow-[0_40px_140px_rgba(0,0,0,0.7)]">
              <img src={galleryModal.src} alt={galleryModal.alt} className="w-full h-[70vh] object-cover" />
              <p className="p-4 text-center text-[12px] uppercase tracking-[0.35em] text-white/80">{galleryModal.alt}</p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
