# SKNN LAB Aesthetic Clinic: website

Next.js 15 (App Router), TypeScript, Tailwind CSS, Framer Motion, Lenis smooth scrolling and Resend email.

Type: Cormorant Garamond (headings) and Jost (body), self-hosted via Fontsource.

Light mode by default with a dark-mode toggle, a homepage hero slideshow, photo heroes on every inner page, online booking requests by email, a WhatsApp chat widget, and a WhatsApp-order shop.

## Run locally

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
npm run build && npm start   # production check
```

Without `RESEND_API_KEY`, the booking and contact forms still work in development. Submissions are printed to the terminal instead of emailed. In production, a missing key makes the forms show a "please call or WhatsApp us" message, so no request is silently lost.

## Where to edit content

| What | File |
|---|---|
| Phone numbers, **WhatsApp number**, email, address, opening hours, Instagram | `src/config/site.ts` |
| Treatments, prices, durations, descriptions (also feeds the booking dropdown and emails) | `src/data/treatments.ts` |
| Shop products (currently **placeholders**) | `src/data/products.ts` |
| Blog posts (empty list shows the "coming soon" page) | `src/data/posts.ts` |
| Colours (light & dark) | `src/app/globals.css` → `:root` / `.dark` |
| How see-through the hero photos are | `--hero-wash` in `src/app/globals.css` (lower = lighter, more photo) |
| Skin concerns on the homepage | `src/data/concerns.ts` |
| FAQs | `src/data/faqs.ts` (general) and `faqs` inside each category in `treatments.ts` |
| Marquee phrases | `src/components/home/TreatmentMarquee.tsx`, `src/components/layout/PreFooter.tsx` |

**Images** live in `public/images/`. To replace a product image, add the photo to `public/images/products/` and update that product's `image` path. Once all placeholder SVGs are gone, you can remove `dangerouslyAllowSVG` from `next.config.ts`.

## Motion

Smooth scrolling, word-by-word headline reveals, parallax photos, scroll-lit statements, marquees and a reading-progress bar. Everything switches off automatically for visitors whose device is set to reduce motion.

## Booking emails (Resend)

1. Create a free account at resend.com and an API key → `RESEND_API_KEY`.
2. **Verify the clinic's domain** in Resend (add the DNS records it gives you), then set `EMAIL_FROM`, e.g. `SKNN LAB <bookings@sknnlab.com>`.
   - Until a domain is verified, Resend only delivers to your own Resend account email, so client confirmation emails won't arrive. Verify the domain before launch.
3. `CLINIC_INBOX_EMAIL` is where booking requests land (defaults to Sknnlab@gmail.com).

Each booking sends:
- **to the clinic:** all details, reply-to set to the client, and a one-tap "Message on WhatsApp" button;
- **to the client:** a branded confirmation saying the clinic will confirm the time and payment.

Spam protection: hidden honeypot field, server-side validation (zod) and per-IP rate limiting.

## Google Sheet backup (optional)

Keeps a running list of every booking even if an email lands in spam.

1. Create a Google Sheet with headers in row 1:
   `submittedAt | name | phone | email | treatment | price | duration | date | time | visit | notes`
2. Extensions → Apps Script, paste:

```js
function doPost(e) {
  const d = JSON.parse(e.postData.contents);
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  sheet.appendRow(headers.map((h) => d[h] ?? ""));
  return ContentService.createTextOutput("ok");
}
```

3. Deploy → New deployment → Web app → Execute as *Me*, access *Anyone*. Copy the URL into `GOOGLE_SHEETS_WEBHOOK_URL`.

## Deploy (Vercel)

Push to GitHub, import the repo in Vercel, add the environment variables from `.env.example` (Production + Preview), and deploy. Set `NEXT_PUBLIC_SITE_URL` to the final domain so the sitemap, SEO tags and email logo use it.

## Before launch: checklist

- [ ] Confirm the WhatsApp number in `src/config/site.ts` (currently the appointments line 0906 919 2211)
- [ ] Add opening hours in `src/config/site.ts` (currently shows "By appointment")
- [ ] Replace placeholder shop products, prices and images
- [ ] Bridget's bio on the About page (marked `TODO` in `src/app/about/page.tsx`)
- [ ] Prices for Skin Analysis, Exosome, IV Infusion and Waxing (show "Price on consultation" until set)
- [ ] Back Facial duration: brochure says "1 hr 39 mins" (likely 1 hr 30); see `TODO` in `treatments.ts`
- [ ] Clinic to review the IV Infusion and Exosome wording
- [ ] Confirm client consent for the before/after photos
- [ ] Credit or confirm usage rights with the photographer of Bridget's portrait
- [ ] Verify the domain in Resend and set `EMAIL_FROM`
