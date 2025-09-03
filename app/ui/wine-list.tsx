"use client";
import React from "react";
import styles from "./wine-list.module.css";

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
    <section className={styles.list} aria-label="wine-list">
      <h2 className={styles.heading}>Vinlistan</h2>

      {msg && (
        <p
          className={msg.type === "error" ? "error" : "success"}
          data-testid="list-feedback">
          {msg.text}
        </p>
      )}

      <div className={styles.rows}>
        {wines.map((w) => (
          <div className={styles.card} key={w.id} data-testid="wine-row">
            <h3 className={styles.title}>{w.name}</h3>
            <div className={styles.meta}>
              <span>{w.country}</span> • <span>{w.grape}</span> •{" "}
              <span>{w.type}</span>
            </div>
            <div
              className={styles.rating}
              title={w.rating ? `${w.rating}/5` : "Inget betyg"}>
              {stars(w.rating)}
            </div>
            <div className={styles.notes}>
              {w.notes ? (
                <em>“{w.notes}”</em>
              ) : (
                <span className={styles.empty}>Inga anteckningar</span>
              )}
            </div>
            <button
              className={styles.danger}
              data-testid={`delete-${w.id}`}
              onClick={() => removeWine(w.id)}>
              Ta bort
            </button>
          </div>
        ))}
        {wines.length === 0 && <p>Inga viner ännu.</p>}
      </div>
    </section>
  );
}
