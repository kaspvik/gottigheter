import WineList from "@/app/ui/wine-list";
import { prisma } from "@/prisma/db";

export default async function WinesPage() {
  const wines = await prisma.wine.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <main>
      <h1>Alla viner</h1>
      <WineList defaultWines={wines} />
    </main>
  );
}
