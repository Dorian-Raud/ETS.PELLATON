import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import styles from "../mentions-legales/legal.module.css";

export default function ConfidentialitePage() {
  return (
    <>
      <Header />
      <main>
        <section className={styles.section}>
          <h1 className={styles.heading}>Politique de confidentialité</h1>

          <div className={styles.block}>
            <h2>Données personnelles</h2>
            <p>
              Dans le cadre de son fonctionnement, le site est amené à traiter certaines données
              à caractère personnel :
            </p>
            <ul>
              <li>
                Les données transmises via le formulaire de contact (nom, e-mail, message) sont
                utilisées uniquement pour répondre à votre demande et ne sont pas conservées
                au-delà du traitement de celle-ci.
              </li>
              <li>
                Lors d&apos;une commande, l&apos;adresse e-mail du client ainsi que les
                informations de paiement sont traitées par notre prestataire de paiement Stripe,
                conformément à sa propre politique de confidentialité.
              </li>
              <li>
                Les comptes administrateurs du site sont protégés par une authentification
                sécurisée et ne sont accessibles qu&apos;à l&apos;équipe autorisée.
              </li>
            </ul>
          </div>

          <div className={styles.block}>
            <h2>Vos droits</h2>
            <p>
              Conformément au Règlement Général sur la Protection des Données (RGPD), vous
              disposez d&apos;un droit d&apos;accès, de rectification et de suppression des
              données vous concernant. Pour exercer ce droit, contactez-nous à l&apos;adresse{" "}
              <a href="mailto:contact@ets-pellaton.com">contact@ets-pellaton.com</a>.
            </p>
          </div>

          <div className={styles.block}>
            <h2>Cookies</h2>
            <p>
              Le site utilise uniquement des cookies techniques strictement nécessaires à son
              fonctionnement (maintien de session lors de la connexion à l&apos;espace
              administrateur). Aucun cookie de mesure d&apos;audience ou publicitaire
              n&apos;est utilisé.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
