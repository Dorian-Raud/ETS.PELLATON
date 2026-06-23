import { prisma } from "@/lib/prisma";
import styles from "./dashboard.module.css";

export default async function AdminDashboard() {
  const [artworkCount, artistCount, soldCount] = await Promise.all([
    prisma.artwork.count(),
    prisma.artist.count(),
    prisma.artwork.count({ where: { status: "SOLD" } }),
  ]);

  return (
    <div>
      <h1 className={styles.title}>Tableau de bord</h1>
      <div className={styles.grid}>
        <div className={styles.card}>
          <p className={styles.value}>{artworkCount}</p>
          <p className={styles.label}>Œuvres</p>
        </div>
        <div className={styles.card}>
          <p className={styles.value}>{artistCount}</p>
          <p className={styles.label}>Artistes</p>
        </div>
        <div className={styles.card}>
          <p className={styles.value}>{soldCount}</p>
          <p className={styles.label}>Œuvres vendues</p>
        </div>
      </div>
    </div>
  );
}
