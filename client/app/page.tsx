import Header from "@/components/Header";
import Hero from "@/components/Hero";
import GalleryGrid from "@/components/GalleryGrid";
import ArtistGrid from "@/components/ArtistGrid";
import InfoSection from "@/components/InfoSection";
import Footer from "@/components/Footer";
import { getArtworks, getArtists } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [artworks, artists] = await Promise.all([getArtworks(), getArtists()]);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <GalleryGrid artworks={artworks} />
        <ArtistGrid artists={artists} />
        <InfoSection
          id="conseil"
          title="Conseil"
          text="Notre équipe accompagne collectionneurs et institutions dans la constitution et le suivi de leur collection, de l'acquisition à la conservation."
        />
        <InfoSection
          id="apropos"
          title="À propos"
          text="Fondée par passion pour l'art contemporain, notre galerie présente des artistes émergents et confirmés à travers des expositions exigeantes."
        />
      </main>
      <Footer />
    </>
  );
}
