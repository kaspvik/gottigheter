import WineList from "@/app/ui/wine-list";
import { prisma } from "@/prisma/db";
import Link from "next/link";

export default async function WinesPage() {
  const wines = await prisma.wine.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <main>
      <Link href="/" className="backButton">
        ← gå tillbaka
      </Link>

      <WineList defaultWines={wines} />
    </main>
  );
}
