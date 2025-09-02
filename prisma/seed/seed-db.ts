import { PrismaClient } from "@prisma/client";
import { seedWines } from "./seed-wines";

const url =
  process.env.APP_ENV === "test"
    ? process.env.TEST_DATABASE_URL
    : process.env.DATABASE_URL;

export async function seedDb() {
  if (!url) throw new Error("Saknar DB-URL. Kolla .env.local och APP_ENV.");

  const prisma = new PrismaClient({ datasources: { db: { url } } });

  try {
    await seedWines(prisma);
  } finally {
    await prisma.$disconnect();
  }
}
