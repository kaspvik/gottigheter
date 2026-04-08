import { PrismaClient } from "@prisma/client";
import { seedWines } from "./seed-wines";

export async function seedDb(): Promise<void> {
  const prisma = new PrismaClient();
  try {
    await seedWines(prisma);
  } finally {
    await prisma.$disconnect();
  }
}

export async function seedDatabase() {
  return seedDb();
}
