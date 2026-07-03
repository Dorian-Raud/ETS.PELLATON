import Header from "@/components/Header/Header";
import ArtistGrid from "@/components/ArtistGrid/ArtistGrid";
import Footer from "@/components/Footer/Footer";
import { getArtists } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function ArtistesPage() {
  const artists = await getArtists();

  return (
    <>
      <Header />
      <main>
        <ArtistGrid artists={artists} />
      </main>
      <Footer />
    </>
  );
}
