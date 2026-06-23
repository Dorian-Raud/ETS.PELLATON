"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/dal";
import { uploadImage, deleteImage } from "@/lib/upload";

const ArtistSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Nom requis."),
  bio: z.string().min(1, "Bio requise."),
  nationality: z.string().optional(),
  specialty: z.string().optional(),
});

export type ArtistFormState = { error?: string } | undefined;

export async function saveArtist(
  _state: ArtistFormState,
  formData: FormData
): Promise<ArtistFormState> {
  await verifySession();

  const parsed = ArtistSchema.safeParse({
    id: formData.get("id") || undefined,
    name: formData.get("name"),
    bio: formData.get("bio"),
    nationality: formData.get("nationality") || undefined,
    specialty: formData.get("specialty") || undefined,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Formulaire invalide." };
  }

  const { id, ...data } = parsed.data;
  const photoFile = formData.get("photo");

  let photoUrl: string | undefined;
  if (photoFile instanceof File && photoFile.size > 0) {
    photoUrl = await uploadImage(photoFile, "artists");
    if (id) {
      const existing = await prisma.artist.findUnique({ where: { id } });
      await deleteImage(existing?.photoUrl);
    }
  }

  if (id) {
    await prisma.artist.update({
      where: { id },
      data: { ...data, ...(photoUrl ? { photoUrl } : {}) },
    });
  } else {
    await prisma.artist.create({
      data: { ...data, photoUrl },
    });
  }

  revalidatePath("/admin/artists");
  redirect("/admin/artists");
}

export async function deleteArtist(id: string) {
  await verifySession();
  const artist = await prisma.artist.findUnique({ where: { id } });
  await deleteImage(artist?.photoUrl);
  await prisma.artist.delete({ where: { id } });
  revalidatePath("/admin/artists");
}
