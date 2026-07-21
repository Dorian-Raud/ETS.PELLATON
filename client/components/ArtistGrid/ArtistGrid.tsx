import Image from "next/image";
import Link from "next/link";
import type { Artist } from "@/lib/generated/prisma/client";
import styles from "./ArtistGrid.module.css";

export default function ArtistGrid({ artists }: { artists: Artist[] }) {
  return (
    <section id="artistes" className={styles.section}>
      <h2 className={styles.heading}>Artistes</h2>
      {artists.length === 0 ? (
        <p className={styles.empty}>Aucun artiste publié pour le moment.</p>
      ) : (
        <div className={styles.grid}>
          {artists.map((artist) => (
            <Link key={artist.id} href={`/artistes/${artist.id}`} className={styles.card}>
              <div className={styles.imageWrapper}>
                {artist.photoUrl ? (
                  <Image
                    src={artist.photoUrl}
                    alt={artist.name}
                    fill
                    className={styles.image}
                  />
                ) : (
                  <div className={styles.placeholder} />
                )}
              </div>
              <h3 className={styles.name}>{artist.name}</h3>
              <p className={styles.meta}>
                {[artist.specialty, artist.nationality].filter(Boolean).join(" — ")}
              </p>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
