import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import Education from "../components/Education.jsx";
import Projects from "../components/Projects.jsx";
import Interests from "../components/Interests.jsx";
import Contact from "../components/Contact.jsx";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <Navbar />
      <Hero />
      <Education />
      <Projects />
      <Interests />
      <Contact />
    </div>
  );
}
