import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ArtistForm from "../../ArtistForm";
import styles from "../../../admin-table.module.css";

export default async function EditArtistPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const artist = await prisma.artist.findUnique({ where: { id } });

  if (!artist) {
    notFound();
  }

  return (
    <div>
      <h1 className={styles.pageTitle}>Modifier l&apos;artiste</h1>
      <ArtistForm artist={artist} />
    </div>
  );
}
