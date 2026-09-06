import { useEffect, useRef, useState } from "react";
import lakcLogo from "../assets/lakclogo.png";
import fsegLogo from "../assets/fseglogo.png";
import mansLogo from "../assets/manslogo.png";
import styles from "./Education.module.css";
import DecryptedText from "./DecryptedText";
import TextType from "./TextType";

export default function Education() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Set visible when entering viewport
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          // Reset animation when leaving viewport
          setIsVisible(false);
        }
      },
      { 
        threshold: 0.2,
        rootMargin: "-50px" // Trigger slightly before/after the section
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      id="education"
      ref={sectionRef} 
      className={`${styles.education} ${isVisible ? styles.visible : ""}`}
    >
      <h2 className={styles.title}>
        <DecryptedText 
          text="I've learned from"
          animateOn="view"
          speed={88}
          maxIterations={1}
          sequential={true}
          revealDirection="start"
        />
      </h2>

      <div className={styles.educationGrid}>
        {/* LAKC - Left */}
        <div className={`${styles.educationItem} ${styles.item1}`}>
          <div className={styles.logoWrapper}>
            <img src={lakcLogo} alt="LAKC Logo" className={styles.logo} />
          </div>
          <div className={styles.period}>2020 - 2023</div>
          <div className={styles.degree}>
            Baccalaureate in Economics and
            <br />
            Management (with Honors) - Abou
            <br />
            Kacem Chebbi High School
          </div>
        </div>

        {/* FSEG - Center */}
        <div className={`${styles.educationItem} ${styles.item2}`}>
          <div className={styles.logoWrapper}>
            <img src={fsegLogo} alt="FSEG Sfax Logo" className={styles.logo} />
          </div>
          <div className={styles.period}>2023 - 2026</div>
          <div className={styles.degree}>
            Bachelor's Degree in Computer
            <br />
            Science Applied to Management
            <br />
            (with Honors) - FSEGS
          </div>
        </div>

        {/* Le Mans - Right */}
        <div className={`${styles.educationItem} ${styles.item3}`}>
          <div className={styles.logoWrapper}>
            <img src={mansLogo} alt="Le Mans Université Logo" className={styles.logo} />
          </div>
          <div className={styles.period}>2023 - 2026</div>
          <div className={styles.degree}>
            Double Degree in Computer Science
            <br />
            (with Honors) – Le Mans University
            <br />
            (France)
          </div>
        </div>
      </div>

      {/* Master's Degree - Bottom Center */}
      <div className={`${styles.mastersDegree} ${styles.item4}`}>
        <TextType 
          text={[
            "2026 - present",
            "Master's Degree in Computer Science – FSEGS"
          ]}
          as="div"
          typingSpeed={50}
          pauseDuration={3000}
          linePauseDurations={[500, 3000]}
          loop={true}
          showCursor={true}
          cursorCharacter="|"
          startOnVisible={true}
          className={styles.typingText}
        />
      </div>
    </section>
  );
}
