import Link from "next/link";
import { prisma } from "@/lib/prisma";
import DeleteButton from "../DeleteButton";
import { deleteArtwork } from "./actions";
import styles from "../admin-table.module.css";

export default async function ArtworksPage() {
  const artworks = await prisma.artwork.findMany({
    include: { artist: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.title}>Œuvres</h1>
        <Link href="/admin/artworks/new" className={styles.newLink}>
          + Nouvelle œuvre
        </Link>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Titre</th>
            <th>Artiste</th>
            <th>Prix</th>
            <th>Statut</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {artworks.map((artwork) => (
            <tr key={artwork.id}>
              <td>{artwork.title}</td>
              <td>{artwork.artist.name}</td>
              <td>{Number(artwork.price).toLocaleString("fr-FR")} €</td>
              <td>{artwork.status === "SOLD" ? "Vendu" : "Disponible"}</td>
              <td className={styles.actions}>
                <Link href={`/admin/artworks/${artwork.id}/edit`}>Modifier</Link>
                <DeleteButton id={artwork.id} action={deleteArtwork} label={artwork.title} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {artworks.length === 0 && <p className={styles.empty}>Aucune œuvre.</p>}
    </div>
  );
}
