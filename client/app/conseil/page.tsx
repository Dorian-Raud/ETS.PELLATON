import type { Metadata } from "next";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import InfoSection from "@/components/InfoSection/InfoSection";

export const metadata: Metadata = {
  title: "Conseil",
  description:
    "Conseil en art : gestion de collections, conservation, expertises et valorisations, accompagnement stratégique sur mesure. Ets. Pellaton, de Londres à la Côte d'Azur et aux Émirats.",
};

const LOREM = `
Ets. Pellaton s'appuie sur un réseau international de professionnels du marché de l'art : experts, restaurateurs, artistes et acteurs majeurs du secteur culturel pour concevoir des projets sur mesure, en parfaite adéquation avec les objectifs de chaque client.

Notre Art Advisory est placé sous la direction de Justyna Grzes, diplômée d'un Master du Sotheby's Institute of Art, dont le regard conjugue une exigence académique et une fine connaissance du marché de l'art contemporain.

Sous son impulsion, notre expertise couvre la gestion de collections, la conservation, l'expertise et la valorisation d'œuvres, ainsi qu'un accompagnement stratégique pensé pour chaque projet, dans une constante recherche d'excellence artistique.

Présents à Londres et sur la Côte d'Azur, nous accompagnons collectionneurs et institutions avec la même exigence, la même discrétion et le même souci du détail, quelle que soit l'ampleur du projet.
`;

export default function ConseilPage() {
  return (
    <>
      <Header />
      <main>
        <InfoSection id="conseil" title="Conseil" text={LOREM} />
      </main>
      <Footer />
    </>
  );
}
