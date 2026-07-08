import type { Metadata } from "next";
import Header from "@/components/Header/Header";
import GalleryGrid from "@/components/GalleryGrid/GalleryGrid";
import Footer from "@/components/Footer/Footer";
import { getArtworks } from "@/lib/data";

export const metadata: Metadata = {
  title: "Galerie",
  description:
    "Parcourez les œuvres d'art moderne et contemporain sélectionnées par Ets. Pellaton, disponibles à l'acquisition.",
};

export const dynamic = "force-dynamic";

export default async function GaleriePage() {
  const artworks = await getArtworks();

  return (
    <>
      <Header />
      <main>
        <GalleryGrid artworks={artworks} />
      </main>
      <Footer />
    </>
  );
}
