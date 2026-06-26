import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json({ error: "Signature manquante." }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch {
    return NextResponse.json({ error: "Signature invalide." }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const orderId = session.metadata?.orderId;
      if (!orderId) break;

      const order = await prisma.order.findUnique({ where: { id: orderId } });
      if (!order || order.status === "PAID") break;

      const amountTotal = session.amount_total ?? 0;
      const expectedAmount = Math.round(Number(order.amount) * 100);
      if (amountTotal !== expectedAmount) break;

      await prisma.$transaction([
        prisma.order.update({
          where: { id: orderId },
          data: {
            status: "PAID",
            paymentIntentId:
              typeof session.payment_intent === "string" ? session.payment_intent : null,
            customerEmail: session.customer_details?.email ?? null,
          },
        }),
        prisma.artwork.update({
          where: { id: order.artworkId },
          data: { status: "SOLD" },
        }),
      ]);
      break;
    }

    case "checkout.session.expired": {
      const session = event.data.object as Stripe.Checkout.Session;
      const orderId = session.metadata?.orderId;
      if (!orderId) break;

      const order = await prisma.order.findUnique({ where: { id: orderId } });
      if (!order || order.status !== "PENDING") break;

      await prisma.$transaction([
        prisma.order.update({
          where: { id: orderId },
          data: { status: "EXPIRED" },
        }),
        prisma.artwork.updateMany({
          where: { id: order.artworkId, status: "RESERVED" },
          data: { status: "AVAILABLE" },
        }),
      ]);
      break;
    }

    default:
      break;
  }

  return NextResponse.json({ received: true });
}
