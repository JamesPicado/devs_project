"use client";

import { motion } from "framer-motion";
import { useLanguage } from "../LanguageContext";

export default function Hero() {
  const { language } = useLanguage();
  const mainTitle =
    language === "en"
      ? "TAILOR-MADE DIGITAL EXPERIENCES"
      : "EXPERIENCIAS DIGITALES A LA MEDIDA";
  const accentTitle = language === "en" ? "THAT STAND OUT." : "QUE DESTACAN.";

  return (
    <section
      id="home"
      className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center sm:px-6"
    >
      <p className="mb-5 max-w-2xl text-center text-[10px] uppercase leading-relaxed tracking-[0.16em] text-[var(--foreground)]/70 sm:text-xs sm:tracking-[0.2em]">
        {language === "en"
          ? "We’re a small team of developers crafting your ideas into reality."
          : "Somos un pequeño equipo de desarrolladores que convierte tus ideas en realidad."}
      </p>

      <h1 className="max-w-5xl text-balance text-[clamp(1.75rem,4.6vw,3.8rem)] font-extrabold leading-[1.08] tracking-[-0.045em]">
        <motion.span
          key={`${language}-main`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="block text-[var(--foreground)]"
        >
          {mainTitle}
        </motion.span>
        <motion.span
          key={`${language}-accent`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="mt-1 block text-blue-500"
        >
          {accentTitle}
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="ml-1 inline-block text-blue-400"
          >
            |
          </motion.span>
        </motion.span>
      </h1>

      <div className="mt-8 flex flex-col items-center gap-4 text-sm sm:mt-10">
        <p className="text-[var(--foreground)]/60">
          {language === "en"
            ? "Interested? Let’s start working together."
            : "¿Te interesa? Comencemos a trabajar juntos."}
        </p>
        <button
          onClick={() => window.dispatchEvent(new Event("open-contact-modal"))}
          className="rounded-full border border-blue-500/30 bg-blue-700/50 px-8 py-3 text-[var(--foreground)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-blue-700"
        >
          {language === "en" ? "Contact Us" : "Contáctanos"}
        </button>
      </div>
    </section>
  );
}
