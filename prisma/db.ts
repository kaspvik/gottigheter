import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma?: PrismaClient };

const url =
  process.env.APP_ENV === "test"
    ? process.env.TEST_DATABASE_URL
    : process.env.DATABASE_URL;

if (!url) throw new Error("Saknar DB URL. Kolla .env.local och APP_ENV.");

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: { db: { url } },
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
