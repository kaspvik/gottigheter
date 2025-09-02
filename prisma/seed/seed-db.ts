// prisma/seed/index.ts
import { db } from "../db";
import { seedTodos } from "./seed-todos";

export async function seedDatabase(opts: { drop?: boolean } = {}) {
  if (opts.drop) {
    await db.$runCommandRaw({ dropDatabase: 1 });
  }
  await seedTodos();
}
