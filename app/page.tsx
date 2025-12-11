"use client";

import { motion, AnimatePresence, useInView, type Variants } from "framer-motion";
import { useState, useEffect, useRef } from "react";
/**
 * Photo gallery: local images from Jonathan Cordova R.
 * Images stored in /public/img_projects/ starting with DSC
 */
const GALLERY_IMAGES = [
  { src: "/img_projects/DSC01634.jpg", alt: "Professional photography" },
  { src: "/img_projects/DSC01644.jpg", alt: "Creative visual capture" },
  { src: "/img_projects/DSC01661.jpg", alt: "Artistic composition" },
  { src: "/img_projects/DSC01672.jpg", alt: "Photography production" },
  { src: "/img_projects/DSC01698.jpg", alt: "Professional shot" },
] as const;

const GALLERY_SCROLL_FRAMES: Record<"left" | "right", number[]> = {
  left: [-600, 0],
  right: [0, 600],
};

const GALLERY_SCROLL_DURATION = 45;

/**
 * List of featured projects rendered in the Projects section.
 */
const PROJECTS = [
  {
    title: "Temco Engineered Products, Inc.",
    role: "Truck Manufacturers",
    image: "/img_projects/temcousa.png",
    imageAlt: "Home page with 3 different themed images. Welder performing high-precision metal fabrication during the manufacturing process at TEMCO.",
    description:
      "Corporate website to highlight industrial capabilities, manufacturing processes, quality control, and service catalog, with clear sections and a focus on converting B2B clients.",
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
    image: "/img_projects/analytics-control-room.png",
    imageAlt: "Analytics dashboard mockup with charts and KPIs",
    description:
      "Designed a modern website for a restaurant, focusing on elegance and usability. Includes an interactive digital menu, reservation system, dish gallery, chef section, and dynamic customer reviews.",
    highlights: [
      "Interactive digital menu: Smooth navigation with high-quality images, prices, and dish descriptions.",
      "Reservation system: Integration of a dynamic form allowing real-time table booking.",
      "Dynamic gallery: Optimized photo carousel with smooth animations and lazy loading.",
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
      "Designed a modern website for a restaurant, focusing on elegance and usability. Includes an interactive digital menu, reservation system, dish gallery, chef section, and dynamic customer reviews.",
    highlights: [
      "Interactive digital menu: Smooth navigation with high-quality images, prices, and dish descriptions.",
      "Reservation system: Integration of a dynamic form allowing real-time table booking.",
      "Dynamic gallery: Optimized photo carousel with smooth animations and lazy loading.",
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

/**
 * Experience / services shown as animated cards.
 */
const EXPERIENCES = [
  {
    title: "Web Design / UI–UX",
    subtitle: "Software Engineer | Web Systems / Applications",
    highlights: [
      "Design of modern and responsive websites focusing on usability (UX) and professional aesthetics (UI).",
      "Creation of landing pages optimized for conversions and marketing campaigns.",
      "Design of intuitive interfaces for admin panels, dashboards, and internal tools.",
    ],
    badge: "Custom Solutions",
    accent: "from-sky-500/45 via-blue-500/10 to-transparent",
    icon: "/icons/web_design.png",
  },
  {
    title: "Web Systems and Applications",
    subtitle: "Software Engineer | Web Systems / Applications",
    highlights: [
      "Development of custom enterprise systems (inventories, CRM, sales, process control).",
      "Implementation of reservation platforms, dynamic catalogs, blogs, ecommerce.",
      "Migration and modernization of existing systems to current web technologies.",
    ],
    badge: "Platforms",
    accent: "from-emerald-500/45 via-lime-400/15 to-transparent",
    icon: "/icons/web_systems.png",
  },
  {
    title: "Visual Content / Photography / Multimedia",
    subtitle: "Software Engineer | Web Systems / Applications",
    highlights: [
      "Production and editing of photographs for websites, catalogs, and corporate content.",
      "Creation of visual material for banners, covers, social media, and advertising content.",
      "Professional visual capture oriented towards businesses such as restaurants, products, services, tourism, etc.",
    ],
    badge: "Branding",
    accent: "from-fuchsia-500/40 via-pink-500/15 to-transparent",
    icon: "/icons/visual_content.png",
  },
  {
    title: "Monthly Web Maintenance and Support",
    subtitle: "",
    highlights: [
      "Updates, improvements, backups, and continuous site optimization.",
      "Bug fixing, monitoring, and security improvements.",
    ],
    badge: "Continuity",
    accent: "from-indigo-500/40 via-purple-500/20 to-transparent",
    icon: "/icons/maintenance_support.png",
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
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [contactStatus, setContactStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const navRef = useRef<HTMLDivElement | null>(null);
  const experienceRef = useRef<HTMLElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Observes the hero section to trigger text animations
  const heroInView = useInView(heroRef, { amount: 0.75 });
  const [textCycle, setTextCycle] = useState(0);
  /**
   * Animation for the main hero letters.
   */
  const letterVariants: Variants = {
    hidden: { opacity: 0, x: -12 },
    visible: {
      opacity: 0.95,
      x: 0,
      transition: { duration: 0.28, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  // Updates contact form state field by field
  const updateContactForm = (field: string, value: string) => {
    setContactForm((prev) => ({ ...prev, [field]: value }));
  };

  // Sends form data to /api/contact endpoint
  const submitContactForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (contactStatus === "sending") return;
    setContactStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactForm),
      });
      if (!res.ok) throw new Error("Request failed");
      setContactStatus("success");
      setContactForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      setContactStatus("error");
    }
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

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

      {/* NAVBAR: main menu + toggles */}
      <div
        className="w-full flex justify-center mt-0 mb-4 sticky top-0 z-20 bg-[rgba(var(--background-rgb),0.85)] backdrop-blur-md px-4"
        ref={navRef}
      >
        <div className="backdrop-blur-xl bg-[rgba(var(--background-rgb),0.65)] border border-white/10 text-sm px-4 lg:px-10 py-4 rounded-full flex items-center justify-between lg:justify-center gap-3 lg:gap-6 shadow-[0_0_20px_rgba(0,0,0,0.4)] relative w-full lg:w-auto">
          {/* Logo/Brand - visible on mobile */}
          <button
            onClick={() => scrollToSection("home")}
            className="text-[15px] font-bold hover:text-blue-400 transition lg:hidden"
          >
            JP
          </button>

          {/* Hamburger button - only visible on mobile */}
          <button
            onClick={() => setNavOpen(!navOpen)}
            className="lg:hidden flex flex-col gap-1.5 w-6 h-6 items-center justify-center"
            aria-label="Toggle menu"
          >
            <span className={`w-5 h-0.5 bg-[var(--foreground)] transition-transform ${navOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`w-5 h-0.5 bg-[var(--foreground)] transition-opacity ${navOpen ? "opacity-0" : ""}`} />
            <span className={`w-5 h-0.5 bg-[var(--foreground)] transition-transform ${navOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>

          {/* Desktop Navigation items */}
          <div className="hidden lg:flex items-center gap-6">
            <button
              onClick={() => scrollToSection("home")}
              className="text-[15px] font-medium hover:text-blue-400 transition"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("experience")}
              className="text-[15px] font-medium hover:text-blue-400 transition"
            >
              Experience
            </button>
            <button
              onClick={() => scrollToSection("skills")}
              className="text-[15px] font-medium hover:text-blue-400 transition"
            >
              Skills
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="text-[15px] font-medium hover:text-blue-400 transition"
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-[15px] font-medium hover:text-blue-400 transition"
            >
              Contact
            </button>

            {/* Divider */}
            <div className="h-6 w-px bg-white/20" />

            {/* Social icons */}
            <div className="flex items-center gap-4">
              <a
                href="https://wa.me/50686488688"
                target="_blank"
                rel="noreferrer"
                className="text-[var(--foreground)]/60 hover:text-blue-400 transition"
                aria-label="WhatsApp"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </a>
              <a
                href="https://instagram.com/jonathan.cordova.r"
                target="_blank"
                rel="noreferrer"
                className="text-[var(--foreground)]/60 hover:text-blue-400 transition"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://github.com/JamesPicado"
                target="_blank"
                rel="noreferrer"
                className="text-[var(--foreground)]/60 hover:text-blue-400 transition"
                aria-label="GitHub"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a
                href="https://linkedin.com/in/jamespicado"
                target="_blank"
                rel="noreferrer"
                className="text-[var(--foreground)]/60 hover:text-blue-400 transition"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>

            {/* Divider */}
            <div className="h-6 w-px bg-white/20" />

            {/* Theme toggle */}
            {themeReady ? (
              <button
                onClick={() => setThemeMode((prev) => (prev === "dark" ? "light" : "dark"))}
                className="relative flex items-center gap-2 transition hover:opacity-80"
                aria-label="Toggle theme"
              >
                <span
                  className={`flex items-center justify-center text-lg transition ${
                    themeMode === "dark" ? "text-yellow-200" : "text-[var(--foreground)]/40"
                  }`}
                >
                  ☾
                </span>
                <span
                  className={`flex items-center justify-center text-lg transition ${
                    themeMode === "light" ? "text-yellow-500" : "text-[var(--foreground)]/40"
                  }`}
                >
                  ☀
                </span>
              </button>
            ) : (
              <div className="relative flex items-center gap-2 opacity-40 pointer-events-none">
                <span className="flex items-center justify-center text-lg">☾</span>
                <span className="flex items-center justify-center text-lg">☀</span>
              </div>
            )}
          </div>

          {/* Mobile Theme toggle - visible on mobile */}
          <div className="lg:hidden">
            {themeReady ? (
              <button
                onClick={() => setThemeMode((prev) => (prev === "dark" ? "light" : "dark"))}
                className="relative flex items-center gap-1.5 transition hover:opacity-80"
                aria-label="Toggle theme"
              >
                <span
                  className={`flex items-center justify-center text-base transition ${
                    themeMode === "dark" ? "text-yellow-200" : "text-[var(--foreground)]/40"
                  }`}
                >
                  ☾
                </span>
                <span
                  className={`flex items-center justify-center text-base transition ${
                    themeMode === "light" ? "text-yellow-500" : "text-[var(--foreground)]/40"
                  }`}
                >
                  ☀
                </span>
              </button>
            ) : (
              <div className="relative flex items-center gap-1.5 opacity-40 pointer-events-none">
                <span className="flex items-center justify-center text-base">☾</span>
                <span className="flex items-center justify-center text-base">☀</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {navOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setNavOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-[280px] bg-[var(--background)] border-l border-white/10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col h-full p-6">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-lg font-bold">Menu</h3>
                  <button
                    onClick={() => setNavOpen(false)}
                    className="text-2xl hover:text-blue-400 transition"
                    aria-label="Close menu"
                  >
                    ✕
                  </button>
                </div>

                <nav className="flex flex-col gap-4 flex-1">
                  <button
                    onClick={() => scrollToSection("home")}
                    className="text-left text-base font-medium hover:text-blue-400 transition py-2 border-b border-white/10"
                  >
                    Home
                  </button>
                  <button
                    onClick={() => scrollToSection("experience")}
                    className="text-left text-base font-medium hover:text-blue-400 transition py-2 border-b border-white/10"
                  >
                    Experience
                  </button>
                  <button
                    onClick={() => scrollToSection("skills")}
                    className="text-left text-base font-medium hover:text-blue-400 transition py-2 border-b border-white/10"
                  >
                    Skills
                  </button>
                  <button
                    onClick={() => scrollToSection("projects")}
                    className="text-left text-base font-medium hover:text-blue-400 transition py-2 border-b border-white/10"
                  >
                    Projects
                  </button>
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="text-left text-base font-medium hover:text-blue-400 transition py-2 border-b border-white/10"
                  >
                    Contact
                  </button>
                </nav>

                <div className="mt-auto pt-6 border-t border-white/10">
                  <p className="text-xs uppercase tracking-wider text-[var(--foreground)]/60 mb-4">Connect</p>
                  <div className="flex items-center gap-6">
                    <a
                      href="https://wa.me/50686488688"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[var(--foreground)]/60 hover:text-blue-400 transition"
                      aria-label="WhatsApp"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                    </a>
                    <a
                      href="https://instagram.com/jonathan.cordova.r"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[var(--foreground)]/60 hover:text-blue-400 transition"
                      aria-label="Instagram"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                    <a
                      href="https://github.com/JamesPicado"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[var(--foreground)]/60 hover:text-blue-400 transition"
                      aria-label="GitHub"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                    <a
                      href="https://linkedin.com/in/jamespicado"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[var(--foreground)]/60 hover:text-blue-400 transition"
                      aria-label="LinkedIn"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION: main headline animation with typing text */}
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

      {/* EXPERIENCE SECTION: experience/service cards */}
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
            <p className="text-xs uppercase tracking-[0.4em] text-[var(--foreground)]/50">Services & Experience</p>
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
              {Array.from("EXPERIENCE").map((letter, idx) => (
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
              Designing and developing digital solutions tailored to any need, from interfaces and websites to applications and enterprise systems, including visual content, optimization, and continuous support.
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

      {/* SKILLS SECTION: grid photo gallery */}
      <section id="skills" className="relative z-10 w-full min-h-screen bg-[var(--background)] text-[var(--foreground)] px-4 sm:px-6 py-24">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <p className="text-xs uppercase tracking-[0.5em] text-[var(--foreground)]/60">Photography</p>
            <h2 className="text-4xl font-extrabold">Gallery</h2>
            <p className="text-sm text-[var(--foreground)]/75 max-w-3xl mx-auto">
             Professional photography by{" "}
             <a 
               href="https://www.pexels.com/@jonathan-cordova-r-2637981/" 
               target="_blank" 
               rel="noopener noreferrer"
               className="text-blue-400 hover:text-blue-300 transition"
             >
               Jonathan Cordova R.
             </a>
            </p>
          </div>

          <motion.div 
            className="space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.08,
                },
              },
            }}
          >
            {/* Primera fila - 3 fotos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {GALLERY_IMAGES.slice(0, 3).map((image, idx) => (
                <motion.button
                  key={`${image.src}-${idx}`}
                  type="button"
                  onClick={() => setGalleryModal({ src: image.src, alt: image.alt })}
                  variants={{
                    hidden: { opacity: 0, scale: 0.9, y: 20 },
                    visible: { 
                      opacity: 1, 
                      scale: 1, 
                      y: 0,
                      transition: { duration: 0.5, ease: "easeOut" }
                    },
                  }}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/20 shadow-lg transition-all duration-300 hover:shadow-2xl hover:border-white/30 hover:-translate-y-1 aspect-square w-full"
                >
                  <img 
                    src={image.src} 
                    alt={image.alt} 
                    className={`absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-110 ${
                      idx === 0 ? "object-cover object-bottom" : "object-cover"
                    }`}
                    loading="lazy" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                    <p className="text-xs text-white/90 font-medium line-clamp-2">{image.alt}</p>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Segunda fila - 2 fotos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {GALLERY_IMAGES.slice(3, 5).map((image, idx) => (
                <motion.button
                  key={`${image.src}-${idx + 3}`}
                  type="button"
                  onClick={() => setGalleryModal({ src: image.src, alt: image.alt })}
                  variants={{
                    hidden: { opacity: 0, scale: 0.9, y: 20 },
                    visible: { 
                      opacity: 1, 
                      scale: 1, 
                      y: 0,
                      transition: { duration: 0.5, ease: "easeOut" }
                    },
                  }}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/20 shadow-lg transition-all duration-300 hover:shadow-2xl hover:border-white/30 hover:-translate-y-1 aspect-square w-full"
                >
                  <img 
                    src={image.src} 
                    alt={image.alt} 
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    loading="lazy" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                    <p className="text-xs text-white/90 font-medium line-clamp-2">{image.alt}</p>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* PROJECTS SECTION: featured works grid */}
      <section id="projects" className="relative z-10 w-full bg-[var(--background)] text-[var(--foreground)] px-4 py-24 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-x-0 top-24 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          <div className="absolute left-10 top-10 h-64 w-64 rounded-full bg-blue-500/10 blur-[140px]" />
          <div className="absolute right-12 bottom-16 h-72 w-72 rounded-full bg-purple-500/10 blur-[160px]" />
        </div>

        <div className="relative max-w-5xl mx-auto text-center space-y-4">
          <p className="text-xs uppercase tracking-[0.55em] text-[var(--foreground)]/60">Selected Work</p>
          <h2 className="text-4xl font-extrabold">Projects</h2>
          <p className="text-[var(--foreground)]/70 text-sm leading-relaxed">
            Every website I build is a completely unique project. I listen to what each client needs and transform those ideas into personalized, functional digital experiences aligned with the essence of their business.
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
                          View Details
                          <span aria-hidden="true">↗</span>
                        </a>
                      ) : (
                        <span className="text-sm uppercase tracking-[0.3em] text-[var(--foreground)]/45">Private Project</span>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CONTACT SECTION: form that sends emails to Gmail */}
      <section id="contact" className="relative z-10 w-full bg-[var(--background)] text-[var(--foreground)] px-4 sm:px-6 py-24">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-[0.5em] text-[var(--foreground)]/60">Contact</p>
            <h2 className="text-4xl font-extrabold mt-3">Let's Work Together</h2>
            <p className="text-sm text-[var(--foreground)]/70 mt-3">
              Fill out the form. I will respond as soon as possible.
            </p>
          </div>

          <form onSubmit={submitContactForm} className="space-y-6 bg-[rgba(var(--background-rgb),0.4)] border border-white/10 rounded-[36px] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
            <label className="block text-sm font-semibold uppercase tracking-[0.3em] text-[var(--foreground)]/70">
              Name
              <input
                type="text"
                required
                value={contactForm.name}
                onChange={(e) => updateContactForm("name", e.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-[rgba(var(--background-rgb),0.35)] px-4 py-3 text-base text-[var(--foreground)] placeholder:text-[var(--foreground)]/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="What is your name?"
              />
            </label>

            <label className="block text-sm font-semibold uppercase tracking-[0.3em] text-[var(--foreground)]/70">
              Email
              <input
                type="email"
                required
                value={contactForm.email}
                onChange={(e) => updateContactForm("email", e.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-[rgba(var(--background-rgb),0.35)] px-4 py-3 text-base text-[var(--foreground)] placeholder:text-[var(--foreground)]/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="email@email.com"
              />
            </label>

            <label className="block text-sm font-semibold uppercase tracking-[0.3em] text-[var(--foreground)]/70">
              Message
              <textarea
                required
                rows={5}
                value={contactForm.message}
                onChange={(e) => updateContactForm("message", e.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-[rgba(var(--background-rgb),0.35)] px-4 py-3 text-base text-[var(--foreground)] placeholder:text-[var(--foreground)]/40 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Tell me about your project..."
              />
            </label>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                disabled={contactStatus === "sending"}
                className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-blue-400"
              >
                {contactStatus === "sending" ? "Sending..." : "Send"}
              </button>

              {contactStatus === "success" && <p className="text-sm text-emerald-400">Message sent successfully.</p>}
              {contactStatus === "error" && <p className="text-sm text-red-400">An error occurred. Please try again.</p>}
            </div>
          </form>
        </div>
      </section>

      {galleryModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6">
          <button className="absolute inset-0 cursor-default" onClick={() => setGalleryModal(null)} aria-label="Close gallery" />
          
          <div className="relative z-10 flex items-center gap-6">
            {/* Flecha Izquierda */}
            <button
              type="button"
              onClick={() => {
                const currentIndex = GALLERY_IMAGES.findIndex(img => img.src === galleryModal.src);
                const prevIndex = currentIndex === 0 ? GALLERY_IMAGES.length - 1 : currentIndex - 1;
                setGalleryModal(GALLERY_IMAGES[prevIndex]);
              }}
              className="flex items-center justify-center h-10 w-10 text-white/60 hover:text-white text-3xl transition"
              aria-label="Previous image"
            >
              ‹
            </button>

            {/* Card con imagen */}
            <div className="relative inline-block overflow-hidden rounded-[24px] bg-black/40 backdrop-blur-xl border border-white/20 shadow-[0_40px_140px_rgba(0,0,0,0.7)]">
              {/* Botón Close en esquina superior derecha */}
              <button
                type="button"
                onClick={() => setGalleryModal(null)}
                className="absolute top-4 right-4 z-20 flex items-center justify-center h-10 w-10 rounded-full border border-white/40 bg-white/10 hover:bg-white/20 text-white text-xl transition backdrop-blur-sm"
                aria-label="Close gallery"
              >
                ✕
              </button>

              <div className="p-6">
                <img src={galleryModal.src} alt={galleryModal.alt} className="max-h-[70vh] w-auto object-contain" />
              </div>
              <div className="px-6 pb-6 text-center space-y-2">
                <p className="text-[14px] uppercase tracking-[0.35em] text-white font-semibold">{galleryModal.alt}</p>
                <p className="text-[11px] text-white/70">Photo by Jonathan Cordova R.</p>
              </div>
            </div>

            {/* Flecha Derecha */}
            <button
              type="button"
              onClick={() => {
                const currentIndex = GALLERY_IMAGES.findIndex(img => img.src === galleryModal.src);
                const nextIndex = currentIndex === GALLERY_IMAGES.length - 1 ? 0 : currentIndex + 1;
                setGalleryModal(GALLERY_IMAGES[nextIndex]);
              }}
              className="flex items-center justify-center h-10 w-10 text-white/60 hover:text-white text-3xl transition"
              aria-label="Next image"
            >
              ›
            </button>
          </div>
        </div>
      ) : null}

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-40 flex items-center justify-center h-12 w-12 rounded-full bg-blue-600/90 hover:bg-blue-600 text-white shadow-lg backdrop-blur-sm transition-colors"
            aria-label="Scroll to top"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={2.5} 
              stroke="currentColor" 
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
