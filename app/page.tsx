import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Välkommen till Wine Journal</h1>
      <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
        <Link className="primary" href="/wines/new" data-testid="go-new">
          Lägg till vin
        </Link>
        <Link href="/wines" data-testid="go-list">
          Vinlistan
        </Link>
      </div>
    </main>
  );
}
