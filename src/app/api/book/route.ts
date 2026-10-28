import { NextResponse } from "next/server";
import { bookingSchema, fieldErrors, todayInLagos } from "@/lib/validation";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { clientBookingEmail, clinicBookingEmail, fromAddress, getResend, inbox, type BookingEmailData } from "@/lib/email";
import { getTreatment } from "@/data/treatments";
import { formatPrice } from "@/lib/utils";

export const runtime = "nodejs";

const dateFmt = new Intl.DateTimeFormat("en-GB", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real visitors never see or fill this field.
  if (body && typeof body === "object" && "company" in body && (body as { company?: string }).company) {
    return NextResponse.json({ ok: true });
  }

  if (!rateLimit(`book:${clientIp(req)}`)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again in a few minutes, or message us on WhatsApp." },
      { status: 429 },
    );
  }

  const parsed = bookingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: fieldErrors(parsed.error) }, { status: 422 });
  }
  const data = parsed.data;

  const treatment = getTreatment(data.treatment);
  if (!treatment) {
    return NextResponse.json({ ok: false, errors: { treatment: "Please choose a treatment from the list" } }, { status: 422 });
  }
  if (data.date < todayInLagos()) {
    return NextResponse.json({ ok: false, errors: { date: "Please choose a date from today onwards" } }, { status: 422 });
  }

  const email: BookingEmailData = {
    name: data.name,
    phone: data.phone,
    email: data.email,
    treatment: treatment.name,
    price: formatPrice(treatment.price),
    duration: treatment.duration,
    date: dateFmt.format(new Date(`${data.date}T00:00:00Z`)),
    time: data.time,
    visit: data.visit === "first" ? "First visit" : "Returning client",
    notes: data.notes ?? "",
  };

  // Optional backup to Google Sheets (never blocks the booking if it fails)
  const sheet = backupToSheet({ ...email, submittedAt: new Date().toISOString() });

  const resend = getResend();
  if (!resend) {
    if (process.env.NODE_ENV === "production") {
      console.error("[booking] RESEND_API_KEY is missing in production — request NOT delivered.");
      return NextResponse.json(
        { ok: false, error: "Online requests are temporarily unavailable. Please call or WhatsApp us and we'll help right away." },
        { status: 503 },
      );
    }
    console.warn("[booking] RESEND_API_KEY not set — email not sent. Booking:", email);
    await sheet;
    return NextResponse.json({ ok: true, preview: true });
  }

  try {
    const clinic = await resend.emails.send({
      from: fromAddress(),
      to: [inbox()],
      replyTo: data.email,
      subject: `New booking request: ${treatment.name} · ${email.date}`,
      html: clinicBookingEmail(email),
    });
    if (clinic.error) throw new Error(clinic.error.message);

    // Confirmation to the client — failure here shouldn't fail the booking.
    const confirmation = await resend.emails.send({
      from: fromAddress(),
      to: [data.email],
      replyTo: inbox(),
      subject: "We've received your SKNN LAB appointment request",
      html: clientBookingEmail(email),
    });
    if (confirmation.error) console.error("[booking] confirmation email failed:", confirmation.error);
  } catch (err) {
    console.error("[booking] clinic email failed:", err);
    await sheet;
    return NextResponse.json(
      { ok: false, error: "We couldn't send your request just now. Please try again, or message us on WhatsApp." },
      { status: 502 },
    );
  }

  await sheet;
  return NextResponse.json({ ok: true });
}

async function backupToSheet(row: Record<string, unknown>) {
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!url) return;
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(row),
      signal: AbortSignal.timeout(5000),
    });
  } catch (err) {
    console.error("[booking] sheet backup failed:", err);
  }
}
