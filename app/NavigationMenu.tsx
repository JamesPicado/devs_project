"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function NavigationMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggle = () => setOpen(!open);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button onClick={toggle} className="hover:text-blue-400 transition">
        Navigation
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -6 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute left-1/2 -translate-x-1/2 mt-3 bg-black/70 
                       border border-white/10 backdrop-blur-xl rounded-xl 
                       shadow-xl py-3 px-4 flex flex-col w-40 z-50"
          >
            <button className="py-1.5 text-sm hover:text-blue-400" onClick={() => scrollToSection("home")}>
              Home
            </button>
            <button className="py-1.5 text-sm hover:text-blue-400" onClick={() => scrollToSection("services")}>
              Services
            </button>
            <button className="py-1.5 text-sm hover:text-blue-400" onClick={() => scrollToSection("experience")}>
              Experience
            </button>
            <button className="py-1.5 text-sm hover:text-blue-400" onClick={() => scrollToSection("skills")}>
              Skills
            </button>
            <button className="py-1.5 text-sm hover:text-blue-400" onClick={() => scrollToSection("projects")}>
              Projects
            </button>
            <button className="py-1.5 text-sm hover:text-blue-400" onClick={() => scrollToSection("contact")}>
              Contact
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
