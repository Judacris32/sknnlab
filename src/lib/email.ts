import { Resend } from "resend";
import { site } from "@/config/site";
import { toInternational, whatsappLink } from "./utils";

const gold = "#C89B62";
const ink = "#3E2F25";
const text = "#7A5B3A";
const ivory = "#FBF7EF";

export function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

function layout(title: string, inner: string) {
  const logo = `${site.url}/images/brand/sknn-lab-logo-720.png`;
  return `<!doctype html><html><body style="margin:0;background:${ivory};font-family:Helvetica,Arial,sans-serif;color:${text}">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${ivory};padding:32px 12px">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border:1px solid #EADBC8;border-radius:16px;overflow:hidden">
        <tr><td align="center" style="padding:32px 32px 8px"><img src="${logo}" alt="SKNN LAB Aesthetic Clinic" width="190" style="display:block;border:0;height:auto"></td></tr>
        <tr><td align="center" style="padding:8px 32px 0"><div style="height:1px;width:56px;background:${gold}"></div></td></tr>
        <tr><td style="padding:24px 36px 8px"><h1 style="margin:0;font-family:Georgia,serif;font-weight:normal;font-size:26px;line-height:1.25;color:${ink};text-align:center">${title}</h1></td></tr>
        <tr><td style="padding:12px 36px 32px;font-size:15px;line-height:1.7">${inner}</td></tr>
        <tr><td style="background:#2E231C;padding:20px 36px;color:#D9C1A4;font-size:12px;line-height:1.6;text-align:center">
          ${site.legalName} · ${site.address.line1}, ${site.address.city}<br>
          ${site.contact.phones.map((p) => p.display).join(" · ")} · ${site.contact.email}
        </td></tr>
      </table>
    </td></tr>
  </table></body></html>`;
}

function rows(data: [string, string][]) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:8px 0 20px">
    ${data
      .map(
        ([k, v]) => `<tr>
          <td style="padding:10px 0;border-bottom:1px solid #F1E1CF;width:38%;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${gold};vertical-align:top">${k}</td>
          <td style="padding:10px 0;border-bottom:1px solid #F1E1CF;color:${ink};vertical-align:top">${v}</td>
        </tr>`,
      )
      .join("")}
  </table>`;
}

function button(href: string, label: string) {
  return `<a href="${href}" style="display:inline-block;background:#D4AF7C;color:#2E231C;text-decoration:none;padding:13px 24px;border-radius:8px;font-size:12px;letter-spacing:2px;text-transform:uppercase;font-weight:bold">${label}</a>`;
}

export type BookingEmailData = {
  name: string;
  phone: string;
  email: string;
  treatment: string;
  price: string;
  duration?: string;
  date: string;
  time: string;
  visit: string;
  notes: string;
};

export function clinicBookingEmail(d: BookingEmailData) {
  const e = (s: string) => escapeHtml(s);
  const wa = whatsappLink(`Hello ${d.name}, this is SKNN LAB about your ${d.treatment} booking request.`, toInternational(d.phone));
  const inner = `
    <p style="margin:0 0 8px;text-align:center">A new appointment request was submitted on the website.</p>
    ${rows([
      ["Client", e(d.name)],
      ["Phone", `<a href="tel:${e(d.phone)}" style="color:${ink}">${e(d.phone)}</a>`],
      ["Email", `<a href="mailto:${e(d.email)}" style="color:${ink}">${e(d.email)}</a>`],
      ["Treatment", e(d.treatment)],
      ["Price", e(d.price) + (d.duration ? ` · ${e(d.duration)}` : "")],
      ["Preferred date", e(d.date)],
      ["Time of day", e(d.time)],
      ["Visit", e(d.visit)],
      ["Notes", d.notes ? e(d.notes).replace(/\n/g, "<br>") : "—"],
    ])}
    <p style="margin:0 0 20px;text-align:center">Reply to this email to respond to ${e(d.name)} directly, or message them on WhatsApp.</p>
    <p style="margin:0;text-align:center">${button(wa, "Message on WhatsApp")}</p>`;
  return layout(`New booking request: ${e(d.treatment)}`, inner);
}

export function clientBookingEmail(d: BookingEmailData) {
  const e = (s: string) => escapeHtml(s);
  const inner = `
    <p style="margin:0 0 16px">Hi ${e(d.name.split(" ")[0])},</p>
    <p style="margin:0 0 16px">Thank you for choosing SKNN LAB. We've received your appointment request and a member of our team will contact you shortly to confirm your time and payment.</p>
    ${rows([
      ["Treatment", e(d.treatment)],
      ["Price", e(d.price) + (d.duration ? ` · ${e(d.duration)}` : "")],
      ["Preferred date", e(d.date)],
      ["Time of day", e(d.time)],
    ])}
    <p style="margin:0 0 16px"><strong style="color:${ink}">Please note:</strong> your appointment is confirmed once the clinic has contacted you. Payment is arranged directly with the clinic.</p>
    <p style="margin:0 0 24px">Need a quicker response? Message us on WhatsApp and mention your booking.</p>
    <p style="margin:0 0 24px;text-align:center">${button(whatsappLink(`Hello SKNN LAB, I just requested a ${d.treatment} appointment for ${d.date} (${d.time}).`), "Chat on WhatsApp")}</p>
    <p style="margin:0">With love,<br><span style="color:${ink}">The SKNN LAB team</span></p>`;
  return layout("We've received your request", inner);
}

export function clinicContactEmail(d: { name: string; email: string; phone: string; service: string; method: string; message: string }) {
  const e = (s: string) => escapeHtml(s);
  const wa = d.phone ? whatsappLink(`Hello ${d.name}, this is SKNN LAB replying to your message.`, toInternational(d.phone)) : "";
  return layout(
    "New message from the website",
    rows([
      ["Name", e(d.name)],
      ["Email", `<a href="mailto:${e(d.email)}" style="color:${ink}">${e(d.email)}</a>`],
      ["Phone", d.phone ? `<a href="tel:${e(d.phone)}" style="color:${ink}">${e(d.phone)}</a>` : "—"],
      ["Interested in", d.service ? e(d.service) : "Not specified"],
      ["Prefers reply by", e(d.method)],
      ["Message", e(d.message).replace(/\n/g, "<br>")],
    ]) +
      `<p style="margin:0 0 20px;text-align:center">Reply to this email to respond directly${wa ? ", or message them on WhatsApp" : ""}.</p>` +
      (wa ? `<p style="margin:0;text-align:center">${button(wa, "Message on WhatsApp")}</p>` : ""),
  );
}

let client: Resend | null = null;
export function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  client ??= new Resend(key);
  return client;
}

export const inbox = () => process.env.CLINIC_INBOX_EMAIL || site.contact.email;
export const fromAddress = () => process.env.EMAIL_FROM || "SKNN LAB <onboarding@resend.dev>";
