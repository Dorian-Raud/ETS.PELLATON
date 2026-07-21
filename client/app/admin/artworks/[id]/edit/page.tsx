import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ArtworkForm from "../../ArtworkForm";
import styles from "../../../admin-table.module.css";

export default async function EditArtworkPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [artwork, artists] = await Promise.all([
    prisma.artwork.findUnique({ where: { id } }),
    prisma.artist.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!artwork) {
    notFound();
  }

  return (
    <div>
      <h1 className={styles.pageTitle}>Modifier l&apos;œuvre</h1>
      <ArtworkForm
        artwork={{ ...artwork, price: artwork.price == null ? null : Number(artwork.price) }}
        artists={artists}
      />
    </div>
  );
}
