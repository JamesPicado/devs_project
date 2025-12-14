"use client";

import { useState, useEffect } from "react";

type CountryOption = { code: string; name: string; dial: string; flag: string };

const DEFAULT_COUNTRIES: readonly CountryOption[] = [
  { code: "CR", name: "Costa Rica", dial: "+506", flag: "🇨🇷" },
  { code: "US", name: "Estados Unidos", dial: "+1", flag: "🇺🇸" },
  { code: "MX", name: "México", dial: "+52", flag: "🇲🇽" },
  { code: "PA", name: "Panamá", dial: "+507", flag: "🇵🇦" },
  { code: "CO", name: "Colombia", dial: "+57", flag: "🇨🇴" },
] as const;

export default function Contact() {
  const [contactForm, setContactForm] = useState({ name: "", email: "", country: "CR", phone: "", message: "" });
  const [countryOptions, setCountryOptions] = useState(Array.from(DEFAULT_COUNTRIES));
  const [contactStatus, setContactStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const selectedCountry = countryOptions.find((country) => country.code === contactForm.country);

  const updateContactForm = (field: string, value: string) => {
    setContactForm((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    let isMounted = true;
    const loadCountries = async () => {
      try {
        const res = await fetch("https://restcountries.com/v3.1/all?fields=name,cca2,idd,flag");
        const data = await res.json();
        const mapped: CountryOption[] = data
          .map((country: any) => {
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

  const submitContactForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (contactStatus === "sending") return;
    setContactStatus("sending");
    const countryInfo = countryOptions.find((country) => country.code === contactForm.country);
    const payload = {
      ...contactForm,
      country: countryInfo ? `${countryInfo.flag} ${countryInfo.name} (${countryInfo.dial})` : contactForm.country,
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");
      setContactStatus("success");
      setContactForm({ name: "", email: "", country: "CR", phone: "", message: "" });
    } catch (err) {
      console.error(err);
      setContactStatus("error");
    }
  };

  return (
    <section id="contact" className="relative z-10 w-full bg-[var(--background)] text-[var(--foreground)] px-4 sm:px-6 py-24">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.5em] text-[var(--foreground)]/60">Contact</p>
          <h2 className="text-4xl font-extrabold mt-3">Let's Work Together</h2>
          <p className="text-sm text-[var(--foreground)]/70 mt-3">
            Fill out the form. I will respond as soon as possible.
          </p>
        </div>

        <form onSubmit={submitContactForm} className="space-y-6 bg-[rgba(var(--background-rgb),0.4)] border border-white/10 rounded-[36px] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
          <label className="block text-sm font-semibold uppercase tracking-[0.3em] text-[var(--foreground)]/70">
            Name
            <input
              type="text"
              required
              value={contactForm.name}
              onChange={(e) => updateContactForm("name", e.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-[rgba(var(--background-rgb),0.35)] px-4 py-3 text-base text-[var(--foreground)] placeholder:text-[var(--foreground)]/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="What is your name?"
            />
          </label>

          <label className="block text-sm font-semibold uppercase tracking-[0.3em] text-[var(--foreground)]/70">
            Email
            <input
              type="email"
              required
              value={contactForm.email}
              onChange={(e) => updateContactForm("email", e.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-[rgba(var(--background-rgb),0.35)] px-4 py-3 text-base text-[var(--foreground)] placeholder:text-[var(--foreground)]/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="email@email.com"
            />
          </label>

          <label className="block text-sm font-semibold uppercase tracking-[0.3em] text-[var(--foreground)]/70">
            Phone
            <div className="mt-2 flex gap-2">
              <div className="relative w-[120px]">
                <select
                  value={contactForm.country}
                  onChange={(e) => updateContactForm("country", e.target.value)}
                  className="w-full appearance-none rounded-2xl border border-white/10 bg-[rgba(var(--background-rgb),0.35)] pr-10 pl-4 py-3 text-base text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select country</option>
                  {countryOptions.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.flag} {country.code} ({country.dial})
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[var(--foreground)]/60">▾</span>
              </div>
              <input
                type="tel"
                value={contactForm.phone}
                onChange={(e) => updateContactForm("phone", e.target.value)}
                className="flex-1 rounded-2xl border border-white/10 bg-[rgba(var(--background-rgb),0.35)] px-4 py-3 text-base text-[var(--foreground)] placeholder:text-[var(--foreground)]/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={selectedCountry ? `${selectedCountry.dial} 0000-0000` : "+000 0000-0000"}
              />
            </div>
          </label>

          <label className="block text-sm font-semibold uppercase tracking-[0.3em] text-[var(--foreground)]/70">
            Message
            <textarea
              required
              rows={5}
              value={contactForm.message}
              onChange={(e) => updateContactForm("message", e.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-[rgba(var(--background-rgb),0.35)] px-4 py-3 text-base text-[var(--foreground)] placeholder:text-[var(--foreground)]/40 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Tell me about your project..."
            />
          </label>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              disabled={contactStatus === "sending"}
              className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-blue-400"
            >
              {contactStatus === "sending" ? "Sending..." : "Send"}
            </button>

            {contactStatus === "success" && <p className="text-sm text-emerald-400">Message sent successfully.</p>}
            {contactStatus === "error" && <p className="text-sm text-red-400">An error occurred. Please try again.</p>}
          </div>
        </form>
      </div>
    </section>
  );
}
