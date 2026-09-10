import { useEffect, useRef, useState } from "react";
import styles from "./Interests.module.css";
import ThreeDCarousel from "./ui/3d-carousel";
import chess from "../assets/interests/chess.jpg";
import music from "../assets/interests/music.jpg";
import movies from "../assets/interests/movies.jpg";
import books from "../assets/interests/books.jpg";
import graphicDesign from "../assets/interests/graphic design.jpg";

export default function Interests() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Array of interest images for the 3D carousel
  const interestImages = [
    chess,
    music,
    movies,
    books,
    graphicDesign
  ];

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
        
        <div className={`${styles.carouselSection} ${isVisible ? styles.carouselVisible : ""}`}>
          <ThreeDCarousel 
            images={interestImages}
            radius={280}
            cardW={320}
            cardH={360}
            autoRotate={true}
            rotationSpeed={0.12}
          />
        </div>
      </div>
    </section>
  );
}
