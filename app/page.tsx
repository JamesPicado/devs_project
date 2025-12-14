"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Script from "next/script";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const ORBIT_GLOWS = [
  { left: "8%", top: "25%", size: 260, duration: 8, delay: 0, colors: ["rgba(56,189,248,0.4)", "rgba(59,130,246,0.1)"] },
  { left: "38%", top: "10%", size: 320, duration: 10, delay: 0.4, colors: ["rgba(129,140,248,0.35)", "rgba(56,189,248,0.08)"] },
  { left: "62%", top: "32%", size: 280, duration: 9, delay: 0.7, colors: ["rgba(14,165,233,0.35)", "rgba(59,130,246,0.08)"] },
  { left: "80%", top: "18%", size: 240, duration: 11, delay: 1, colors: ["rgba(99,102,241,0.32)", "rgba(59,130,246,0.1)"] },
] as const;

export default function HomePage() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";

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

  return (
    <div className="relative min-h-screen w-full bg-[var(--background)] text-[var(--foreground)]">
      {siteKey && (
        <Script src={`https://www.google.com/recaptcha/api.js?render=${siteKey}`} strategy="afterInteractive" />
      )}
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

      <Navbar />
      <Hero />
      <Projects />
      <Experience />
      <Skills />
      <Contact />

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
      <Footer />
    </div>
  );
}
