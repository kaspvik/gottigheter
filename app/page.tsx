import { prisma } from "@/prisma/db";
import WineJournal from "./ui/wine-journal";

export default async function Page() {
  const wines = await prisma.wine.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <main>
      <h1>Wine Journal</h1>
      <WineJournal defaultWines={wines} />
    </main>
  );
}
