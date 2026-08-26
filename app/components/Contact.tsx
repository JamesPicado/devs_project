"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "../LanguageContext";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

type CountryOption = { code: string; name: string; dial: string; flag: string };
type RestCountry = {
  cca2?: string;
  flag?: string;
  name?: { common?: string };
  idd?: { root?: string; suffixes?: string[] };
};

const DEFAULT_COUNTRIES: readonly CountryOption[] = [
  { code: "CR", name: "Costa Rica", dial: "+506", flag: "🇨🇷" },
  { code: "US", name: "Estados Unidos", dial: "+1", flag: "🇺🇸" },
  { code: "MX", name: "México", dial: "+52", flag: "🇲🇽" },
  { code: "PA", name: "Panamá", dial: "+507", flag: "🇵🇦" },
  { code: "CO", name: "Colombia", dial: "+57", flag: "🇨🇴" },
] as const;

const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";

const DEVELOPMENT_SERVICES = [
  "Custom Software Development",
  "Web Development",
  "E-commerce Solutions",
  "Support & Optimization",
] as const;

const TECHNICAL_SERVICES = [
  "Diagnostics & Review",
  "Software & Operating System",
  "Preventive Maintenance",
] as const;

const SERVICE_OPTIONS = [...DEVELOPMENT_SERVICES, ...TECHNICAL_SERVICES] as const;
const SERVICE_LABEL_ES: Record<(typeof SERVICE_OPTIONS)[number], string> = {
  "Custom Software Development": "Desarrollo de software a medida",
  "Web Development": "Desarrollo web",
  "E-commerce Solutions": "Soluciones e-commerce",
  "Support & Optimization": "Soporte y optimización",
  "Diagnostics & Review": "Diagnóstico y revisión",
  "Software & Operating System": "Software y sistema operativo",
  "Preventive Maintenance": "Mantenimiento preventivo",
};

