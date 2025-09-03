"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function WineForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [grape, setGrape] = useState("");
  const [type, setType] = useState("");
  const [notes, setNotes] = useState("");
  const [rating, setRating] = useState<string>("");
  const [msg, setMsg] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
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
        body: JSON.stringify({
          name,
          country,
          grape,
          type,
          notes: notes.trim(),
          rating: rating ? Number(rating) : "",
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setMsg({ type: "error", text: data.error ?? "Kunde inte spara" });
      } else {
        setMsg({ type: "success", text: "Vinet sparades" });
        setName("");
        setCountry("");
        setGrape("");
        setType("");
        setNotes("");
        setRating("");
        router.push("/wines");
        router.refresh();
      }
    } catch {
      setMsg({ type: "error", text: "Nätverksfel" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="form" data-testid="wine-form">
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
        <label htmlFor="notes">Recension / Tankar</label>
        <textarea
          id="notes"
          data-testid="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Vad tyckte du?"
          rows={4}
        />
      </div>

      <div>
        <label htmlFor="rating">Betyg (1–5)</label>
        <select
          id="rating"
          data-testid="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}>
          <option value="">Inget betyg</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
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
  );
}
