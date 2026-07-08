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
              Le présent site est édité par Ets.Pellaton, immatriculée au Registre du
              Commerce et des Sociétés sous le numéro SIRET : 99478515200012, dont le siège
              social est situé 2 place Garibaldi 06300 Nice.
            </p>
            <p>Directeur de la publication : Maxime Pellaton.</p>
            <p>
              Contact : <a href="mailto:contact@ets-pellaton.com">contact@ets-pellaton.com</a>
            </p>
          </div>

          <div className={styles.block}>
            <h2>Hébergement</h2>
            <p>
              Le site est hébergé Vercel Inc. 
              Adresse : 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.
            </p>
          </div>

          <div className={styles.block}>
            <h2>Propriété intellectuelle</h2>
            <p>
              L&apos;ensemble des contenus présents sur ce site (textes, images, œuvres,
              photographies, logos) est protégé par le droit d&apos;auteur et reste la propriété
              exclusive de Ets.Pellaton / des artistes et ayants droit concernés. Toute
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
