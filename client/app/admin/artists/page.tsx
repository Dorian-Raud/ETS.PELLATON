import Link from "next/link";
import { prisma } from "@/lib/prisma";
import DeleteButton from "../DeleteButton";
import { deleteArtist } from "./actions";
import styles from "../admin-table.module.css";

export default async function ArtistsPage() {
  const artists = await prisma.artist.findMany({
    include: { _count: { select: { artworks: true } } },
    orderBy: { name: "asc" },
  });

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.title}>Artistes</h1>
        <Link href="/admin/artists/new" className={styles.newLink}>
          + Nouvel artiste
        </Link>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Spécialité</th>
            <th>Œuvres</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {artists.map((artist) => (
            <tr key={artist.id}>
              <td>{artist.name}</td>
              <td>{artist.specialty ?? "—"}</td>
              <td>{artist._count.artworks}</td>
              <td className={styles.actions}>
                <Link href={`/admin/artists/${artist.id}/edit`}>Modifier</Link>
                <DeleteButton
                  id={artist.id}
                  action={deleteArtist}
                  label={artist.name}
                  confirmMessage={
                    artist._count.artworks > 0
                      ? `Supprimer « ${artist.name} » supprimera aussi ses ${artist._count.artworks} œuvre(s). Continuer ?`
                      : undefined
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {artists.length === 0 && <p className={styles.empty}>Aucun artiste.</p>}
    </div>
  );
}
