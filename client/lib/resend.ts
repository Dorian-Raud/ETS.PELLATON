import "server-only";
import { Resend } from "resend";

let cachedClient: Resend | null = null;

function getResendClient() {
  if (cachedClient) return cachedClient;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY n'est pas défini");
  }

  cachedClient = new Resend(apiKey);
  return cachedClient;
}

export const resend = new Proxy({} as Resend, {
  get(_target, prop, receiver) {
    return Reflect.get(getResendClient(), prop, receiver);
  },
});
