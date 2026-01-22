"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const LINKS = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Projects" },
  { id: "gallery", label: "Gallery" },
  { id: "contact", label: "Contact" },
];

const SOCIALS = [
  { href: "https://wa.me/50689088541", label: "WhatsApp", icon: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.051 21.785h-.004A9.87 9.87 0 017.016 20.4l-.361-.214-3.741.982.998-3.648-.235-.374A9.86 9.86 0 012.167 11.886C2.168 6.435 6.604 2 12.055 2c2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" },
  { href: "https://instagram.com/puravidacodingcr", label: "Instagram", icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm6." },
  { href: "https://github.com/JamesPicado", label: "GitHub", icon: "M12 0C5.37 0 0 5.372 0 12c0 5.303 3.438 9.8 8.205 11.385.6.111.793-.261.793-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.043-1.61-4.043-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.084-.73.084-.73 1.205.085 1.84 1.236 1.84 1.236 1.07 1.834 2.807 1.304 3.492.998.107-.776.418-1.305.762-1.604-2.665-.304-5.467-1.332-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.536-1.523.117-3.176 0 0 1.008-.323 3.3 1.23.957-.266 1.983-.399 3.004-.404 1.02.005 2.047.138 3.004.404 2.291-1.552 3.297-1.23 3.297-1.23.654 1.653.243 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.627-5.479 5.922.43.371.823 1.103.823 2.223 0 1.604-.014 2.896-.014 3.292 0 .319.194.693.799.575C20.565 21.798 24 17.302 24 12c0-6.628-5.373-12-12-12z" },
  { href: "https://linkedin.com/in/pura-vida-coding-98a17939b/", label: "LinkedIn", icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.047c.476-.9 1.635-1.85 3.369-1.85 3.6 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm-1.782 13.019H7.12V9H3.555v11.452zM22.225 0H1.771C.792 0 0 .773 0 1.729v20.542C0 23.228.792 24 1.771 24h20.451C23.2 24 24 23.228 24 22.271V1.729C24 .773 23.2 0 22.225 0z" },
];

export default function Navbar() {
  const [navOpen, setNavOpen] = useState(false);
  const [themeMode, setThemeMode] = useState<"light" | "dark">("dark");
  const [themeReady, setThemeReady] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem("theme-mode");
    const initial = stored === "light" ? "light" : "dark";
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
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setNavOpen(false);
  };

  return (
    <div className="fixed left-0 right-0 top-4 flex justify-center px-4 z-[999]" ref={navRef}>
      <div className="w-full max-w-5xl rounded-full border border-white/10 bg-[var(--background)] backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] px-4 lg:px-8 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setNavOpen((prev) => !prev)}
            className="lg:hidden flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-xl hover:border-white/30 hover:text-blue-300 transition"
            aria-label="Toggle menu"
          >
            {navOpen ? "✕" : "☰"}
          </button>
          <span className="hidden lg:block text-sm tracking-[0.35em] text-[var(--foreground)]/70 uppercase">Pura Vida Coding</span>
        </div>

        <nav className="hidden lg:flex items-center gap-6 text-[15px]">
          {LINKS.map((link) => (
            <button key={link.id} onClick={() => scrollToSection(link.id)} className="hover:text-blue-400 transition">
              {link.label}
            </button>
          ))}
          <div className="h-5 w-px bg-white/15" />
          <div className="flex items-center gap-4 text-[var(--foreground)]/65">
            {SOCIALS.map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noreferrer" aria-label={social.label} className="hover:text-blue-400 transition">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d={social.icon} />
                </svg>
              </a>
            ))}
          </div>
          <div className="h-5 w-px bg-white/15" />
          {themeReady ? (
            <button onClick={() => setThemeMode((prev) => (prev === "dark" ? "light" : "dark"))} className="flex items-center gap-2 text-sm" aria-label="Toggle theme">
              <span className={themeMode === "dark" ? "text-yellow-200" : "text-[var(--foreground)]/40"}>☾</span>
              <span className={themeMode === "light" ? "text-yellow-500" : "text-[var(--foreground)]/40"}>☀</span>
            </button>
          ) : (
            <div className="flex items-center gap-2 text-[var(--foreground)]/40">☾ ☀</div>
          )}
        </nav>

        <div className="lg:hidden flex items-center gap-3">
          <button
            onClick={() => setThemeMode((prev) => (prev === "dark" ? "light" : "dark"))}
            className="flex items-center gap-2 text-sm"
            aria-label="Toggle theme"
          >
            <span className={themeMode === "dark" ? "text-yellow-200" : "text-[var(--foreground)]/40"}>☾</span>
            <span className={themeMode === "light" ? "text-yellow-500" : "text-[var(--foreground)]/40"}>☀</span>
          </button>
        </div>

        <AnimatePresence>
          {navOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute left-4 right-4 top-[calc(100%+12px)] rounded-3xl border border-white/10 bg-[rgba(var(--background-rgb),0.95)] px-6 py-5 shadow-[0_25px_100px_rgba(0,0,0,0.6)] space-y-4 lg:hidden"
            >
              {LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="w-full text-left text-base font-medium text-[var(--foreground)] py-2 border-b border-white/10 last:border-b-0 hover:text-blue-300 transition"
                >
                  {link.label}
                </button>
              ))}

              <div className="pt-1 border-t border-white/10">
                <p className="text-xs uppercase tracking-[0.25em] text-[var(--foreground)]/60 mb-3">Connect</p>
                <div className="flex items-center gap-6 text-[var(--foreground)]/70">
                  {SOCIALS.map((social) => (
                    <a key={social.label} href={social.href} target="_blank" rel="noreferrer" aria-label={social.label} className="hover:text-blue-300 transition">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d={social.icon} />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
