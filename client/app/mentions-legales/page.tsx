import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import styles from "./legal.module.css";

export default function MentionsLegalesPage() {
  return (
    <>
      <Header />
      <main>
        <section className={styles.section}>
          <h1 className={styles.heading}>Mentions légales</h1>

          <div className={styles.block}>
            <h2>Éditeur du site</h2>
            <p>
              Le présent site est édité par [Raison sociale à compléter], [forme juridique à
              compléter] au capital de [montant à compléter], immatriculée au Registre du
              Commerce et des Sociétés sous le numéro SIRET [SIRET à compléter], dont le siège
              social est situé [adresse à compléter].
            </p>
            <p>Directeur de la publication : [nom à compléter].</p>
            <p>
              Contact : <a href="mailto:contact@ets-pellaton.com">contact@ets-pellaton.com</a>
            </p>
          </div>

          <div className={styles.block}>
            <h2>Hébergement</h2>
            <p>
              Le site est hébergé par [nom de l&apos;hébergeur à compléter], [adresse de
              l&apos;hébergeur à compléter].
            </p>
          </div>

          <div className={styles.block}>
            <h2>Propriété intellectuelle</h2>
            <p>
              L&apos;ensemble des contenus présents sur ce site (textes, images, œuvres,
              photographies, logos) est protégé par le droit d&apos;auteur et reste la propriété
              exclusive de [Ets.Pellaton / des artistes et ayants droit concernés]. Toute
              reproduction, représentation ou diffusion, totale ou partielle, sans autorisation
              préalable est interdite.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
