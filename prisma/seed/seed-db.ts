import { PrismaClient } from "@prisma/client";
import { seedWines } from "./seed-wines";

const url =
  process.env.APP_ENV === "test"
    ? process.env.TEST_DATABASE_URL
    : process.env.DATABASE_URL;

export async function seedDb(): Promise<void> {
  if (!url)
    throw new Error(
      "Saknar DB-URL. Kolla .env.local, TEST_DATABASE_URL och APP_ENV."
    );
  const prisma = new PrismaClient({ datasources: { db: { url } } });
  try {
    await prisma.wine.deleteMany({});
    await seedWines(prisma);
  } finally {
    await prisma.$disconnect();
  }
}

export async function seedDatabase(_opts: { drop?: boolean } = {}) {
  return seedDb();
}
