"use client";

import { useState } from "react";

type Wine = {
  id: string;
  name: string;
  country: string;
  grape: string;
  type: string;
};

interface Props {
  defaultWines: Wine[];
}

export default function WineJournal({ defaultWines }: Props) {
  const [wines, setWines] = useState<Wine[]>(defaultWines ?? []);
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [grape, setGrape] = useState("");
  const [type, setType] = useState("");
  const [msg, setMsg] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  async function addWine(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);

    if (!name.trim() || !country.trim() || !grape.trim() || !type.trim()) {
      setMsg({ type: "error", text: "Fyll i alla fält." });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/wines", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, country, grape, type }),
      });
      const data = await res.json();

      if (!res.ok) {
        setMsg({ type: "error", text: data.error ?? "Kunde inte spara" });
      } else {
        setMsg({ type: "success", text: "Vinet sparades" });
        setWines((w) => [data.wine as Wine, ...w]);
        setName("");
        setCountry("");
        setGrape("");
        setType("");
      }
    } catch {
      setMsg({ type: "error", text: "Nätverksfel" });
    } finally {
      setLoading(false);
    }
  }

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
    } catch {
      setMsg({ type: "error", text: "Nätverksfel" });
    }
  }

  return (
    <section>
      <form onSubmit={addWine} className="form" data-testid="wine-form">
        <div className="full">
          <label htmlFor="name">Namn</label>
          <input
            id="name"
            data-testid="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="t.ex. Barolo Bricco"
          />
        </div>
        <div>
          <label htmlFor="country">Land</label>
          <input
            id="country"
            data-testid="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Italien"
          />
        </div>
        <div>
          <label htmlFor="grape">Druva</label>
          <input
            id="grape"
            data-testid="grape"
            value={grape}
            onChange={(e) => setGrape(e.target.value)}
            placeholder="Nebbiolo"
          />
        </div>
        <div className="full">
          <label htmlFor="type">Sort</label>
          <select
            id="type"
            data-testid="type"
            value={type}
            onChange={(e) => setType(e.target.value)}>
            <option value="">Välj sort</option>
            <option>Rött</option>
            <option>Vitt</option>
            <option>Rosé</option>
            <option>Mousserande</option>
            <option>Annat</option>
          </select>
        </div>
        <div className="full">
          <button
            className="primary"
            type="submit"
            data-testid="submit"
            disabled={loading}>
            {loading ? "Sparar..." : "Lägg till vin"}
          </button>
        </div>

        {msg && (
          <p
            className={msg.type === "error" ? "error" : "success"}
            data-testid="feedback"
            aria-live="polite">
            {msg.text}
          </p>
        )}
      </form>

      <section className="list" aria-label="wine-list">
        {wines.map((w) => (
          <div className="row" key={w.id} data-testid="wine-row">
            <h3>{w.name}</h3>
            <div>{w.country}</div>
            <div>{w.grape}</div>
            <div>{w.type}</div>
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
    </section>
  );
}
