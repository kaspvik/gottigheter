import WineList from "@/app/ui/wine-list";
import { prisma } from "@/prisma/db";

export default async function WinesPage() {
  const wines = await prisma.wine.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <main>
      <WineList defaultWines={wines} />
    </main>
  );
}
