import { defineConfig } from "cypress";
import { MongoMemoryReplSet } from "mongodb-memory-server";
import { spawn } from "node:child_process";
import waitOn from "wait-on";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3100", // 👈 så cypress besöker rätt port
    async setupNodeEvents(on) {
      // 1) Starta in-memory MongoDB
      const db = await MongoMemoryReplSet.create({
        replSet: { count: 1 }, // 👈 med replica-set så Prisma fungerar.
      });
      const dbUri = db.getUri("testdb");
      process.env.DATABASE_URL = dbUri; // 👈 för db-anslutning i denna processen (punkt 5)

      // 2) Starta Next.js servern i en ny process
      const server = spawn(
        "npx",
        ["next", "dev", "-p", "3100", "--turbopack"],
        {
          env: {
            ...process.env,
            NODE_ENV: "test", // 👈 så Next.js vet att det är testmiljön
            DATABASE_URL: dbUri, // 👈 får Next.js att använda in-memory databasen
            PORT: "3100", // 👈 starta Next.js på en annan port än dev (3000)
          },
          stdio: "inherit", // 👈 så du ser output från Next.js i terminalen
        }
      );

      // 3) Vänta tills Next.js-servern är redo
      await waitOn({ resources: ["http://localhost:3100/"], timeout: 60_000 });

      // 4) Städa upp MongoDB och Next.js processerna
      const cleanup = async () => {
        server.kill();
        await db.stop();
      };
      process.on("SIGTERM", cleanup); // 👈 om cypress kraschar
      on("after:run", cleanup); // 👈 när cypress avslutas

      // 5a) Återställ databasen innan varje testfil körs
      on("before:spec", async () => {
        const { seedDatabase } = await import("./prisma/seed/seed-db");
        await seedDatabase();
      });

      // 5b) Skapa en task för att återställa databasen innan varje it-test körs
      on("task", {
        async reseed() {
          const { seedDatabase } = await import("./prisma/seed/seed-db");
          await seedDatabase();
          return null;
        },
      });
    },
  },
});
