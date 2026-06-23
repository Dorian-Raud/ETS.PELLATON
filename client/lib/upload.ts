import "server-only";
import { put, del } from "@vercel/blob";

export async function uploadImage(file: File, folder: "artworks" | "artists") {
  const blob = await put(`${folder}/${Date.now()}-${file.name}`, file, {
    access: "public",
  });
  return blob.url;
}

export async function deleteImage(url: string | null | undefined) {
  if (!url) return;
  try {
    await del(url);
  } catch {
    // l'image a peut-être déjà été supprimée ou n'est pas sur Vercel Blob
  }
}
