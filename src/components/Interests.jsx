import { useEffect, useRef, useState } from "react";
import styles from "./Interests.module.css";
import DecryptedText from "./DecryptedText";
import chess from "../assets/interests/chess.jpg";
import music from "../assets/interests/music.jpg";
import movies from "../assets/interests/movies.jpg";
import graphicDesign from "../assets/interests/graphic design.jpg";

export default function Interests() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { 
        threshold: 0.2,
        rootMargin: "-50px"
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
      id="interests"
      ref={sectionRef} 
      className={`${styles.interests} ${isVisible ? styles.visible : ""}`}
    >
      <div className={styles.content}>
        <div className={`${styles.textSection} ${isVisible ? styles.textVisible : ""}`}>
          <p className={styles.description}>
            Beyond coding, I enjoy exploring creativity and strategy through chess, music, movies, and graphic design. Chess challenges the way I think, while music and cinema inspire my imagination. I also enjoy graphic design as a way to experiment with visual ideas and express creativity beyond code.
          </p>
        </div>
        
        <div className={styles.imagesSection}>
          <div className={styles.imageGrid}>
            <img 
              src={chess} 
              alt="Chess" 
              className={`${styles.interestImage} ${isVisible ? styles.imageVisible : ""}`}
              style={{ transitionDelay: "0.1s" }}
            />
            <img 
              src={music} 
              alt="Music" 
              className={`${styles.interestImage} ${isVisible ? styles.imageVisible : ""}`}
              style={{ transitionDelay: "0.2s" }}
            />
            <img 
              src={movies} 
              alt="Movies" 
              className={`${styles.interestImage} ${isVisible ? styles.imageVisible : ""}`}
              style={{ transitionDelay: "0.3s" }}
            />
            <img 
              src={graphicDesign} 
              alt="Graphic Design" 
              className={`${styles.interestImage} ${isVisible ? styles.imageVisible : ""}`}
              style={{ transitionDelay: "0.4s" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
