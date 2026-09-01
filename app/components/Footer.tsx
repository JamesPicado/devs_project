"use client";

import { useLanguage } from "../LanguageContext";

export default function Footer() {
  const { language } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 w-full border-t border-white/10 bg-[var(--background)] py-8 text-center text-sm text-[var(--foreground)]/50">
      <div className="max-w-6xl mx-auto px-4">
        <p className="tracking-wide">
          &copy; {currentYear} James Picado.{" "}
          {language === "es"
            ? "Todos los derechos reservados."
            : "All rights reserved."}
        </p>
      </div>
    </footer>
  );
}
