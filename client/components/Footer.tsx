import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.logo}>Galerie</p>
      <p className={styles.copy}>
        © {new Date().getFullYear()} Galerie d&apos;art. Tous droits réservés.
      </p>
    </footer>
  );
}
