import Header from "@/components/Header";
import GalleryGrid from "@/components/GalleryGrid";
import Footer from "@/components/Footer";
import { getArtworks } from "@/lib/data";

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
