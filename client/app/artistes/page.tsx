import Header from "@/components/Header";
import ArtistGrid from "@/components/ArtistGrid";
import Footer from "@/components/Footer";
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