export default function Contact() {
  const { language } = useLanguage();
  const es = language === "es";
  const [contactForm, setContactForm] = useState({ name: "", email: "", country: "CR", phone: "", service: "", message: "" });
  const [countryOptions, setCountryOptions] = useState(Array.from(DEFAULT_COUNTRIES));
  const [contactStatus, setContactStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [captchaReady, setCaptchaReady] = useState(!siteKey);

  const selectedCountry = countryOptions.find((country) => country.code === contactForm.country);

  const updateContactForm = (field: string, value: string) => {
    setContactForm((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    const selectRequestedService = (event: Event) => {
      const service = (event as CustomEvent<string>).detail;
      if (SERVICE_OPTIONS.includes(service as (typeof SERVICE_OPTIONS)[number])) {
        setContactForm((prev) => ({ ...prev, service }));
      }
    };
    window.addEventListener("service-selected", selectRequestedService);
    return () => window.removeEventListener("service-selected", selectRequestedService);
  }, []);

  useEffect(() => {
    let isMounted = true;
    const loadCountries = async () => {
      try {
        const res = await fetch("https://restcountries.com/v3.1/all?fields=name,cca2,idd,flag");
        const data = await res.json();
        const mapped: CountryOption[] = data
          .map((country: RestCountry) => {
            const dialRoot = country?.idd?.root ?? "";
            const suffix = country?.idd?.suffixes?.[0] ?? "";
            const dial = `${dialRoot}${suffix}`;
            if (!dial) return null;
            return {
              code: country?.cca2 ?? "",
              name: country?.name?.common ?? country?.cca2 ?? "",
              dial,
              flag: country?.flag ?? "",
            } as CountryOption;
          })
          .filter(Boolean)
          .sort((a: CountryOption, b: CountryOption) => a.name.localeCompare(b.name, "es"));

        if (isMounted && mapped.length) {
          setCountryOptions(mapped);
        }
      } catch (error) {
        console.warn("Country fetch failed", error);
      }
    };

    loadCountries();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!siteKey) {
      setCaptchaReady(true);
      return;
    }
    let interval: NodeJS.Timeout | null = null;
    const checkCaptcha = () => {
      if (typeof window === "undefined") return;
      if (window.grecaptcha) {
        window.grecaptcha.ready(() => setCaptchaReady(true));
        if (interval) clearInterval(interval);
      }
    };
    checkCaptcha();
    interval = setInterval(checkCaptcha, 500);
    return () => {
      if (interval) clearInterval(interval);
    };
  }, []);

  const submitContactForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (contactStatus === "sending") return;
    setContactStatus("sending");
    let recaptchaToken = "";
    if (siteKey) {
      if (typeof window === "undefined" || !window.grecaptcha) {
        setContactStatus("error");
        return;
      }
      try {
        await new Promise<void>((resolve) => {
          window.grecaptcha?.ready(() => resolve());
        });
        recaptchaToken = await window.grecaptcha.execute(siteKey, { action: "contact" });
      } catch (error) {
        console.error("reCAPTCHA error", error);
        setContactStatus("error");
        return;
      }
    }
    const countryInfo = countryOptions.find((country) => country.code === contactForm.country);
    const payload = {
      ...contactForm,
      country: countryInfo ? `${countryInfo.flag} ${countryInfo.name} (${countryInfo.dial})` : contactForm.country,
      recaptchaToken,
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");
      setContactStatus("success");
      setContactForm({ name: "", email: "", country: "CR", phone: "", service: "", message: "" });
    } catch (err) {
      console.error(err);
      setContactStatus("error");
    }
  };

  return (
    <section id="contact" className="relative z-10 w-full bg-[var(--background)] text-[var(--foreground)] px-4 sm:px-6 py-24">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.5em] text-[var(--foreground)]/60">{es ? "Contacto" : "Contact"}</p>
          <h2 className="text-4xl font-extrabold mt-3">{es ? "Trabajemos juntos" : "Let's Work Together"}</h2>
          <p className="text-sm text-[var(--foreground)]/70 mt-3">
            {es ? "Completa el formulario. Te responderé lo antes posible." : "Fill out the form. I will respond as soon as possible."}
          </p>
        </div>

        <form
          onSubmit={submitContactForm}
          className="contact-border space-y-6 rounded-[36px] border border-transparent bg-[var(--contact-form-bg)] p-6 shadow-none backdrop-blur-xl"
          style={{ boxShadow: "0 25px 55px rgba(15,15,15,0.12)" }}
        >
          <label className="block text-sm font-semibold uppercase tracking-[0.3em] text-[var(--foreground)]/70">
            {es ? "Nombre" : "Name"}
            <input
              type="text"
              required
              value={contactForm.name}
              onChange={(e) => updateContactForm("name", e.target.value)}
              className="mt-2 w-full rounded-2xl border border-[var(--input-border)] bg-[var(--input-bg)] px-4 py-3 text-base text-[var(--foreground)] placeholder:text-[var(--input-placeholder)] transition focus:outline-none focus:ring-2 focus:ring-[var(--input-focus-ring)] focus:ring-offset-2 focus:ring-offset-[var(--background)]"
              placeholder={es ? "¿Cuál es tu nombre?" : "What is your name?"}
            />
          </label>

          <label className="block text-sm font-semibold uppercase tracking-[0.3em] text-[var(--foreground)]/70">
            Email
            <input
              type="email"
              required
              value={contactForm.email}
              onChange={(e) => updateContactForm("email", e.target.value)}
              className="mt-2 w-full rounded-2xl border border-[var(--input-border)] bg-[var(--input-bg)] px-4 py-3 text-base text-[var(--foreground)] placeholder:text-[var(--input-placeholder)] transition focus:outline-none focus:ring-2 focus:ring-[var(--input-focus-ring)] focus:ring-offset-2 focus:ring-offset-[var(--background)]"
              placeholder="email@email.com"
            />
          </label>

          <label className="block text-sm font-semibold uppercase tracking-[0.3em] text-[var(--foreground)]/70">
            {es ? "Servicio" : "Service"}
            <div className="relative mt-2">
              <select
                required
                value={contactForm.service}
                onChange={(e) => updateContactForm("service", e.target.value)}
                className="w-full appearance-none rounded-2xl border border-[var(--input-border)] bg-[var(--input-bg)] px-4 py-3 pr-11 text-base font-normal normal-case tracking-normal text-[var(--foreground)] transition focus:outline-none focus:ring-2 focus:ring-[var(--input-focus-ring)] focus:ring-offset-2 focus:ring-offset-[var(--background)]"
              >
                <option value="" disabled>{es ? "Selecciona un servicio" : "Select a service"}</option>
                <optgroup label={es ? "Servicios de desarrollo" : "Development services"}>
                  {DEVELOPMENT_SERVICES.map((service) => <option key={service} value={service}>{es ? SERVICE_LABEL_ES[service] : service}</option>)}
                </optgroup>
                <optgroup label={es ? "Servicios técnicos" : "Technical services"}>
                  {TECHNICAL_SERVICES.map((service) => <option key={service} value={service}>{es ? SERVICE_LABEL_ES[service] : service}</option>)}
                </optgroup>
              </select>
              <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-[var(--input-placeholder)]">▾</span>
            </div>
          </label>

          <label className="block text-sm font-semibold uppercase tracking-[0.3em] text-[var(--foreground)]/70">
            {es ? "Teléfono" : "Phone"}
            <div className="mt-2 flex gap-2">
              <div className="relative w-[120px]">
                <select
                  value={contactForm.country}
                  onChange={(e) => updateContactForm("country", e.target.value)}
                  className="w-full appearance-none rounded-2xl border border-[var(--input-border)] bg-[var(--input-bg)] pr-10 pl-4 py-3 text-base text-[var(--foreground)] transition focus:outline-none focus:ring-2 focus:ring-[var(--input-focus-ring)] focus:ring-offset-2 focus:ring-offset-[var(--background)]"
                >
                  <option value="">Select country</option>
                  {countryOptions.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.flag} {country.code} ({country.dial})
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[var(--input-placeholder)]">▾</span>
              </div>
              <input
                type="tel"
                value={contactForm.phone}
                onChange={(e) => updateContactForm("phone", e.target.value)}
                className="flex-1 rounded-2xl border border-[var(--input-border)] bg-[var(--input-bg)] px-4 py-3 text-base text-[var(--foreground)] placeholder:text-[var(--input-placeholder)] transition focus:outline-none focus:ring-2 focus:ring-[var(--input-focus-ring)] focus:ring-offset-2 focus:ring-offset-[var(--background)]"
                placeholder={selectedCountry ? `${selectedCountry.dial} 0000-0000` : "+000 0000-0000"}
              />
            </div>
          </label>

          <label className="block text-sm font-semibold uppercase tracking-[0.3em] text-[var(--foreground)]/70">
            {es ? "Mensaje" : "Message"}
            <textarea
              required
              rows={5}
              value={contactForm.message}
              onChange={(e) => updateContactForm("message", e.target.value)}
              className="mt-2 w-full rounded-2xl border border-[var(--input-border)] bg-[var(--input-bg)] px-4 py-3 text-base text-[var(--foreground)] placeholder:text-[var(--input-placeholder)] transition focus:outline-none focus:ring-2 focus:ring-[var(--input-focus-ring)] focus:ring-offset-2 focus:ring-offset-[var(--background)] resize-none"
              placeholder={es ? "Cuéntanos sobre tu proyecto o equipo..." : "Tell me about your project..."}
            />
          </label>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              disabled={contactStatus === "sending" || (Boolean(siteKey) && !captchaReady)}
              className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-blue-400"
            >
              {contactStatus === "sending" ? (es ? "Enviando..." : "Sending...") : (es ? "Enviar" : "Send")}
            </button>

            {contactStatus === "success" && <p className="text-sm text-emerald-400">{es ? "Mensaje enviado correctamente." : "Message sent successfully."}</p>}
            {contactStatus === "error" && <p className="text-sm text-red-400">{es ? "Ocurrió un error. Inténtalo de nuevo." : "An error occurred. Please try again."}</p>}
            {siteKey && !captchaReady && contactStatus !== "error" && (
              <p className="text-sm text-[var(--foreground)]/60">Activating bot protection...</p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
