"use client";
import React from "react";

type Wine = {
  id: string;
  name: string;
  country: string;
  grape: string;
  type: string;
  notes?: string | null;
  rating?: number | null;
};

export default function WineList({ defaultWines }: { defaultWines: Wine[] }) {
  const [wines, setWines] = React.useState<Wine[]>(defaultWines ?? []);
  const [msg, setMsg] = React.useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);

  async function removeWine(id: string) {
    setMsg(null);
    try {
      const res = await fetch(`/api/wines/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        setMsg({ type: "error", text: j.error ?? "Kunde inte ta bort" });
        return;
      }
      setWines((w) => w.filter((x) => x.id !== id));
      setMsg({ type: "success", text: "Vinet togs bort" });
    } catch {
      setMsg({ type: "error", text: "Nätverksfel" });
    }
  }

  const stars = (n?: number | null) =>
    n ? "★".repeat(n) + "☆".repeat(5 - n) : "—";

  return (
    <section className="list" aria-label="wine-list">
      {msg && (
        <p
          className={msg.type === "error" ? "error" : "success"}
          data-testid="list-feedback">
          {msg.text}
        </p>
      )}
      {wines.map((w) => (
        <div className="row" key={w.id} data-testid="wine-row">
          <div style={{ gridColumn: "1 / -1" }}>
            <h3 style={{ marginBottom: 4 }}>{w.name}</h3>
          </div>
          <div>{w.country}</div>
          <div>{w.grape}</div>
          <div>{w.type}</div>

          <div title={w.rating ? `${w.rating}/5` : "Inget betyg"}>
            {stars(w.rating)}
          </div>

          <div style={{ gridColumn: "1 / -1", opacity: 0.9 }}>
            {w.notes ? (
              <em>“{w.notes}”</em>
            ) : (
              <span style={{ color: "#777" }}>Inga anteckningar</span>
            )}
          </div>

          <div>
            <button
              className="danger"
              data-testid={`delete-${w.id}`}
              onClick={() => removeWine(w.id)}>
              Ta bort
            </button>
          </div>
        </div>
      ))}
      {wines.length === 0 && <p>Inga viner ännu.</p>}
    </section>
  );
}
