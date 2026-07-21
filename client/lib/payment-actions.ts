"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

const CheckoutSchema = z.object({
  artworkId: z.string().min(1),
});

function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}

export async function createCheckout(formData: FormData) {
  const parsed = CheckoutSchema.safeParse({
    artworkId: formData.get("artworkId"),
  });

  if (!parsed.success) {
    redirect("/galerie");
  }

  const { artworkId } = parsed.data;

  const order = await prisma.$transaction(async (tx) => {
    const artwork = await tx.artwork.findUnique({ where: { id: artworkId } });

    if (!artwork || artwork.status !== "AVAILABLE" || artwork.price == null) {
      return null;
    }

    await tx.artwork.update({
      where: { id: artworkId },
      data: { status: "RESERVED" },
    });

    return tx.order.create({
      data: {
        artworkId,
        amount: artwork.price,
        status: "PENDING",
      },
      include: { artwork: true },
    });
  });

  if (!order) {
    redirect(`/galerie/${artworkId}?error=unavailable`);
  }

  // redirect() throws internally to short-circuit rendering — it must be called
  // outside this try/catch, otherwise it would be caught and trigger a rollback.
  let checkoutUrl: string;
  try {
    const siteUrl = getSiteUrl();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "eur",
            unit_amount: Math.round(Number(order.amount) * 100),
            product_data: {
              name: order.artwork.title,
            },
          },
        },
      ],
      metadata: { orderId: order.id, artworkId },
      expires_at: Math.floor(Date.now() / 1000) + 30 * 60,
      success_url: `${siteUrl}/galerie/${artworkId}/merci?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/galerie/${artworkId}`,
    });

    if (!session.url) {
      throw new Error("Stripe n'a pas renvoyé d'URL de paiement.");
    }

    await prisma.order.update({
      where: { id: order.id },
      data: { stripeSessionId: session.id },
    });

    checkoutUrl = session.url;
  } catch (err) {
    await prisma.$transaction([
      prisma.artwork.update({
        where: { id: artworkId },
        data: { status: "AVAILABLE" },
      }),
      prisma.order.update({
        where: { id: order.id },
        data: { status: "FAILED" },
      }),
    ]);
    throw err;
  }

  redirect(checkoutUrl);
}
