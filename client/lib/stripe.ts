import "server-only";
import Stripe from "stripe";

let cachedClient: Stripe | null = null;

function getStripeClient() {
  if (cachedClient) return cachedClient;

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error("STRIPE_SECRET_KEY n'est pas défini");
  }

  cachedClient = new Stripe(secretKey);
  return cachedClient;
}

export const stripe = new Proxy({} as Stripe, {
  get(_target, prop, receiver) {
    return Reflect.get(getStripeClient(), prop, receiver);
  },
});
