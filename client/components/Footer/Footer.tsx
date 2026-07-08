import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.logo}>Ets.Pellaton</p>
      <nav className={styles.links}>
        <Link href="/contact">Nous contacter</Link>
        <Link href="/mentions-legales">Mentions légales</Link>
        <Link href="/confidentialite">Confidentialité</Link>
      </nav>
      <p className={styles.copy}>
        © {new Date().getFullYear()} - Ets.Pellaton - Gallery Advisory - Tous droits réservés.
      </p>
    </footer>
  );
}
