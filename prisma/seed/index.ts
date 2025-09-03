import { seedDb } from "./seed-db";

async function main() {
  await seedDb();
  console.log("Seed klart.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
