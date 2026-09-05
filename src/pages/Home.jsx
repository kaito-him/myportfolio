import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <Navbar />
      <Hero />
    </div>
  );
}
