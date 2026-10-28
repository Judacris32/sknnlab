import { site } from "@/config/site";

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

const naira = new Intl.NumberFormat("en-NG", { maximumFractionDigits: 0 });

export function formatPrice(price: number | null) {
  return price === null ? "Price on consultation" : `₦${naira.format(price)}`;
}

export function whatsappLink(message?: string, number: string = site.contact.whatsapp) {
  const base = `https://wa.me/${number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Converts a Nigerian local number (0803...) to international digits (234803...). */
export function toInternational(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("234")) return digits;
  if (digits.startsWith("0")) return `234${digits.slice(1)}`;
  return digits;
}

export const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  site.address.mapQuery,
)}&output=embed`;

export const mapLinkUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  site.address.mapQuery,
)}`;
