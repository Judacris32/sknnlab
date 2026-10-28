import { z } from "zod";

const phone = z
  .string({ error: "Please enter a valid phone number" })
  .trim()
  .min(7, "Please enter a valid phone number")
  .max(20, "Please enter a valid phone number")
  .regex(/^[+\d\s()-]+$/, "Please enter a valid phone number");

export const timeWindows = ["Morning", "Afternoon", "Evening"] as const;

export const bookingSchema = z.object({
  name: z.string({ error: "Please enter your full name" }).trim().min(2, "Please enter your full name").max(80),
  phone,
  email: z.string({ error: "Please enter a valid email address" }).trim().email("Please enter a valid email address").max(120),
  treatment: z.string({ error: "Please choose a treatment" }).trim().min(1, "Please choose a treatment"),
  date: z.string({ error: "Please choose a preferred date" }).regex(/^\d{4}-\d{2}-\d{2}$/, "Please choose a preferred date"),
  time: z.enum(timeWindows, { message: "Please choose a time of day" }),
  visit: z.enum(["first", "returning"], { message: "Please let us know if you've visited before" }),
  notes: z.string().trim().max(1000, "Please keep notes under 1,000 characters").optional().default(""),
  consent: z.literal(true, { message: "Please agree so we can contact you about your booking" }),
  company: z.string().optional(), // honeypot
});

export type BookingInput = z.infer<typeof bookingSchema>;

export const contactMethods = ["WhatsApp", "Phone call", "Email"] as const;

export const contactSchema = z.object({
  name: z.string({ error: "Please enter your name" }).trim().min(2, "Please enter your name").max(80),
  email: z.string({ error: "Please enter a valid email address" }).trim().email("Please enter a valid email address").max(120),
  phone: z.union([phone, z.literal("")]).optional().default(""),
  service: z.string().trim().max(80).optional().default(""),
  method: z.enum(contactMethods, { message: "Please choose how we should reply" }),
  message: z.string({ error: "Please write your message" }).trim().min(10, "Please tell us a little more (at least 10 characters)").max(2000),
  consent: z.literal(true, { message: "Please agree so we can reply to you" }),
  company: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

/** Today's date in Lagos as YYYY-MM-DD. */
export function todayInLagos() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Africa/Lagos" }).format(new Date());
}

export function fieldErrors(error: z.ZodError) {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
