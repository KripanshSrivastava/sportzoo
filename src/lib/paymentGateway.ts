/**
 * Gateway-agnostic payment layer for paid event registrations.
 *
 * No gateway is wired in yet — Razorpay is the natural default for an
 * India-only INR business (UPI/cards/netbanking), Stripe is the alternative
 * if international cards ever matter. Until real keys are set, every paid
 * registration is recorded with paymentStatus "pending" and the owner
 * follows up to collect payment manually, then marks it paid from
 * /admin/events/[id]/registrations.
 *
 * To wire in a real gateway later:
 * 1. Add RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET (or STRIPE_SECRET_KEY) to
 *    the environment.
 * 2. Fill in the TODO branch below to create a real order/checkout session
 *    and return its id + checkout URL.
 * 3. Add a webhook route (e.g. /api/events/webhook) that verifies the
 *    gateway's signature and updates the matching event_registrations row
 *    to paymentStatus "paid".
 */

export interface PaymentOrderResult {
  configured: boolean;
  provider?: "razorpay" | "stripe";
  orderId?: string;
  checkoutUrl?: string;
}

export function isPaymentGatewayConfigured(): boolean {
  return Boolean(
    (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) || process.env.STRIPE_SECRET_KEY
  );
}

export async function createPaymentOrder(_input: {
  amount: number;
  currency: string;
  receipt: string;
}): Promise<PaymentOrderResult> {
  if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
    // TODO: create a real Razorpay order via https://api.razorpay.com/v1/orders
    // and return { configured: true, provider: "razorpay", orderId, checkoutUrl }.
  }
  if (process.env.STRIPE_SECRET_KEY) {
    // TODO: create a real Stripe Checkout Session and return
    // { configured: true, provider: "stripe", orderId: session.id, checkoutUrl: session.url }.
  }
  return { configured: false };
}
