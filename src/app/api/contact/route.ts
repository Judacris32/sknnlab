import { NextResponse } from "next/server";
import { contactSchema, fieldErrors } from "@/lib/validation";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { clinicContactEmail, fromAddress, getResend, inbox } from "@/lib/email";
import { getTreatment } from "@/data/treatments";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
  if (body && typeof body === "object" && "company" in body && (body as { company?: string }).company) {
    return NextResponse.json({ ok: true });
  }
  if (!rateLimit(`contact:${clientIp(req)}`)) {
    return NextResponse.json({ ok: false, error: "Too many messages. Please try again later." }, { status: 429 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: fieldErrors(parsed.error) }, { status: 422 });
  }
  const d = parsed.data;
  const service =
    d.service === "products" ? "Shop products" : d.service === "general" ? "General question" : (getTreatment(d.service ?? "")?.name ?? "");

  const resend = getResend();
  if (!resend) {
    if (process.env.NODE_ENV === "production") {
      console.error("[contact] RESEND_API_KEY is missing in production — request NOT delivered.");
      return NextResponse.json(
        { ok: false, error: "Online requests are temporarily unavailable. Please call or WhatsApp us and we'll help right away." },
        { status: 503 },
      );
    }
    console.warn("[contact] RESEND_API_KEY not set — email not sent. Message:", d);
    return NextResponse.json({ ok: true, preview: true });
  }

  const res = await resend.emails.send({
    from: fromAddress(),
    to: [inbox()],
    replyTo: d.email,
    subject: `Website enquiry from ${d.name}${service ? ` · ${service}` : ""}`,
    html: clinicContactEmail({ name: d.name, email: d.email, phone: d.phone ?? "", service, method: d.method, message: d.message }),
  });
  if (res.error) {
    console.error("[contact] email failed:", res.error);
    return NextResponse.json({ ok: false, error: "We couldn't send your message. Please try again or call us." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
