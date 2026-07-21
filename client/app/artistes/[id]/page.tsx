import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import GalleryGrid from "@/components/GalleryGrid/GalleryGrid";
import { getArtistById } from "@/lib/data";
import styles from "./artist.module.css";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const artist = await getArtistById(id);

  if (!artist) {
    return { title: "Artiste introuvable" };
  }

  const description = artist.bio.slice(0, 160);
  const canonical = `/artistes/${artist.id}`;

  return {
    title: artist.name,
    description,
    alternates: { canonical },
    openGraph: {
      type: "profile",
      title: artist.name,
      description,
      url: canonical,
      images: artist.photoUrl
        ? [{ url: artist.photoUrl, alt: artist.name }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: artist.name,
      description,
      images: artist.photoUrl ? [artist.photoUrl] : undefined,
    },
  };
}

export default async function ArtistPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const artist = await getArtistById(id);

  if (!artist) {
    notFound();
  }

  const meta = [artist.specialty, artist.nationality].filter(Boolean).join(" — ");

  return (
    <>
      <Header />
      <main>
        <section className={styles.hero}>
          <Link href="/artistes" className={styles.back}>
            ← Retour aux artistes
          </Link>

          <div className={styles.header}>
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

            <div className={styles.info}>
              <h1 className={styles.name}>{artist.name}</h1>
              {meta && <p className={styles.meta}>{meta}</p>}
              <p className={styles.bio}>{artist.bio}</p>
            </div>
          </div>
        </section>

        {artist.artworks.length > 0 && (
          <GalleryGrid artworks={artist.artworks} heading="Œuvres" />
        )}
      </main>
      <Footer />
    </>
  );
}
