"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, LoaderCircle, Mail, Phone } from "lucide-react";
import { contactMethods, contactSchema, fieldErrors } from "@/lib/validation";
import { categories, treatments } from "@/data/treatments";
import { cn, formatPrice } from "@/lib/utils";
import { WhatsAppIcon } from "@/components/ui/icons";

const methodIcons = { WhatsApp: WhatsAppIcon, "Phone call": Phone, Email: Mail } as const;

/*
 * The form uses inverted colours so it always stands apart from the page:
 * dark espresso card in light mode, cream card in dark mode.
 */
const label = "mb-2 block font-sans text-[0.72rem] font-medium uppercase tracking-[0.18em] text-gold dark:text-accent";
const input =
  "w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3.5 font-sans text-base text-cream placeholder:text-sand/45 transition-colors focus:border-gold focus:bg-white/[0.09] focus:outline-none focus:ring-2 focus:ring-gold/25 dark:border-espresso/15 dark:bg-white dark:text-espresso dark:placeholder:text-espresso/40 dark:focus:border-accent dark:focus:ring-accent/20";
const errorText = "mt-1.5 text-left font-sans text-sm text-[#F2B08F] dark:text-[#A4451F]";
const errorBorder = "!border-[#E9A27F] dark:!border-[#B4532A]";

