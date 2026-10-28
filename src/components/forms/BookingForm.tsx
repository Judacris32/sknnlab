"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CalendarDays, Check, Clock, LoaderCircle, Moon, Sun, Sunrise } from "lucide-react";
import { categories, getTreatment, treatments } from "@/data/treatments";
import { bookingSchema, fieldErrors, timeWindows, todayInLagos } from "@/lib/validation";
import { cn, formatPrice, whatsappLink } from "@/lib/utils";
import { site } from "@/config/site";
import { WhatsAppIcon } from "@/components/ui/icons";

type Status = "idle" | "loading" | "success" | "error";

const timeIcons = { Morning: Sunrise, Afternoon: Sun, Evening: Moon } as const;

export function BookingForm({ initialTreatment }: { initialTreatment?: string }) {
  const valid = initialTreatment && getTreatment(initialTreatment) ? initialTreatment : "";
  const [treatment, setTreatment] = useState(valid);
  const [time, setTime] = useState<string>("");
  const [visit, setVisit] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState<{ name: string; date: string; time: string } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const today = useMemo(() => todayInLagos(), []);
  const selected = treatment ? getTreatment(treatment) : undefined;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      email: String(fd.get("email") ?? ""),
      treatment,
      date: String(fd.get("date") ?? ""),
      time,
      visit,
      notes: String(fd.get("notes") ?? ""),
      consent: fd.get("consent") === "on",
      company: String(fd.get("company") ?? ""),
    };

    const parsed = bookingSchema.safeParse(payload);
    const errs = parsed.success ? {} : fieldErrors(parsed.error);
    if (payload.date && payload.date < today) errs.date = "Please choose a date from today onwards";
    if (Object.keys(errs).length) {
      setErrors(errs);
      const first = Object.keys(errs)[0];
      formRef.current?.querySelector<HTMLElement>(`[data-field="${first}"]`)?.focus();
      return;
    }

    setErrors({});
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/book", {
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
      setSubmitted({
        name: payload.name.split(" ")[0],
        date: new Date(`${payload.date}T00:00:00`).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" }),
        time: payload.time,
      });
      setStatus("success");
      window.scrollTo({ top: (formRef.current?.getBoundingClientRect().top ?? 0) + window.scrollY - 140, behavior: "smooth" });
    } catch {
      setMessage("Connection problem. Please check your internet and try again, or message us on WhatsApp.");
      setStatus("error");
    }
  }

  if (status === "success" && submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-2xl rounded-[2rem] border border-line/70 bg-surface p-9 text-center shadow-soft md:p-14"
      >
        <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-primary text-on-primary">
          <Check className="h-9 w-9" strokeWidth={1.6} />
        </span>
        <p className="eyebrow mt-8">Request received</p>
        <h2 className="mt-4 text-5xl md:text-6xl">
          Thank you, <em className="font-normal italic text-accent dark:text-primary">{submitted.name}</em>
        </h2>
        <p className="mx-auto mt-6 max-w-md !text-center [hyphens:manual]">
          Your request for <strong className="font-medium text-ink">{selected?.name}</strong> on{" "}
          <strong className="font-medium text-ink">{submitted.date}</strong> ({submitted.time.toLowerCase()}) has been sent to our team.
          We&apos;ll contact you shortly to confirm your appointment and payment. A confirmation has also been sent to your email.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href={whatsappLink(`Hello SKNN LAB, I just requested a ${selected?.name} appointment for ${submitted.date} (${submitted.time}).`)}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
          >
            <WhatsAppIcon className="h-4 w-4" /> Follow up on WhatsApp
          </a>
          <Link href="/" className="btn btn-ghost">Back to home</Link>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
      <form
        ref={formRef}
        onSubmit={onSubmit}
        noValidate
        className="rounded-[2rem] border border-line/70 bg-surface p-6 shadow-soft sm:p-9 md:p-11 lg:col-span-7"
      >
        <Step n={1} title="Choose your treatment" />
        <div className="mt-5">
          <label htmlFor="treatment" className="field-label">Treatment</label>
          <select
            id="treatment"
            data-field="treatment"
            value={treatment}
            onChange={(e) => setTreatment(e.target.value)}
            className={cn("field appearance-none bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10", errors.treatment && "!border-[#B4532A]")}
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23C89B62' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")" }}
            aria-invalid={!!errors.treatment}
            aria-describedby={errors.treatment ? "treatment-error" : undefined}
          >
            <option value="">Select a treatment…</option>
            {categories.map((c) => (
              <optgroup key={c.slug} label={c.name}>
                {treatments
                  .filter((t) => t.category === c.slug)
                  .map((t) => (
                    <option key={t.slug} value={t.slug}>
                      {t.name} — {formatPrice(t.price)}
                    </option>
                  ))}
              </optgroup>
            ))}
          </select>
          {errors.treatment && <p id="treatment-error" className="field-error">{errors.treatment}</p>}
          <p className="mt-2 !text-left text-sm text-text/80">
            Not sure? Choose <button type="button" className="text-accent underline underline-offset-2 dark:text-primary" onClick={() => setTreatment("consultation")}>Skin Consultation</button> and we&apos;ll guide you.
          </p>
        </div>

        <div className="my-9 h-px bg-line/70" />
        <Step n={2} title="Pick a preferred time" />
        <div className="mt-5 grid gap-6">
          <div>
            <label htmlFor="date" className="field-label">Preferred date</label>
            <div className="relative">
              <input
                id="date"
                name="date"
                type="date"
                min={today}
                data-field="date"
                className={cn("field", errors.date && "!border-[#B4532A]")}
                aria-invalid={!!errors.date}
                aria-describedby={errors.date ? "date-error" : undefined}
              />
            </div>
            {errors.date && <p id="date-error" className="field-error">{errors.date}</p>}
          </div>
          <fieldset>
            <legend className="field-label">Time of day</legend>
            <div className="grid grid-cols-3 gap-2.5" role="radiogroup">
              {timeWindows.map((w, i) => {
                const Icon = timeIcons[w];
                return (
                  <button
                    key={w}
                    type="button"
                    role="radio"
                    aria-checked={time === w}
                    data-field={i === 0 ? "time" : undefined}
                    onClick={() => setTime(w)}
                    className={cn(
                      "flex flex-col items-center gap-1.5 rounded-xl border px-2 py-4 font-sans text-sm transition-all",
                      time === w
                        ? "border-primary bg-primary text-on-primary shadow-lift"
                        : "border-line text-ink hover:border-primary",
                      errors.time && time !== w && "border-[#B4532A]/60",
                    )}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                    {w}
                  </button>
                );
              })}
            </div>
            {errors.time && <p className="field-error">{errors.time}</p>}
          </fieldset>
          <fieldset>
            <legend className="field-label">Have you visited SKNN LAB before?</legend>
            <div className="grid grid-cols-2 gap-2.5" role="radiogroup">
              {[
                { v: "first", l: "This is my first visit" },
                { v: "returning", l: "I'm a returning client" },
              ].map((o, i) => (
                <button
                  key={o.v}
                  type="button"
                  role="radio"
                  aria-checked={visit === o.v}
                  data-field={i === 0 ? "visit" : undefined}
                  onClick={() => setVisit(o.v)}
                  className={cn(
                    "rounded-xl border px-3 py-3.5 font-sans text-sm transition-all",
                    visit === o.v ? "border-primary bg-soft text-ink ring-1 ring-primary" : "border-line text-ink hover:border-primary",
                  )}
                >
                  {o.l}
                </button>
              ))}
            </div>
            {errors.visit && <p className="field-error">{errors.visit}</p>}
          </fieldset>
        </div>

        <div className="my-9 h-px bg-line/70" />
        <Step n={3} title="Your details" />
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <Field id="name" label="Full name" autoComplete="name" error={errors.name} className="sm:col-span-2" />
          <Field id="phone" label="Phone / WhatsApp" type="tel" autoComplete="tel" placeholder="0803 000 0000" error={errors.phone} />
          <Field id="email" label="Email" type="email" autoComplete="email" placeholder="you@example.com" error={errors.email} />
          <div className="sm:col-span-2">
            <label htmlFor="notes" className="field-label">
              Notes <span className="normal-case tracking-normal text-text/70">(optional)</span>
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={4}
              data-field="notes"
              placeholder="Skin concerns, allergies, or anything we should know before your visit"
              className={cn("field resize-y", errors.notes && "!border-[#B4532A]")}
            />
            {errors.notes && <p className="field-error">{errors.notes}</p>}
          </div>
        </div>

        {/* Honeypot — hidden from people, tempting for bots */}
        <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="company">Company</label>
          <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <label className="mt-8 flex cursor-pointer items-start gap-3 font-sans text-sm leading-relaxed text-text">
          <input
            type="checkbox"
            name="consent"
            data-field="consent"
            className="mt-1 h-4 w-4 shrink-0 rounded border-line accent-[rgb(var(--primary))]"
          />
          <span>
            I agree that SKNN LAB may contact me by phone, WhatsApp or email about this request, as described in the{" "}
            <Link href="/privacy" className="text-accent underline underline-offset-2 dark:text-primary">privacy policy</Link>.
          </span>
        </label>
        {errors.consent && <p className="field-error">{errors.consent}</p>}

        <AnimatePresence>
          {status === "error" && message && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              role="alert"
              className="mt-6 rounded-xl border border-[#B4532A]/30 bg-[#B4532A]/[0.07] px-4 py-3 !text-left font-sans text-sm text-[#8A3E1F] dark:text-[#E9A27F]"
            >
              {message}
            </motion.p>
          )}
        </AnimatePresence>

        <button type="submit" disabled={status === "loading"} className="btn btn-primary mt-8 w-full !py-4">
          {status === "loading" ? (
            <>
              <LoaderCircle className="h-4 w-4 animate-spin" /> Sending request…
            </>
          ) : (
            <>
              Request appointment <ArrowRight className="arrow h-4 w-4" />
            </>
          )}
        </button>
        <p className="mt-4 !text-center font-sans text-xs text-text/75 [hyphens:manual]">
          No payment is taken online. We&apos;ll confirm your time and payment with you directly.
        </p>
      </form>

      {/* Summary */}
      <aside className="lg:col-span-5">
        <div className="space-y-5 lg:sticky lg:top-28">
          <div className="overflow-hidden rounded-[2rem] bg-deep p-8 text-[#D9C1A4] md:p-9">
            <p className="font-sans text-[0.68rem] uppercase tracking-[0.26em] text-[#D4AF7C]">Your selection</p>
            <AnimatePresence mode="wait">
              <motion.div key={selected?.slug ?? "none"} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
                {selected ? (
                  <>
                    <h3 className="mt-4 text-[2.3rem] leading-tight !text-[#F6E9D9]">{selected.name}</h3>
                    <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 font-sans text-sm">
                      <span className="text-[#F6E9D9]">{formatPrice(selected.price)}</span>
                      {selected.duration && (
                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5 text-[#D4AF7C]" /> {selected.duration}
                        </span>
                      )}
                    </div>
                    <div className="my-5 h-px w-12 bg-[#D4AF7C]" />
                    <p className="text-[0.95rem] text-[#D9C1A4]">{selected.summary}</p>
                  </>
                ) : (
                  <>
                    <h3 className="mt-4 text-[2.3rem] leading-tight !text-[#F6E9D9]">No treatment yet</h3>
                    <p className="mt-4 text-[0.95rem] text-[#D9C1A4]">
                      Choose a treatment to see its price, duration and what&apos;s included.
                    </p>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="rounded-[2rem] border border-line/70 bg-surface p-8 md:p-9">
            <h3 className="text-[2rem]">What happens next</h3>
            <ol className="mt-6 space-y-5">
              {[
                ["Send your request", "Choose a treatment and a preferred day and time."],
                ["We confirm", "Our team contacts you to confirm the exact time and payment."],
                ["Your visit", `Arrive at ${site.address.line1}, ${site.address.city}.`],
              ].map(([t, d], i) => (
                <li key={t} className="flex gap-4">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-primary font-sans text-xs text-ink">{i + 1}</span>
                  <div>
                    <p className="!text-left font-sans font-medium text-ink">{t}</p>
                    <p className="!text-left text-[0.93rem]">{d}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-7 flex items-center gap-3 rounded-xl bg-soft/60 p-4 font-sans text-sm text-ink">
              <CalendarDays className="h-5 w-5 shrink-0 text-accent dark:text-primary" />
              <span>
                Prefer to talk? Call{" "}
                <a href={`tel:${site.contact.phones[0].tel}`} className="underline underline-offset-2">{site.contact.phones[0].display}</a>{" "}
                or{" "}
                <a href={whatsappLink("Hello SKNN LAB, I'd like to book an appointment.")} target="_blank" rel="noreferrer" className="underline underline-offset-2">
                  WhatsApp us
                </a>
                .
              </span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

function Step({ n, title }: { n: number; title: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="grid h-9 w-9 place-items-center rounded-full bg-primary font-sans text-sm font-medium text-on-primary">{n}</span>
      <h2 className="text-[1.9rem] md:text-[2.2rem]">{title}</h2>
    </div>
  );
}

function Field({
  id,
  label,
  type = "text",
  error,
  className,
  ...rest
}: {
  id: string;
  label: string;
  type?: string;
  error?: string;
  className?: string;
  autoComplete?: string;
  placeholder?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="field-label">{label}</label>
      <input
        id={id}
        name={id}
        type={type}
        data-field={id}
        className={cn("field", error && "!border-[#B4532A]")}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...rest}
      />
      {error && <p id={`${id}-error`} className="field-error">{error}</p>}
    </div>
  );
}
