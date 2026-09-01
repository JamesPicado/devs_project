"use client";

import { motion } from "framer-motion";

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

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative z-10 w-full min-h-screen bg-[var(--background)] text-[var(--foreground)] px-4 py-24 sm:px-6 overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 right-12 h-80 w-80 rounded-full bg-blue-500/10 blur-[140px]" />
        <div className="absolute bottom-10 left-10 h-72 w-72 rounded-full bg-emerald-500/10 blur-[160px]" />
        <div className="absolute inset-x-12 top-16 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <div className="mb-20 text-center">
          <p className="text-xs uppercase tracking-[0.5em] text-[var(--foreground)]/60">
            Services & Experience
          </p>
          <div className="mt-3 flex flex-col items-center justify-center text-4xl font-extrabold md:text-5xl tracking-[0.2em]">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="uppercase ml-[0.2em]"
            >
              Experience
            </motion.h2>
            <p className="mt-5 text-lg leading-relaxed text-[var(--foreground)]/90 tracking-[0.02em] max-w-3xl mx-auto font-normal normal-case">
              Designing and developing digital solutions tailored to any need,
              from interfaces and websites to applications and enterprise
              systems, including visual content, optimization, and continuous
              support.
            </p>
          </div>
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
                <div
                  className={`absolute inset-[1px] rounded-[26px] bg-gradient-to-br ${exp.accent} blur-3xl`}
                />
                <div className="absolute inset-[1px] rounded-[26px] border border-white/10" />
              </div>

              <div className="relative z-10 flex items-center justify-between text-[11px] uppercase tracking-[0.35em] text-[var(--foreground)]/55">
                <span>{exp.badge}</span>
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>

              <div className="relative z-10 mt-5 flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-2xl overflow-hidden">
                  {typeof exp.icon === "string" && exp.icon.endsWith(".png") ? (
                    <img
                      src={exp.icon}
                      alt={`${exp.title} icon`}
                      className="h-10 w-10 object-contain"
                    />
                  ) : (
                    exp.icon || "∎"
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-semibold leading-snug text-[var(--foreground)]">
                    {exp.title}
                  </h3>
                  {exp.subtitle ? (
                    <p className="text-[12px] uppercase tracking-[0.25em] text-[var(--foreground)]/55 mt-2">
                      {exp.subtitle}
                    </p>
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
  );
}
