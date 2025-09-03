import { PrismaClient } from "@prisma/client";

export async function seedWines(prisma: PrismaClient) {
  await prisma.wine.deleteMany({});

  await prisma.wine.createMany({
    data: [
      {
        name: "Barolo Bricco",
        country: "Italien",
        grape: "Nebbiolo",
        type: "Rött",
        rating: 5,
        notes: "Stramt, rosor, tjära. Behöver luft.",
      },
      {
        name: "Sancerre Blanc",
        country: "Frankrike",
        grape: "Sauvignon Blanc",
        type: "Vitt",
        rating: 4,
        notes: "Krispigt, citrus och flinta.",
      },
      {
        name: "Cava Brut Nature",
        country: "Spanien",
        grape: "Xarel·lo",
        type: "Mousserande",
        rating: 3,
        notes: "Torr, frisk – perfekt apertif.",
      },
    ],
  });
}
