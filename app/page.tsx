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

const PLACEMENTS: Placement[] = [
  {
    id: "frame",
    src: "/tavla.svg",
    top: 160,
    left: -80,
    width: 300,
    alt: "Tavla med omslaget från kokboken 'Gottigheter'",
  },
  {
    id: "shelf",
    src: "/vinhylla.svg",
    top: 160,
    left: 270,
    width: 340,
    alt: "Vinhylla",
  },

  {
    id: "add",
    src: "/nytt-vin.svg",
    top: 480,
    left: -120,
    width: 120,
    rotate: -20,
    link: "/wines/new",
  },
  { id: "food", src: "/mat.svg", top: 480, left: 50, width: 160, rotate: 90 },
  {
    id: "list",
    src: "/vinlistan.svg",
    top: 480,
    left: 220,
    width: 120,
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
