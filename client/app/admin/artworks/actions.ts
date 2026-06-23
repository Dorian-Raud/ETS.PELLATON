"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/dal";
import { uploadImage, deleteImage } from "@/lib/upload";

const ArtworkSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Titre requis."),
  description: z.string().min(1, "Description requise."),
  price: z.coerce.number().positive("Le prix doit être positif."),
  medium: z.string().optional(),
  year: z.string().optional(),
  artistId: z.string().min(1, "Artiste requis."),
  status: z.enum(["AVAILABLE", "SOLD"]),
});

export type ArtworkFormState = { error?: string } | undefined;

export async function saveArtwork(
  _state: ArtworkFormState,
  formData: FormData
): Promise<ArtworkFormState> {
  await verifySession();

  const parsed = ArtworkSchema.safeParse({
    id: formData.get("id") || undefined,
    title: formData.get("title"),
    description: formData.get("description"),
    price: formData.get("price"),
    medium: formData.get("medium") || undefined,
    year: formData.get("year") || undefined,
    artistId: formData.get("artistId"),
    status: formData.get("status"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Formulaire invalide." };
  }

  const { id, ...data } = parsed.data;
  const imageFile = formData.get("image");

  let imageUrl: string | undefined;
  if (imageFile instanceof File && imageFile.size > 0) {
    imageUrl = await uploadImage(imageFile, "artworks");
    if (id) {
      const existing = await prisma.artwork.findUnique({ where: { id } });
      await deleteImage(existing?.imageUrl);
    }
  }

  if (id) {
    await prisma.artwork.update({
      where: { id },
      data: { ...data, ...(imageUrl ? { imageUrl } : {}) },
    });
  } else {
    await prisma.artwork.create({
      data: { ...data, imageUrl },
    });
  }

  revalidatePath("/admin/artworks");
  redirect("/admin/artworks");
}

export async function deleteArtwork(id: string) {
  await verifySession();
  const artwork = await prisma.artwork.findUnique({ where: { id } });
  await deleteImage(artwork?.imageUrl);
  await prisma.artwork.delete({ where: { id } });
  revalidatePath("/admin/artworks");
}
