import { PrismaClient } from "@prisma/client";
import { hash } from "@node-rs/argon2";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // 1. User admin
  const email = process.env.ADMIN_EMAIL ?? "admin@galerie.fr";
  const password = process.env.ADMIN_PASSWORD ?? "ChangeMe123!";
  const passwordHash = await hash(password);

  const user = await prisma.user.upsert({
    where: { email },
    update: { passwordHash },
    create: { email, passwordHash },
  });

  console.log("👤 User created:", user.email);

  // 2. Artists
  const artist1 = await prisma.artist.create({
    data: {
      name: "Claude Monet",
      bio: "Impressionist painter known for his landscapes and light studies.",
      nationality: "French",
      specialty: "Impressionism",
      photoUrl: "https://example.com/monet.jpg",
    },
  });

  const artist2 = await prisma.artist.create({
    data: {
      name: "Pablo Picasso",
      bio: "Spanish painter, sculptor, co-founder of Cubism.",
      nationality: "Spanish",
      specialty: "Cubism",
      photoUrl: "https://example.com/picasso.jpg",
    },
  });

  console.log("🎨 Artists created");

  // 3. Artworks
  await prisma.artwork.createMany({
    data: [
      {
        title: "Water Lilies",
        description: "Series of approximately 250 oil paintings.",
        price: 12000.0,
        medium: "Oil on canvas",
        year: "1916",
        status: "AVAILABLE",
        artistId: artist1.id,
        imageUrl: "https://example.com/water-lilies.jpg",
      },
      {
        title: "Woman with a Guitar",
        description: "Cubist artwork representing abstraction of form.",
        price: 15000.0,
        medium: "Oil on canvas",
        year: "1913",
        status: "AVAILABLE",
        artistId: artist2.id,
        imageUrl: "https://example.com/guitar.jpg",
      },
    ],
  });

  console.log("🖼️ Artworks created");

  console.log("✅ Seeding finished !");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });