import styles from "./page.module.css";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <body>
        <h1 className={styles.center}>
          <Image
            className={styles.center}
            src="icon.svg"
            width={500}
            height={500}
            alt="Picture of the author"
          />
        </h1>

        <div className={styles.center}>
          <a href="/init"> ENTER </a>
        </div>
      </body>
    </main>
  );
}
