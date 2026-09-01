"use client";

import { motion } from "framer-motion";
import { useLanguage } from "../LanguageContext";

const STEPS = [
  {
    number: "01",
    title: { en: "Discovery", es: "Descubrimiento" },
    description: {
      en: "We analyze business goals, user profiles, operational workflows and technical constraints to translate the initial idea into measurable requirements.",
      es: "Analizamos objetivos de negocio, perfiles de usuario, flujos operativos y restricciones técnicas para convertir la idea inicial en requisitos medibles.",
    },
    icon: "search",
  },
  {
    number: "02",
    title: { en: "Scope & planning", es: "Alcance y planificación" },
    description: {
      en: "We define the functional scope, prioritize the product backlog and establish milestones, technical dependencies and delivery criteria for each phase.",
      es: "Definimos el alcance funcional, priorizamos el backlog del producto y establecemos hitos, dependencias técnicas y criterios de entrega para cada etapa.",
    },
    icon: "plan",
  },
  {
    number: "03",
    title: { en: "Design & experience", es: "Diseño y experiencia" },
    description: {
      en: "We design information architecture, user flows, wireframes and interactive prototypes, validating usability and responsive behavior before implementation.",
      es: "Diseñamos la arquitectura de información, flujos de usuario, wireframes y prototipos interactivos, validando usabilidad y comportamiento responsive antes de implementar.",
    },
    icon: "design",
  },
  {
    number: "04",
    title: { en: "Development", es: "Desarrollo" },
    description: {
      en: "We implement the interface, business logic, APIs and data model with a maintainable architecture focused on performance, security and scalability.",
      es: "Implementamos la interfaz, la lógica de negocio, las APIs y el modelo de datos mediante una arquitectura mantenible, segura, escalable y orientada al rendimiento.",
    },
    icon: "code",
  },
  {
    number: "05",
    title: { en: "Testing & review", es: "Pruebas y revisión" },
    description: {
      en: "We perform functional, responsive and cross-browser QA, reviewing integrations, accessibility, performance and critical user journeys before release.",
      es: "Ejecutamos pruebas funcionales, responsive y cross-browser, revisando integraciones, accesibilidad, rendimiento y recorridos críticos antes de liberar el producto.",
    },
    icon: "test",
  },
  {
    number: "06",
    title: { en: "Launch & support", es: "Lanzamiento y soporte" },
    description: {
      en: "We configure the production environment, deployment pipeline, domains and monitoring, then provide technical support and continuous optimization.",
      es: "Configuramos el entorno de producción, el pipeline de despliegue, dominios y monitoreo; después brindamos soporte técnico y optimización continua.",
    },
    icon: "launch",
  },
] as const;

