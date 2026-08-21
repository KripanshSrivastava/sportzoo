/** Builds a wa.me link with a page-specific pre-filled message, from a resolved (possibly admin-edited) WhatsApp href. */
export function buildWhatsAppLink(whatsappHref: string, brand: string, pageLabel: string) {
  const message = `Hi ${brand}, I'm looking into ${pageLabel} and would like a quote.`;
  return `${whatsappHref}?text=${encodeURIComponent(message)}`;
}
