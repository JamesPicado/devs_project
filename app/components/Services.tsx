"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { useLanguage } from "../LanguageContext";

const CAPABILITIES = [
  { en: "Custom software", es: "Software a medida", icon: "⌘" },
  { en: "Web development", es: "Desarrollo web", icon: "◎" },
  { en: "E-commerce", es: "E-commerce", icon: "▽" },
  { en: "Continuous support", es: "Soporte continuo", icon: "◴" },
] as const;

const PROJECTS = [
  { title: "Inventory Control", type: "Management system", typeEs: "Sistema de gestión", image: "/img_projects/analytics-control-room.png", tags: ["Dashboard", "UX/UI", "Automation", "Inventory", "Responsive"], href: "#contact", service: "Custom Software Development" },
  { title: "TEMCO", type: "Corporate website", typeEs: "Sitio corporativo", image: "/img_projects/temcousa.png", tags: ["Website", "UX/UI", "Responsive"], href: "https://temcousa.com" },
  { title: "Gym Costa Rica", type: "Digital platform", typeEs: "Plataforma digital", image: "/img_projects/gym.png", tags: ["Website", "UX/UI", "Performance", "Responsive"], href: "https://gymexample.vercel.app/#" },
] as const;

function ProjectLink({ project, children }: { project: (typeof PROJECTS)[number]; children: React.ReactNode }) {
  const external = project.href.startsWith("http");
  return <a href={project.href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined} onClick={() => "service" in project && window.dispatchEvent(new CustomEvent("service-selected", { detail: project.service }))} className="inline-flex items-center gap-4 text-[15px] text-[#168cff] transition hover:text-[#65b5ff]">{children}<span aria-hidden="true">↗</span></a>;
}

function BrowserFrame({ project, priority = false }: { project: (typeof PROJECTS)[number]; priority?: boolean }) {
  return <div className="overflow-hidden rounded-[13px] border border-[var(--showcase-border-strong)] bg-[var(--showcase-frame)] shadow-[var(--showcase-shadow)]">
    <div className="flex h-8 items-center gap-2 border-b border-[var(--showcase-border)] bg-[var(--showcase-bar)] px-4"><span className="h-2 w-2 rounded-full bg-[#ff5f57]" /><span className="h-2 w-2 rounded-full bg-[#febc2e]" /><span className="h-2 w-2 rounded-full bg-[#28c840]" /><div className="ml-2 h-4 flex-1 rounded bg-[var(--showcase-track)]" /></div>
    <div className="relative aspect-[16/9] bg-white"><Image src={project.image} alt={`${project.title} project`} fill priority={priority} sizes="(min-width:1024px) 50vw,100vw" className="object-cover object-top" /></div>
  </div>;
}

function ProjectMeta({ project, compact = false }: { project: (typeof PROJECTS)[number]; compact?: boolean }) {
  const { language } = useLanguage(); const es = language === "es";
  return <div className={compact ? "space-y-4" : "mt-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"}><div><h3 className="text-[20px] font-semibold text-[var(--showcase-fg)]">{project.title} <span className="font-normal text-[var(--showcase-muted)]">— {es ? project.typeEs : project.type}</span></h3><div className="mt-3 flex flex-wrap gap-2">{project.tags.map(tag => <span key={tag} className="border border-[var(--showcase-border-strong)] px-3 py-1 text-[11px] text-[var(--showcase-muted)]">{tag}</span>)}</div></div><ProjectLink project={project}>{es ? "Ver proyecto" : "View project"}</ProjectLink></div>;
}

export default function Services() {
  const [active, setActive] = useState(0); const { language } = useLanguage(); const es = language === "es";
  return <section id="services" className="development-showcase relative z-10 overflow-hidden bg-[var(--showcase-bg)] px-4 py-20 text-[var(--showcase-fg)] transition-colors duration-300 sm:px-8 lg:py-24"><div className="mx-auto max-w-[1480px]">
    <motion.header initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-[950px]"><p className="text-[12px] font-medium uppercase tracking-[0.25em] text-[#168cff]">{es ? "Capacidades + proyectos" : "Capabilities + projects"}</p><h2 className="mt-3 text-[42px] font-semibold leading-[1.04] tracking-[-0.045em] sm:text-[58px] lg:text-[68px]">{es ? "Podemos construirlo. Ya lo hemos hecho." : "We can build it. We’ve done it before."}</h2><p className="mt-4 max-w-xl text-[16px] leading-6 text-[var(--showcase-muted)]">{es ? "Diseñamos productos digitales que resuelven necesidades reales, desde sitios corporativos hasta plataformas completas." : "We design digital products that solve real needs, from corporate websites to complete platforms."}</p></motion.header>
    <div className="mt-7 grid border-y border-[var(--showcase-border)] sm:grid-cols-2 lg:grid-cols-4">{CAPABILITIES.map((capability,index)=><button key={capability.en} onClick={()=>setActive(index)} className={`relative flex h-[58px] items-center justify-center gap-4 border-[var(--showcase-border)] text-[15px] transition lg:border-r lg:last:border-r-0 ${active===index?"text-[var(--showcase-fg)]":"text-[var(--showcase-muted)] hover:text-[var(--showcase-fg)]"}`}><span className={active===index?"text-[#168cff]":"text-[var(--showcase-muted)]"}>{capability.icon}</span>{capability[language]}{active===index&&<motion.span layoutId="capability-line" className="absolute inset-x-0 bottom-[-1px] h-[2px] bg-[#168cff]" />}</button>)}</div>
    <p className="mt-6 text-[12px] font-medium uppercase tracking-[0.25em] text-[#168cff]">{es ? "Proyectos seleccionados" : "Selected projects"}</p>
    <div className="mt-4 grid gap-8 lg:grid-cols-[1.05fr_1fr]"><motion.article initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}}><BrowserFrame project={PROJECTS[0]} priority/><ProjectMeta project={PROJECTS[0]}/></motion.article><div className="space-y-7">{PROJECTS.slice(1).map((project,index)=><motion.article key={project.title} initial={{opacity:0,x:24}} whileInView={{opacity:1,x:0}} transition={{delay:index*.1}} viewport={{once:true}} className="grid items-center gap-5 sm:grid-cols-[1.35fr_0.75fr]"><BrowserFrame project={project}/><ProjectMeta project={project} compact/></motion.article>)}<a href="#contact" onClick={()=>window.dispatchEvent(new CustomEvent("service-selected",{detail:"Custom Software Development"}))} className="ml-auto flex w-full max-w-[270px] items-center justify-between rounded-[5px] bg-[#086cff] px-6 py-4 text-[15px] font-medium text-white transition hover:bg-[#1685ff]">{es ? "Hablemos de tu proyecto" : "Let’s discuss your project"}<span>→</span></a></div></div>
  </div></section>;
}
