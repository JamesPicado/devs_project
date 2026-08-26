"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useLanguage } from "../LanguageContext";

export default function Hero() {
  const { language } = useLanguage();
  const heroTextSegments = language === "en"
    ? [{ text: "TAILOR-MADE DIGITAL EXPERIENCES ", className: "text-[var(--foreground)]" }, { text: "THAT STAND OUT.", className: "text-blue-500" }]
    : [{ text: "EXPERIENCIAS DIGITALES A LA MEDIDA ", className: "text-[var(--foreground)]" }, { text: "QUE DESTACAN.", className: "text-blue-500" }];
  const heroRef = useRef<HTMLElement | null>(null);
  const heroInView = useInView(heroRef, { amount: 0.75 });
  const [textCycle, setTextCycle] = useState(0);

  useEffect(() => {
    if (heroInView) {
      setTextCycle((prev) => prev + 1);
    }
  }, [heroInView]);

  const letterVariants: Variants = {
    hidden: { opacity: 0, x: -12 },
    visible: {
      opacity: 0.95,
      x: 0,
      transition: { duration: 0.28, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  let letterCounter = 0;

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative z-10 flex flex-col items-center justify-center text-center min-h-screen px-4 sm:px-6"
    >
      <p className="max-w-2xl text-center text-xs uppercase tracking-[0.2em] text-[var(--foreground)]/70 mb-4 leading-relaxed">
        {language === "en" ? "We’re a small team of developers crafting your ideas into reality." : "Somos un pequeño equipo de desarrolladores que convierte tus ideas en realidad."}
      </p>

      <h1 className="font-extrabold text-3xl md:text-5xl lg:text-4xl leading-tight max-w-3xl">
        <motion.span key={textCycle} className="inline-flex flex-wrap justify-center">
          {heroTextSegments.map((segment, segmentIdx) => {
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
                className={`whitespace-normal ${segment.className}`}
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

      <div className="mt-10 flex flex-col items-center gap-4 text-sm">
        <p className="text-[var(--foreground)]/60">
          {language === "en" ? "Interested? Let’s start working together." : "¿Te interesa? Comencemos a trabajar juntos."}
        </p>
        <button
          onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          className="bg-blue-700/50 backdrop-blur-md border border-blue-500/30 text-[var(--foreground)] px-8 py-3 rounded-full hover:bg-blue-700 hover:scale-105 transition-all duration-300"
        >
          {language === "en" ? "Contact Us" : "Contáctanos"}
        </button>
      </div>
    </section>
  );
}
