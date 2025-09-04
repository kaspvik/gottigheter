"use client";

import { useCallback } from "react";
import styles from "./star-rating.module.css";

function Star({ filled, size = 20 }: { filled: boolean; size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      width={size}
      height={size}
      style={{ display: "block" }}>
      <path
        d="M12 17.27L18.18 21l-1.64-7.03L22 9.239l-7.19-.61L12 2 9.19 8.629 2 9.239l5.46 4.731L5.82 21 12 17.27z"
        fill={filled ? "#d4af37" : "none"}
        stroke="#d4af37"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export default function StarRating({
  value,
  onChange,
  size = 18,
}: {
  value: string;
  onChange: (v: string) => void;
  size?: number;
}) {
  const num = value ? Number(value) : 0;

  const handleKey = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "ArrowRight" || e.key === "ArrowUp") {
        e.preventDefault();
        const next = Math.min(5, (num || 0) + 1);
        onChange(String(next));
      } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
        e.preventDefault();
        const prev = Math.max(1, (num || 1) - 1);
        onChange(String(prev));
      } else if (
        e.key === "Backspace" ||
        e.key === "Delete" ||
        e.key === "Escape"
      ) {
        e.preventDefault();
        onChange("");
      }
    },
    [num, onChange]
  );

  return (
    <div
      role="radiogroup"
      aria-label="Betyg i stjärnor"
      tabIndex={0}
      onKeyDown={handleKey}
      className={styles.starsRow}
      data-testid="star-group">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          role="radio"
          aria-checked={num === n}
          aria-label={`${n} av 5`}
          data-testid={`star-${n}`}
          className={styles.starButton}
          onClick={() => onChange(String(n))}>
          <Star filled={n <= num} size={size} />
        </button>
      ))}
    </div>
  );
}
