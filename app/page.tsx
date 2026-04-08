import Link from "next/link";
import styles from "./home.module.css";

type Placement = {
  id: string;
  src: string;
  top: number;
  left: number;
  width: number;
  rotate?: number;
  z?: number;
  link?: string;
  alt?: string;
};

// Stage canvas: 670 × 700 "design-px" (det faktiska bounding-boxet för alla items).
// left/top = itemets center som % av canvas. width = itemets bredd som % av canvas.
// Scenen skalar proportionellt på alla skärmstorlekar utan overflow.
const PLACEMENTS: Placement[] = [
  {
    id: "frame",
    src: "/tavla.svg",
    top: 27.4,
    left: 22.4,
    width: 44.8,
    alt: "Tavla med omslaget från kokboken 'Gottigheter'",
  },
  {
    id: "shelf",
    src: "/vinhylla.svg",
    top: 27.4,
    left: 74.6,
    width: 50.7,
    alt: "Vinhylla",
  },
  {
    id: "add",
    src: "/nytt-vin.svg",
    top: 82.3,
    left: 16.4,
    width: 17.9,
    rotate: -20,
    link: "/wines/new",
  },
  {
    id: "food",
    src: "/mat.svg",
    top: 85.3,
    left: 41.8,
    width: 23.9,
    rotate: 90,
  },
  {
    id: "list",
    src: "/vinlistan.svg",
    top: 82.3,
    left: 67.2,
    width: 17.9,
    rotate: 10,
    link: "/wines",
  },
];

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Vinkällar´n</h1>

      <div className={styles.stage}>
        {PLACEMENTS.map((p) => {
          const body = (
            <div
              key={p.id}
              className={styles.item}
              style={{
                top: `${p.top}%`,
                left: `${p.left}%`,
                width: `${p.width}%`,
                transform: `translate(-50%, -50%) rotate(${p.rotate ?? 0}deg)`,
                zIndex: p.z ?? 1,
              }}>
              <img src={p.src} alt={p.alt ?? ""} />
            </div>
          );
          return p.link ? (
            <Link key={p.id} href={p.link} aria-label={p.alt ?? p.id}>
              {body}
            </Link>
          ) : (
            body
          );
        })}
      </div>
    </main>
  );
}
