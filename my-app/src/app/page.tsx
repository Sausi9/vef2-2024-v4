import Image from "next/image";
import styles from "./page.module.css";
import { Teams } from "../../components/Teams/Teams";
import AddTeamForm from "../../components/AddTeamForm.tsx/AddTeamForm";

export default function Home() {
  return (
    <div className=".container">
      <h1 className=".title"> Boltadeildin!</h1>
      <Teams /> {/* Render the Teams component */}
    </div>
  );
}
