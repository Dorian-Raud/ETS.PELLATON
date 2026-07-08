import type { Metadata } from "next";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import AboutSection from "@/components/AboutSection/AboutSection";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Ets. Pellaton, cabinet de conseil indépendant en art moderne et contemporain fondé par Maxime Pellaton, entre découverte d'artistes, accompagnement de collectionneurs et projets culturels.",
};

const LOREM =
  "Fondé par Maxime Pellaton, Ets. Pellaton est un cabinet de conseil indépendant spécialisé dans l’art moderne et contemporain. Issu d’un parcours mêlant art, savoir-faire et accompagnement de projets culturels, Maxime Pellaton développe une pratique centrée sur la découverte, la promotion et l’accompagnement des artistes émergents, en créant des liens durables entre créateurs, collectionneurs et institutions. À travers un réseau de collectionneurs, d’artistes, de galeries, d’institutions et de professionnels du marché de l’art, Ets. Pellaton accompagne ses clients dans leurs acquisitions, la gestion de collections, la valorisation d’œuvres et le développement de projets culturels sur mesure. En parallèle de son activité de conseil, Maxime Pellaton documente le monde de l’art par la photographie, collaborant avec des artistes, des galeries et des institutions afin de produire des images qui témoignent avec justesse des œuvres, des expositions et des lieux qui les accueillent. Basé sur la Côte d’Azur et intervenant en France comme à l’international, Ets. Pellaton défend une approche indépendante, fondée sur la confiance, la discrétion et des relations durables avec ses clients et partenaires.";

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
