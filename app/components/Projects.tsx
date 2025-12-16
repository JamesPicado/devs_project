"use client";

import { motion } from "framer-motion";

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
    stack: ["Next.js", "React Query", "Node.js", "Tailwind"],
    link: "https://temcousa.com",
    accent: "from-blue-500/40 via-cyan-400/20 to-transparent",
  },
  
  {
    title: "Gym Costa Rica",
    role: "Gym Information Website",
    image: "/img_projects/gym.png",
    imageAlt: "Information important to clients of gym",
    description:
      "Gym Example is a modern, responsive website for gyms, designed to showcase services, training plans, and clear calls to action. Its professional, sporty design focuses on user experience and customer conversion while promoting a healthy lifestyle.",
    highlights: [
      "Interactive digital menu: Smooth navigation with high-quality images, prices, and dish descriptions.",
      "Reservation system: Integration of a dynamic form allowing real-time table booking.",
      "Dynamic gallery: Optimized photo carousel with smooth animations and lazy loading.",
    ],
    stack: ["Next.js", "React Query", "Node.js", "Tailwind"],
    link: "https://gymexample.vercel.app/#",
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

export default function Projects() {
  return (
    <section id="projects" className="relative z-10 w-full bg-[var(--background)] text-[var(--foreground)] px-4 py-24 sm:px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-24 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        <div className="absolute left-10 top-10 h-64 w-64 rounded-full bg-blue-500/10 blur-[140px]" />
        <div className="absolute right-12 bottom-16 h-72 w-72 rounded-full bg-purple-500/10 blur-[160px]" />
      </div>

      <div className="relative max-w-5xl mx-auto text-center space-y-4 pt-12">
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
                className="group flex h-full flex-col gap-6 rounded-[32px] border border-[var(--card-border)] bg-[var(--card-background)] p-6 transition duration-300 backdrop-blur-xl hover:border-[var(--card-border-hover)] hover:bg-[var(--card-background-hover)]"
                style={{ boxShadow: "var(--card-shadow)" }}
              >
                <div className="relative overflow-hidden rounded-[28px] border border-[var(--card-border)] bg-[rgba(var(--background-rgb),0.32)] transition duration-500 group-hover:-translate-y-1 group-hover:border-[var(--card-border-hover)]" style={{ boxShadow: "var(--card-shadow)" }}>
                  <div className="relative aspect-[4/3] w-full">
                    <img src={project.image} alt={project.imageAlt} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                    <div className={`absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-70 bg-gradient-to-br ${project.accent}`} />
                  </div>
                  <div className="absolute inset-4 rounded-[20px] border border-[var(--card-border-hover)] opacity-0 transition duration-500 group-hover:opacity-80" />
                </div>

                <div className="flex flex-1 flex-col gap-3 px-1">
                  <p className="text-[11px] uppercase tracking-[0.45em] text-[var(--foreground)]/60">0{index + 1} · {project.role}</p>
                  <h3 className="text-2xl font-semibold leading-snug">{project.title}</h3>
                  <p className="text-sm text-[var(--foreground)]/75">{project.description}</p>

                  <div className="flex flex-wrap gap-2 pt-3 text-[10px] uppercase tracking-[0.35em] text-[var(--foreground)]/70">
                    {project.stack.map((tech) => (
                      <span key={tech} className="rounded-full border border-[var(--chip-border)] bg-[var(--chip-background)] px-3 py-1 text-[var(--chip-text)]">
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
  );
}