function StepIcon({ type }: { type: string }) {
  const shared = "h-9 w-9 fill-none stroke-current";
  if (type === "search")
    return (
      <svg viewBox="0 0 40 40" className={shared}>
        <circle cx="17" cy="17" r="10" strokeWidth="1.6" />
        <path
          d="m25 25 9 9M17 11v12m-6-6h12"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    );
  if (type === "plan")
    return (
      <svg viewBox="0 0 40 40" className={shared}>
        <rect x="10" y="8" width="21" height="27" rx="2" strokeWidth="1.6" />
        <path
          d="M15 6h11v5H15zM15 17h11M15 23h11M15 29h7"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    );
  if (type === "design")
    return (
      <svg viewBox="0 0 40 40" className={shared}>
        <rect x="5" y="8" width="30" height="24" rx="3" strokeWidth="1.6" />
        <path
          d="M5 14h30M10 11h.1M15 11h.1M11 19h8v8h-8zm12 0h7m-7 4h7m-7 4h5"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    );
  if (type === "code")
    return (
      <svg viewBox="0 0 40 40" className={shared}>
        <path
          d="m14 11-9 9 9 9m12-18 9 9-9 9m-3-24-6 30"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  if (type === "test")
    return (
      <svg viewBox="0 0 40 40" className={shared}>
        <path
          d="M20 4 33 9v9c0 8-5 14-13 18C12 32 7 26 7 18V9l13-5Z"
          strokeWidth="1.6"
        />
        <path
          d="m14 20 4 4 8-9"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  return (
    <svg viewBox="0 0 40 40" className={shared}>
      <path d="M23 7c6 1 10 5 11 11l-8 8-8-4-4-8 9-7Z" strokeWidth="1.6" />
      <path
        d="m17 23-7 7m2-11-5 2-2 6 8-1m8 2-1 8 6-2 2-5M27 13h.1"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ProjectProcess() {
  const { language } = useLanguage();
  const es = language === "es";

  return (
    <section className="relative z-10 overflow-hidden bg-[var(--background)] px-4 py-24 text-[var(--foreground)] sm:px-8 lg:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,var(--dot-color)_1px,transparent_1px)] bg-[length:18px_18px] opacity-[0.16]" />
      <div className="relative mx-auto max-w-[1480px]">
        <motion.header
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          className="mx-auto max-w-4xl text-center"
        >
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#168cff]">
            {es ? "Nuestro proceso" : "Our process"}
          </p>
          <h2 className="mt-5 text-balance text-[clamp(2.25rem,5vw,4.5rem)] font-semibold leading-[1.04] tracking-[-0.045em]">
            {es
              ? "Así desarrollamos cada proyecto"
              : "How we develop every project"}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-7 text-[var(--foreground)]/60 sm:text-[18px]">
            {es
              ? "Convertimos una idea en una solución digital funcional mediante un proceso claro, colaborativo y enfocado en resultados."
              : "We turn an idea into a functional digital solution through a clear, collaborative and results-driven process."}
          </p>
        </motion.header>

        <ol className="relative mx-auto mt-14 max-w-6xl before:absolute before:bottom-8 before:left-[23px] before:top-8 before:w-px before:bg-gradient-to-b before:from-transparent before:via-[#168cff]/55 before:to-transparent lg:mt-20 lg:before:left-1/2">
          {STEPS.map((step, index) => (
            <motion.li
              key={step.number}
              initial={{ opacity: 0, x: index % 2 === 0 ? -18 : 18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className="group relative grid min-h-[220px] grid-cols-1 pl-16 lg:grid-cols-[1fr_96px_1fr] lg:pl-0"
            >
              <span className="absolute left-0 top-8 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-[#168cff]/60 bg-[var(--background)] text-[#168cff] shadow-[0_0_30px_rgba(22,140,255,0.18)] transition group-hover:scale-110 group-hover:border-[#168cff] lg:static lg:col-start-2 lg:row-start-1 lg:mx-auto lg:mt-8">
                <span className="scale-75">
                  <StepIcon type={step.icon} />
                </span>
              </span>

              <div
                className={`relative py-8 lg:row-start-1 ${
                  index % 2 === 0
                    ? "lg:col-start-1 lg:pr-12 lg:text-right"
                    : "lg:col-start-3 lg:pl-12 lg:text-left"
                }`}
              >
                <div
                  className={`flex items-end gap-4 ${
                    index % 2 === 0 ? "lg:justify-end" : "lg:justify-start"
                  }`}
                >
                  <span className="text-[42px] font-semibold leading-none tracking-[-0.06em] text-[#168cff] sm:text-[52px]">
                    {step.number}
                  </span>
                  <h3 className="pb-1 text-xl font-semibold tracking-[-0.02em] sm:text-2xl">
                    {step.title[language]}
                  </h3>
                </div>
                <p
                  className={`mt-4 max-w-lg text-[14px] leading-6 text-[var(--foreground)]/60 sm:text-[15px] ${
                    index % 2 === 0 ? "lg:ml-auto" : "lg:mr-auto"
                  }`}
                >
                  {step.description[language]}
                </p>
                <span
                  className={`mt-7 block h-px w-20 bg-gradient-to-r from-[#168cff] to-transparent opacity-50 transition-all duration-300 group-hover:w-32 group-hover:opacity-100 ${
                    index % 2 === 0 ? "lg:ml-auto lg:rotate-180" : ""
                  }`}
                />
              </div>

              <span
                aria-hidden="true"
                className={`pointer-events-none hidden self-center text-[clamp(4rem,7vw,7rem)] font-semibold leading-none tracking-[-0.08em] text-[var(--foreground)]/[0.035] lg:block ${
                  index % 2 === 0
                    ? "col-start-3 row-start-1 pl-12 text-left"
                    : "col-start-1 row-start-1 pr-12 text-right"
                }`}
              >
                {step.number}
              </span>

              {index < STEPS.length - 1 && (
                <span className="absolute bottom-0 left-[21px] h-1.5 w-1.5 rounded-full bg-[#168cff] shadow-[0_0_12px_#168cff] lg:left-1/2 lg:-translate-x-1/2">
                  <span className="sr-only">
                    {es ? "Siguiente etapa" : "Next stage"}
                  </span>
                </span>
              )}
            </motion.li>
          ))}
        </ol>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mt-12 overflow-hidden border-y border-[#168cff]/35 bg-[rgba(var(--background-rgb),0.45)] px-6 py-12 text-center sm:px-10 sm:py-14 lg:mt-20"
        >
          <div className="pointer-events-none absolute inset-x-[15%] bottom-[-80px] h-36 rounded-full bg-[#168cff]/15 blur-3xl" />
          <h3 className="relative text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
            {es
              ? "¿Tenés una idea o un proyecto en mente?"
              : "Have an idea or project in mind?"}
          </h3>
          <p className="relative mx-auto mt-3 max-w-2xl text-sm leading-6 text-[var(--foreground)]/60 sm:text-base">
            {es
              ? "Conversemos sobre lo que necesitás y encontremos la mejor manera de convertirlo en una solución digital."
              : "Let’s discuss what you need and find the best way to turn it into a digital solution."}
          </p>
          <button
            type="button"
            onClick={() =>
              window.dispatchEvent(new Event("open-contact-modal"))
            }
            className="relative mx-auto mt-7 flex w-full max-w-[330px] items-center justify-between rounded-xl bg-[#086cff] px-6 py-4 text-left font-medium text-white transition hover:-translate-y-0.5 hover:bg-[#1685ff]"
          >
            {es ? "Contanos sobre tu proyecto" : "Tell us about your project"}
            <span aria-hidden="true">→</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
