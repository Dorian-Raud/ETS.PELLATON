import { prisma } from "@/lib/prisma";
import ArtworkForm from "../ArtworkForm";
import styles from "../../admin-table.module.css";

export default async function NewArtworkPage() {
  const artists = await prisma.artist.findMany({ orderBy: { name: "asc" } });

  return (
    <div>
      <h1 className={styles.pageTitle}>Nouvelle œuvre</h1>
      <ArtworkForm artists={artists} />
    </div>
  );
}
