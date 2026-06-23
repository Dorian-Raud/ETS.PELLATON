import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const artists = [
  {
    name: "Elena Vasquez",
    nationality: "Espagne",
    specialty: "Peinture contemporaine",
    bio: "Elena Vasquez explore la lumière et la matière à travers une peinture contemporaine épurée, entre abstraction et paysage intérieur.",
  },
  {
    name: "Hiroshi Tanaka",
    nationality: "Japon",
    specialty: "Sculpture & Installation",
    bio: "Hiroshi Tanaka conçoit des sculptures et installations qui interrogent le vide et la matière, entre tradition japonaise et minimalisme.",
  },
  {
    name: "Marie-Claire Dupont",
    nationality: "France",
    specialty: "Photographie",
    bio: "Marie-Claire Dupont pratique une photographie argentique sensible, attentive aux jeux de lumière et à la mémoire des lieux.",
  },
  {
    name: "Anders Bergström",
    nationality: "Suède",
    specialty: "Art conceptuel",
    bio: "Anders Bergström développe une pratique conceptuelle qui mêle matériaux industriels et formes géométriques tendues.",
  },
  {
    name: "Yuki Nakamura",
    nationality: "Japon",
    specialty: "Mixed media",
    bio: "Yuki Nakamura associe encre, papier japonais et techniques mixtes pour évoquer la fragilité de la mémoire.",
  },
  {
    name: "Rafael Mendes",
    nationality: "Brésil",
    specialty: "Peinture & Gravure",
    bio: "Rafael Mendes travaille la peinture et la gravure pour capter les atmosphères nocturnes et les silences du paysage.",
  },
];

const artworks = [
  { title: "Horizon Study III", artist: "Elena Vasquez", price: "28000", medium: "Huile sur toile", year: "2023" },
  { title: "Void & Matter", artist: "Hiroshi Tanaka", price: "64000", medium: "Bronze patiné", year: "2024" },
  { title: "Untitled (Light)", artist: "Marie-Claire Dupont", price: "12000", medium: "Tirage argentique", year: "2024" },
  { title: "Surface Tension", artist: "Anders Bergström", price: "42000", medium: "Acrylique & résine", year: "2022" },
  { title: "Memory Trace", artist: "Yuki Nakamura", price: "18500", medium: "Encre & papier japonais", year: "2023" },
  { title: "Nocturne", artist: "Rafael Mendes", price: "35000", medium: "Huile sur lin", year: "2024" },
  { title: "White Noise", artist: "Elena Vasquez", price: "31000", medium: "Huile sur toile", year: "2023" },
  { title: "Interval", artist: "Hiroshi Tanaka", price: "58000", medium: "Acier & verre", year: "2024" },
];

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@galerie.fr";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "ChangeMe123!";
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: { email: adminEmail, passwordHash },
  });

  const artistRecords: Record<string, string> = {};
  for (const artist of artists) {
    const created = await prisma.artist.upsert({
      where: { id: artist.name.toLowerCase().replace(/[^a-z]+/g, "-") },
      update: {},
      create: {
        id: artist.name.toLowerCase().replace(/[^a-z]+/g, "-"),
        name: artist.name,
        nationality: artist.nationality,
        specialty: artist.specialty,
        bio: artist.bio,
      },
    });
    artistRecords[artist.name] = created.id;
  }

  for (const artwork of artworks) {
    const id = `${artwork.artist}-${artwork.title}`.toLowerCase().replace(/[^a-z]+/g, "-");
    await prisma.artwork.upsert({
      where: { id },
      update: {},
      create: {
        id,
        title: artwork.title,
        description: `${artwork.medium}, ${artwork.year}.`,
        price: artwork.price,
        medium: artwork.medium,
        year: artwork.year,
        artistId: artistRecords[artwork.artist],
      },
    });
  }

  console.log(`Seed terminé. Admin: ${adminEmail} / ${adminPassword}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
