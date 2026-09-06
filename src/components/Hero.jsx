import { useEffect, useState } from "react";
import me from "../assets/me.png";
import styles from "./Hero.module.css";

export default function Hero() {
  const [scrollOpacity, setScrollOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const fadeStart = 0;
      const fadeEnd = windowHeight * 0.6;

      if (scrollPosition <= fadeStart) {
        setScrollOpacity(1);
      } else if (scrollPosition >= fadeEnd) {
        setScrollOpacity(0);
      } else {
        const opacity = 1 - (scrollPosition - fadeStart) / (fadeEnd - fadeStart);
        setScrollOpacity(opacity);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section 
      id="home"
      className={styles.hero} 
      style={{ opacity: scrollOpacity }}
    >
      <h1 className={styles.portfolioTitle} aria-hidden="true">
        PORTFOLIO
      </h1>

      <div className={styles.intro}>
        <div className={styles.introLine}>HI, I AM</div>
        <div className={styles.introLine}>RASLEN</div>
        <div className={styles.introLine}>DHIFAOUI</div>
      </div>

      <p className={styles.jobTitle}>Full-Stack Developer</p>

      <img src={me} alt="Raslen Dhifaoui" className={styles.portrait} />

      <p className={styles.description}>
        I turn ideas into digital
        <br />
        experiences through clean
        <br />
        code, creative thinking, and
        <br />
        scalable solutions.
      </p>
    </section>
  );
}