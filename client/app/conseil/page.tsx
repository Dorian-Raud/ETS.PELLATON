import type { Metadata } from "next";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import InfoSection from "@/components/InfoSection/InfoSection";

export const metadata: Metadata = {
  title: "Conseil",
  description:
    "Conseil en art : gestion de collections, conservation, expertises et valorisations, accompagnement stratégique sur mesure. Ets. Pellaton, de Londres à la Côte d'Azur et aux Émirats.",
};

const LOREM =
  "Nous nous appuyons sur un réseau international de professionnels du marché de l\’art, réunissant experts du marché, restaurateurs, artistes et acteurs majeurs du secteur culturel, afin de concevoir des projets sur mesure en parfaite adéquation avec les objectifs de nos clients. Notre expertise couvre la gestion de collections, la conservation, les expertises et valorisations, ainsi qu\’un accompagnement stratégique personnalisé. Chaque projet est pensé pour conjuguer excellence artistique et connaissance approfondie du marché. Présents à Londres et sur la Côte d\’Azur, nous poursuivons aujourd\’hui notre développement au sein des marchés de l\’art en pleine expansion des Émirats arabes unis, créant des passerelles entre le patrimoine culturel et l\’innovation contemporaine.";

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
