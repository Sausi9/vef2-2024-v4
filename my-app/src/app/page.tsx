import Image from "next/image";
import styles from "./page.module.css";
import Team from "../../components/teams";
export default function Home() {
  return (
      <div className = ".container">
        <h1 className = '.title'>Welcome to the Home Page</h1>
        {Team()}
      </div>
    );
  }