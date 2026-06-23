import Link from "next/link";
import { verifySession } from "@/lib/dal";
import styles from "./admin.module.css";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await verifySession();

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <p className={styles.logo}>Galerie — Admin</p>
        <nav className={styles.nav}>
          <Link href="/admin">Tableau de bord</Link>
          <Link href="/admin/artworks">Œuvres</Link>
          <Link href="/admin/artists">Artistes</Link>
        </nav>
        <div className={styles.footer}>
          <p className={styles.email}>{session.email}</p>
          <form action="/api/logout" method="post">
            <button type="submit" className={styles.logout}>
              Déconnexion
            </button>
          </form>
        </div>
      </aside>
      <main className={styles.content}>{children}</main>
    </div>
  );
}
