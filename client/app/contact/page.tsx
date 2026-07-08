import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ContactForm from "./ContactForm";
import styles from "./contact.module.css";

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <section className={styles.section}>
          <h1 className={styles.heading}>Nous contacter</h1>

          <div className={styles.content}>
            <div className={styles.infos}>
              <div className={styles.infoBlock}>
              </div>
              <div className={styles.infoBlock}>
                <span className={styles.infoLabel}>Téléphone</span>
                <p>
                  <a href="tel:+330601013771">+33601013771</a>
                </p>
              </div>
              <div className={styles.infoBlock}>
                <span className={styles.infoLabel}>E-mail</span>
                <p>
                  <a href="mailto:contact@ets-pellaton.com">contact@etspellaton.com</a>
                </p>
              </div>
            </div>

            <ContactForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
