import { prisma } from "@/lib/prisma";

export async function getArtworks() {
  return prisma.artwork.findMany({
    include: { artist: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getArtists() {
  return prisma.artist.findMany({
    include: { artworks: true },
    orderBy: { name: "asc" },
  });
}

export async function getArtworkById(id: string) {
  return prisma.artwork.findUnique({ where: { id }, include: { artist: true } });
}

export async function getArtistById(id: string) {
  return prisma.artist.findUnique({ where: { id } });
}