export function ContactForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [method, setMethod] = useState<string>("WhatsApp");
  const [service, setService] = useState("");
  const [firstName, setFirstName] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      service,
      method,
      message: String(fd.get("message") ?? ""),
      consent: fd.get("consent") === "on",
      company: String(fd.get("company") ?? ""),
    };
    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      const errs = fieldErrors(parsed.error);
      setErrors(errs);
      form.querySelector<HTMLElement>(`[name="${Object.keys(errs)[0]}"]`)?.focus();
      return;
    }
    setErrors({});
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) {
        if (json.errors) setErrors(json.errors);
        setMessage(json.error ?? "Please check the highlighted fields.");
        setStatus("error");
        return;
      }
      setFirstName(payload.name.split(" ")[0]);
      form.reset();
      setService("");
      setStatus("success");
    } catch {
      setMessage("We couldn't send your message. Check your connection and try again, or message us on WhatsApp.");
      setStatus("error");
    }
  }

  const card = "relative overflow-hidden rounded-[2rem] bg-espresso p-7 text-sand shadow-soft dark:bg-cream dark:text-espresso sm:p-10 md:p-12";

  if (status === "success") {
    return (
      <div className={cn(card, "flex h-full flex-col items-center justify-center text-center")}>
        <span className="grid h-16 w-16 place-items-center rounded-full bg-gold text-espresso">
          <Check className="h-7 w-7" />
        </span>
        <h3 className="mt-6 text-[2.6rem] !text-cream dark:!text-espresso">Thank you{firstName ? `, ${firstName}` : ""}</h3>
        <p className="mt-3 max-w-sm !text-center [hyphens:manual]">
          Your message is with our team. We&apos;ll reply by {method === "Phone call" ? "phone" : method.toLowerCase()} as soon as we can.
        </p>
        <button type="button" onClick={() => setStatus("idle")} className="btn mt-8 border border-gold/50 text-cream hover:bg-gold hover:text-espresso dark:border-espresso/30 dark:text-espresso dark:hover:bg-espresso dark:hover:text-cream">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className={card}>
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-gold/15 blur-3xl dark:bg-accent/15" />

      <div className="relative">
        <p className="!text-left font-sans text-sm font-medium text-gold dark:text-accent">Have a question? We&apos;re here to help</p>
        <h3 className="mt-3 text-[2.4rem] leading-tight !text-cream dark:!text-espresso md:text-[2.8rem]">Send us a message</h3>
        <p className="mt-3 !text-left text-[0.97rem] text-sand/90 dark:text-espresso/75">
          Ask about a treatment, a product or your skin. Fill in the details below and we&apos;ll get back to you.
        </p>
      </div>

      <div className="relative mt-9 grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="c-name" className={label}>Full name</label>
          <input id="c-name" name="name" autoComplete="name" placeholder="Your full name" className={cn(input, errors.name && errorBorder)} aria-invalid={!!errors.name} />
          {errors.name && <p className={errorText}>{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="c-email" className={label}>Email</label>
          <input id="c-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" className={cn(input, errors.email && errorBorder)} aria-invalid={!!errors.email} />
          {errors.email && <p className={errorText}>{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="c-phone" className={label}>
            Phone / WhatsApp <span className="normal-case tracking-normal opacity-70">(optional)</span>
          </label>
          <input id="c-phone" name="phone" type="tel" autoComplete="tel" placeholder="0803 000 0000" className={cn(input, errors.phone && errorBorder)} aria-invalid={!!errors.phone} />
          {errors.phone && <p className={errorText}>{errors.phone}</p>}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="c-service" className={label}>What are you interested in?</label>
          <select
            id="c-service"
            name="service"
            value={service}
            onChange={(e) => setService(e.target.value)}
            className={cn(input, "appearance-none bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10 [&_optgroup]:bg-white [&_optgroup]:text-espresso [&_option]:bg-white [&_option]:text-espresso", !service && "text-sand/60 dark:text-espresso/50")}
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23D4AF7C' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")" }}
          >
            <option value="">Choose a service (optional)</option>
            <option value="general">General question / not sure yet</option>
            {categories.map((c) => (
              <optgroup key={c.slug} label={c.name}>
                {treatments
                  .filter((t) => t.category === c.slug)
                  .map((t) => (
                    <option key={t.slug} value={t.slug}>
                      {t.name} ({formatPrice(t.price)})
                    </option>
                  ))}
              </optgroup>
            ))}
            <optgroup label="Shop">
              <option value="products">Skincare products</option>
            </optgroup>
          </select>
          <p className="mt-2 !text-left text-xs text-sand/70 dark:text-espresso/60">
            Ready to book? Use our{" "}
            <Link href={service && service !== "general" && service !== "products" ? `/book?treatment=${service}` : "/book"} className="underline underline-offset-2 hover:text-gold dark:hover:text-accent">
              booking form
            </Link>{" "}
            to request a time.
          </p>
        </div>

        <fieldset className="sm:col-span-2">
          <legend className={label}>How should we reply?</legend>
          <div className="grid grid-cols-3 gap-2.5" role="radiogroup">
            {contactMethods.map((m) => {
              const Icon = methodIcons[m];
              const selected = method === m;
              return (
                <button
                  key={m}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setMethod(m)}
                  className={cn(
                    "flex flex-col items-center gap-1.5 rounded-xl border px-2 py-3.5 font-sans text-sm transition-all duration-300 sm:flex-row sm:justify-center sm:gap-2",
                    selected
                      ? "border-gold bg-gold text-espresso dark:border-espresso dark:bg-espresso dark:text-cream"
                      : "border-white/15 text-cream hover:border-gold/60 dark:border-espresso/15 dark:text-espresso dark:hover:border-espresso/40",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {m}
                </button>
              );
            })}
          </div>
          {errors.method && <p className={errorText}>{errors.method}</p>}
        </fieldset>

        <div className="sm:col-span-2">
          <label htmlFor="c-message" className={label}>Your message</label>
          <textarea
            id="c-message"
            name="message"
            rows={5}
            placeholder="Tell us about your skin concern, the treatment you're curious about, or any question you have."
            className={cn(input, "resize-y", errors.message && errorBorder)}
            aria-invalid={!!errors.message}
          />
          {errors.message && <p className={errorText}>{errors.message}</p>}
        </div>
      </div>

      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <input name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <label className="relative mt-7 flex cursor-pointer items-start gap-3 font-sans text-sm leading-relaxed text-sand/90 dark:text-espresso/75">
        <input type="checkbox" name="consent" className="mt-1 h-4 w-4 shrink-0 accent-[#D4AF7C]" />
        <span>
          I agree that SKNN LAB may contact me about this message, as described in the{" "}
          <Link href="/privacy" className="underline underline-offset-2 hover:text-gold dark:hover:text-accent">privacy policy</Link>.
        </span>
      </label>
      {errors.consent && <p className={errorText}>{errors.consent}</p>}

      <AnimatePresence>
        {status === "error" && message && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="alert"
            className="relative mt-6 rounded-xl border border-[#E9A27F]/40 bg-[#E9A27F]/10 px-4 py-3 !text-left font-sans text-sm text-[#F2B08F] dark:border-[#B4532A]/30 dark:bg-[#B4532A]/10 dark:text-[#8A3E1F]"
          >
            {message}
          </motion.p>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn relative mt-8 w-full border border-gold bg-gold !py-4 text-espresso hover:-translate-y-0.5 hover:bg-transparent hover:text-gold dark:border-espresso dark:bg-espresso dark:text-cream dark:hover:bg-transparent dark:hover:text-espresso"
      >
        {status === "loading" ? (
          <>
            <LoaderCircle className="h-4 w-4 animate-spin" /> Sending…
          </>
        ) : (
          <>
            Send message <ArrowRight className="arrow h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
}
