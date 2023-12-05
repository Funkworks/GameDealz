import styles from "./Header.module.css"
import Link from "next/link"
import logo from "../gamehuntlogo2.svg";
import Image from "next/image";

export default function Header(){
    return (
        <main className={styles.main}>
            <div className={styles.logoTitle}>
                <Link href="./" className={styles.link}>
                    <Image src={logo} width={200} height={200} alt="logo" />
                </Link>
                <div className={styles.titleDescription}>
                    <h1 className={styles.title}>GameHunt</h1>
                    <div className={styles.description}>hunt the game, find the deal</div>
                </div>
            </div>
        </main>
    )
}