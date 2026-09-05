import me from "../assets/me.png";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
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