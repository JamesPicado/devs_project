"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { getCountries, getCountryCallingCode } from "libphonenumber-js";
import { useLanguage } from "../LanguageContext";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (
        siteKey: string,
        options: { action: string },
      ) => Promise<string>;
    };
  }
}

type CountryOption = {
  code: string;
  name: string;
  dial: string;
  flagUrl: string;
};

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

const SERVICE_OPTIONS = [
  ...DEVELOPMENT_SERVICES,
  ...TECHNICAL_SERVICES,
] as const;
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
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    country: "CR",
    phone: "",
    service: "",
    message: "",
  });
  const [contactStatus, setContactStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [captchaReady, setCaptchaReady] = useState(!siteKey);
  const [hasMounted, setHasMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const countryOptions = useMemo<CountryOption[]>(() => {
    const displayNames = hasMounted
      ? new Intl.DisplayNames([es ? "es" : "en"], { type: "region" })
      : null;

    return getCountries()
      .map((code) => ({
        code,
        name: displayNames?.of(code) ?? code,
        dial: `+${getCountryCallingCode(code)}`,
        flagUrl: `https://flagcdn.com/${code.toLowerCase()}.svg`,
      }))
      .sort((a, b) =>
        hasMounted
          ? a.name.localeCompare(b.name, es ? "es" : "en")
          : a.code.localeCompare(b.code),
      );
  }, [es, hasMounted]);

  const selectedCountry = countryOptions.find(
    (country) => country.code === contactForm.country,
  );

  const updateContactForm = (field: string, value: string) => {
    setContactForm((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    const selectRequestedService = (event: Event) => {
      const service = (event as CustomEvent<string>).detail;
      if (
        SERVICE_OPTIONS.includes(service as (typeof SERVICE_OPTIONS)[number])
      ) {
        setContactForm((prev) => ({ ...prev, service }));
      }
      setContactStatus("idle");
      setIsModalOpen(true);
    };
    const openContactModal = () => {
      setContactStatus("idle");
      setIsModalOpen(true);
    };
    window.addEventListener("service-selected", selectRequestedService);
    window.addEventListener("open-contact-modal", openContactModal);
    return () => {
      window.removeEventListener("service-selected", selectRequestedService);
      window.removeEventListener("open-contact-modal", openContactModal);
    };
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isModalOpen && !dialog.open) dialog.showModal();
    if (!isModalOpen && dialog.open) dialog.close();
  }, [isModalOpen]);

  useEffect(() => {
    if (!isModalOpen) return;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsModalOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isModalOpen]);

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
        recaptchaToken = await window.grecaptcha.execute(siteKey, {
          action: "contact",
        });
      } catch (error) {
        console.error("reCAPTCHA error", error);
        setContactStatus("error");
        return;
      }
    }
    const countryInfo = countryOptions.find(
      (country) => country.code === contactForm.country,
    );
    const payload = {
      ...contactForm,
      country: countryInfo
        ? `${countryInfo.name} (${countryInfo.dial})`
        : contactForm.country,
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
      setContactForm({
        name: "",
        email: "",
        country: "CR",
        phone: "",
        service: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
      setContactStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="relative z-10 w-full bg-[var(--background)] px-4 py-24 text-[var(--foreground)] sm:px-6"
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.5em] text-[var(--foreground)]/60">
            {es ? "Contacto" : "Contact"}
          </p>
          <h2 className="text-4xl font-extrabold mt-3">
            {es ? "Trabajemos juntos" : "Let's Work Together"}
          </h2>
          <p className="text-sm text-[var(--foreground)]/70 mt-3">
            {es
              ? "Completa el formulario. Te responderé lo antes posible."
              : "Fill out the form. I will respond as soon as possible."}
          </p>
        </div>

        <dialog
          ref={dialogRef}
          onClose={() => setIsModalOpen(false)}
          onCancel={() => setIsModalOpen(false)}
          onClick={(event) => {
            if (event.target === event.currentTarget) setIsModalOpen(false);
          }}
          className={
            isModalOpen
              ? "fixed inset-0 m-auto max-h-[100dvh] w-full max-w-3xl overflow-visible bg-transparent p-3 text-[var(--foreground)] backdrop:bg-black/65 backdrop:backdrop-blur-sm sm:p-6"
              : "contents"
          }
        >
          <form
            onSubmit={submitContactForm}
            role={isModalOpen ? "dialog" : undefined}
            aria-modal={isModalOpen ? "true" : undefined}
            aria-label={
              isModalOpen
                ? es
                  ? "Formulario de solicitud"
                  : "Request form"
                : undefined
            }
            className={`contact-border space-y-6 rounded-[28px] border border-transparent bg-[var(--contact-form-bg)] p-5 shadow-none backdrop-blur-xl sm:rounded-[36px] sm:p-6 ${isModalOpen ? "max-h-[calc(100dvh-24px)] overflow-y-auto sm:max-h-[calc(100dvh-48px)]" : ""}`}
            style={{ boxShadow: "0 25px 55px rgba(15,15,15,0.12)" }}
          >
            {isModalOpen && (
              <div className="flex items-start justify-between gap-5 border-b border-[var(--foreground)]/10 pb-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-[#168cff]">
                    {es ? "Nueva solicitud" : "New request"}
                  </p>
                  <h3 className="mt-1 text-xl font-semibold">
                    {es ? "¿En qué podemos ayudarte?" : "How can we help?"}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--foreground)]/15 text-xl text-[var(--foreground)]/70 transition hover:border-[var(--foreground)]/35 hover:text-[var(--foreground)]"
                  aria-label={es ? "Cerrar formulario" : "Close form"}
                >
                  ×
                </button>
              </div>
            )}
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
                  <option value="" disabled>
                    {es ? "Selecciona un servicio" : "Select a service"}
                  </option>
                  <optgroup
                    label={
                      es ? "Servicios de desarrollo" : "Development services"
                    }
                  >
                    {DEVELOPMENT_SERVICES.map((service) => (
                      <option key={service} value={service}>
                        {es ? SERVICE_LABEL_ES[service] : service}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup
                    label={es ? "Servicios técnicos" : "Technical services"}
                  >
                    {TECHNICAL_SERVICES.map((service) => (
                      <option key={service} value={service}>
                        {es ? SERVICE_LABEL_ES[service] : service}
                      </option>
                    ))}
                  </optgroup>
                </select>
                <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-[var(--input-placeholder)]">
                  ▾
                </span>
              </div>
            </label>

            <label className="block text-sm font-semibold uppercase tracking-[0.3em] text-[var(--foreground)]/70">
              {es ? "Teléfono" : "Phone"}
              <div className="mt-2 flex gap-2">
                <div className="relative w-[112px] shrink-0 sm:w-[132px]">
                  <select
                    aria-label={es ? "Código de país" : "Country code"}
                    value={contactForm.country}
                    onChange={(e) =>
                      updateContactForm("country", e.target.value)
                    }
                    className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                  >
                    <option value="">Select country</option>
                    {countryOptions.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.code} ({country.dial}) — {country.name}
                      </option>
                    ))}
                  </select>
                  <div className="flex h-full min-h-[50px] items-center rounded-2xl border border-[var(--input-border)] bg-[var(--input-bg)] px-3 text-sm text-[var(--foreground)] transition focus-within:ring-2 focus-within:ring-[var(--input-focus-ring)] sm:px-4 sm:text-base">
                    {selectedCountry?.flagUrl && (
                      <span
                        aria-hidden="true"
                        className="mr-2 h-4 w-6 shrink-0 rounded-[2px] bg-cover bg-center shadow-[0_0_0_1px_rgba(0,0,0,0.12)]"
                        style={{
                          backgroundImage: `url(${selectedCountry.flagUrl})`,
                        }}
                      />
                    )}
                    <span className="min-w-0 flex-1 truncate whitespace-nowrap">
                      {selectedCountry ? selectedCountry.dial : "+000"}
                    </span>
                    <span
                      className="ml-2 shrink-0 text-[var(--input-placeholder)]"
                      aria-hidden="true"
                    >
                      ▾
                    </span>
                  </div>
                </div>
                <input
                  type="tel"
                  value={contactForm.phone}
                  onChange={(e) => updateContactForm("phone", e.target.value)}
                  className="min-w-0 flex-1 rounded-2xl border border-[var(--input-border)] bg-[var(--input-bg)] px-3 py-3 text-base text-[var(--foreground)] placeholder:text-[var(--input-placeholder)] transition focus:outline-none focus:ring-2 focus:ring-[var(--input-focus-ring)] focus:ring-offset-2 focus:ring-offset-[var(--background)] sm:px-4"
                  placeholder={
                    selectedCountry
                      ? `${selectedCountry.dial} 0000-0000`
                      : "+000 0000-0000"
                  }
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
                placeholder={
                  es
                    ? "Cuéntanos sobre tu proyecto o equipo..."
                    : "Tell me about your project..."
                }
              />
            </label>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                disabled={
                  contactStatus === "sending" ||
                  (Boolean(siteKey) && !captchaReady)
                }
                className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-blue-400"
              >
                {contactStatus === "sending"
                  ? es
                    ? "Enviando..."
                    : "Sending..."
                  : es
                    ? "Enviar"
                    : "Send"}
              </button>

              {contactStatus === "success" && (
                <p className="text-sm text-emerald-400">
                  {es
                    ? "Mensaje enviado correctamente."
                    : "Message sent successfully."}
                </p>
              )}
              {contactStatus === "error" && (
                <p className="text-sm text-red-400">
                  {es
                    ? "Ocurrió un error. Inténtalo de nuevo."
                    : "An error occurred. Please try again."}
                </p>
              )}
              {siteKey && !captchaReady && contactStatus !== "error" && (
                <p className="text-sm text-[var(--foreground)]/60">
                  Activating bot protection...
                </p>
              )}
            </div>
          </form>
        </dialog>
      </div>
    </section>
  );
}
