import styles from "./page.module.css";
import { Teams } from "../../components/Teams/Teams";
import Header from "../../components/Header/Header";

export default function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <h1 className={styles.title}> Boltadeildin!</h1>
      <Teams />
    </div>
  );
}
