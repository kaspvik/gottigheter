import { db } from "../db";
import { seedDatabase } from "./seed-db";

async function main() {
  await seedDatabase();
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
