import Image from "next/image";
import Link from "next/link";
import styles from "./home.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Vinkällar´n</h1>

      <div className={styles.scene}>
        <div className={styles.shelf}>
          <Image
            src="/tavla.svg"
            alt="Tavla med omslaget från kokboken 'Gottigheter'"
            width={300}
            height={300}
            className={styles.tavla}
          />
          <Image
            src="/vinhylla.svg"
            alt="Vinhylla"
            width={340}
            height={300}
            className={styles.vinhylla}
          />
        </div>

        <div className={styles.nav}>
          <Link
            href="/wines/new"
            className={styles.navItem}
            aria-label="Lägg till nytt vin">
            <Image
              src="/nytt-vin.svg"
              alt=""
              width={120}
              height={120}
              className={`${styles.navImg} ${styles.rotateMinus}`}
            />
          </Link>
          <div className={styles.navItem}>
            <Image
              src="/mat.svg"
              alt=""
              width={260}
              height={260}
              className={`${styles.navImg} ${styles.navImgLarge} ${styles.rotatePlus90}`}
            />
          </div>
          <Link href="/wines" className={styles.navItem} aria-label="Vinlistan">
            <Image
              src="/vinlistan.svg"
              alt=""
              width={120}
              height={120}
              className={`${styles.navImg} ${styles.rotatePlus}`}
            />
          </Link>
        </div>
      </div>
    </main>
  );
}
