import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { getArtworkById } from "@/lib/data";
import { createCheckout } from "@/lib/payment-actions";
import styles from "./artwork.module.css";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const artwork = await getArtworkById(id);

  if (!artwork) {
    return { title: "Œuvre introuvable" };
  }

  const title = `${artwork.title} — ${artwork.artist.name}`;
  const description = artwork.description.slice(0, 160);
  const canonical = `/galerie/${artwork.id}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      title,
      description,
      url: canonical,
      images: artwork.imageUrl
        ? [{ url: artwork.imageUrl, alt: artwork.title }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: artwork.imageUrl ? [artwork.imageUrl] : undefined,
    },
  };
}

const priceFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

const statusLabel: Record<string, string> = {
  RESERVED: "En cours d'achat",
  SOLD: "Vendu",
};

export default async function ArtworkPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const artwork = await getArtworkById(id);

  if (!artwork) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className={styles.section}>
        <div className={styles.imageWrapper}>
          {artwork.imageUrl ? (
            <Image
              src={artwork.imageUrl}
              alt={artwork.title}
              fill
              className={styles.image}
            />
          ) : (
            <div className={styles.placeholder} />
          )}
        </div>

        <div className={styles.details}>
          <h1 className={styles.title}>{artwork.title}</h1>
          <p className={styles.artist}>{artwork.artist.name}</p>
          <p className={styles.meta}>
            {[artwork.medium, artwork.year].filter(Boolean).join(", ")}
          </p>
          <p className={styles.description}>{artwork.description}</p>
          <p className={styles.price}>
            {artwork.price == null
              ? "Prix sur demande"
              : priceFormatter.format(Number(artwork.price))}
          </p>

          {artwork.price == null ? (
            <p className={styles.unavailable}>Contactez-nous pour cette œuvre.</p>
          ) : artwork.status === "AVAILABLE" ? (
            <form action={createCheckout}>
              <input type="hidden" name="artworkId" value={artwork.id} />
              <button type="submit" className={styles.buyButton}>
                Acheter
              </button>
            </form>
          ) : (
            <p className={styles.unavailable}>
              {statusLabel[artwork.status] ?? artwork.status}
            </p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
