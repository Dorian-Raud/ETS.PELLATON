import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { SITE_URL } from "@/lib/constants";

// Régénéré au maximum une fois par heure (les œuvres changent rarement).
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/galerie`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/artistes`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/conseil`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/a-propos`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${SITE_URL}/mentions-legales`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/confidentialite`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  let artworkRoutes: MetadataRoute.Sitemap = [];
  try {
    const artworks = await prisma.artwork.findMany({
      select: { id: true, updatedAt: true, imageUrl: true },
      orderBy: { updatedAt: "desc" },
    });
    artworkRoutes = artworks.map((a) => ({
      url: `${SITE_URL}/galerie/${a.id}`,
      lastModified: a.updatedAt,
      changeFrequency: "weekly",
      priority: 0.8,
      images: a.imageUrl ? [a.imageUrl] : undefined,
    }));
  } catch {
    // Si la base est indisponible (ex. au build), on renvoie au moins les routes statiques.
  }

  return [...staticRoutes, ...artworkRoutes];
}
