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
      },
      {
        name: "Sancerre Blanc",
        country: "Frankrike",
        grape: "Sauvignon Blanc",
        type: "Vitt",
      },
      {
        name: "Cava Brut Nature",
        country: "Spanien",
        grape: "Xarel·lo",
        type: "Mousserande",
      },
    ],
  });
}
