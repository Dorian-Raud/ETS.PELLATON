import type { Metadata } from "next";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import AboutSection from "@/components/AboutSection/AboutSection";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Ets. Pellaton, cabinet de conseil indépendant en art moderne et contemporain fondé par Maxime Pellaton, entre découverte d'artistes, accompagnement de collectionneurs et projets culturels.",
};

const LOREM = `
Fondée par Maxime Pellaton, Ets. Pellaton est une galerie d'art en ligne consacrée à la curation et à l'accompagnement d'artistes émergents de la scène contemporaine.

Notre démarche de curation privilégie des univers singuliers, portés par une cohérence de fond et un potentiel de développement qui nous semble mériter d'être révélé. Chaque artiste accompagné, chaque œuvre présentée, s'inscrit dans une même sensibilité celle d'une création contemporaine que nous aimons penser durable, au-delà des tendances du moment.

En parallèle de son activité de galerie, Ets. Pellaton propose un service d'Art Advisory indépendant. Nous accompagnons collectionneurs, particuliers et entreprises dans leurs acquisitions, ainsi que dans la constitution et la valorisation de leur patrimoine artistique.

Cet accompagnement s'appuie sur un réseau international d'artistes, de galeries, d'institutions et de maisons de vente, et se conduit toujours avec discrétion et sur mesure.

Basée sur la Côte d'Azur, Ets. Pellaton intervient en France comme à l'international, avec le souci constant de construire des relations durables avec les artistes que nous accompagnons, les collectionneurs qui nous font confiance, et l'ensemble de nos partenaires.
`;

export default function AProposPage() {
  return (
    <>
      <Header />
      <main>
        <AboutSection id="apropos" title="À propos" text={LOREM} />
      </main>
      <Footer />
    </>
  );
}
