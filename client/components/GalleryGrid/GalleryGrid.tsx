import Image from "next/image";
import Link from "next/link";
import type { Artist, Artwork } from "@/lib/generated/prisma/client";
import styles from "./GalleryGrid.module.css";

type ArtworkWithArtist = Artwork & { artist: Artist };

const priceFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

export default function GalleryGrid({
  artworks,
  heading = "Galerie",
}: {
  artworks: ArtworkWithArtist[];
  heading?: string;
}) {
  return (
    <section id="galerie" className={styles.section}>
      <h2 className={styles.heading}>{heading}</h2>
      {artworks.length === 0 ? (
        <p className={styles.empty}>Aucune œuvre publiée pour le moment.</p>
      ) : (
        <div className={styles.grid}>
          {artworks.map((artwork) => (
            <Link
              key={artwork.id}
              href={`/galerie/${artwork.id}`}
              className={styles.card}
            >
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
                {artwork.status !== "AVAILABLE" && (
                  <span className={styles.badge}>
                    {artwork.status === "SOLD" ? "Vendu" : "En cours d'achat"}
                  </span>
                )}
              </div>
              <h3 className={styles.title}>{artwork.title}</h3>
              <p className={styles.artist}>{artwork.artist.name}</p>
              <p className={styles.meta}>
                {[artwork.medium, artwork.year].filter(Boolean).join(", ")}
              </p>
              <p className={styles.price}>
                {artwork.price == null
                  ? "Prix sur demande"
                  : priceFormatter.format(Number(artwork.price))}
              </p>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
