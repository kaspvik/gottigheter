import WineForm from "@/app/ui/wine-form";
import Link from "next/link";

export default function NewWinePage() {
  return (
    <main>
      <Link href="/" className="backButton">
        ← gå tillbaka
      </Link>
      <WineForm />
    </main>
  );
}
