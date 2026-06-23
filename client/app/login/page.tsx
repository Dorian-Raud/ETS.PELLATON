import LoginForm from "./LoginForm";
import styles from "./login.module.css";

export default function LoginPage() {
  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Connexion</h1>
        <p className={styles.subtitle}>Accès réservé à l&apos;administration de la galerie.</p>
        <LoginForm />
      </div>
    </main>
  );
}
