import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import DecryptedText from "./DecryptedText";
import danceWellness from "../assets/projects/dance&wellness.png";
import bookwyrm from "../assets/projects/bookwyrm.png";
import ocr from "../assets/projects/ocr.png";
import club from "../assets/projects/club.png";
import styles from "./Projects.module.css";

const ChevronLeftIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const ChevronRightIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

const projectData = [
  {
    id: 1,
    imageUrl: danceWellness,
    title: "Intelligent Management and Performance Tracking platform for dance & wellness learners",
  },
  {
    id: 2,
    imageUrl: bookwyrm,
    title: "BookWyrm is a mobile application for managing and discovering books",
  },
  {
    id: 3,
    imageUrl: ocr,
    title: "OCR student data extraction and ranking application",
  },
  {
    id: 4,
    imageUrl: club,
    title: "University Clubs Task Management Application",
  },
];

export default function Projects() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoplayIntervalRef = useRef(null);
  const autoplayDelay = 3500;

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
        rootMargin: "-50px",
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

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % projectData.length);
  };

  useEffect(() => {
    if (!isPaused) {
      autoplayIntervalRef.current = setInterval(goToNext, autoplayDelay);
    }
    return () => {
      if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    };
  }, [isPaused, activeIndex]);

  const changeSlide = (newIndex) => {
    const safeIndex = (newIndex + projectData.length) % projectData.length;
    setActiveIndex(safeIndex);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    if (!isPaused) autoplayIntervalRef.current = setInterval(goToNext, autoplayDelay);
  };

  const onDragEnd = (event, info) => {
    const dragThreshold = 75;
    const dragOffset = info.offset.x;
    if (dragOffset > dragThreshold) changeSlide(activeIndex - 1);
    else if (dragOffset < -dragThreshold) changeSlide(activeIndex + 1);
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className={`${styles.projects} ${isVisible ? styles.visible : ""}`}
    >
      <h2 className={styles.title}>
        <DecryptedText
          text="See some of my projects"
          animateOn="view"
          speed={88}
          maxIterations={1}
          sequential={true}
          revealDirection="start"
        />
      </h2>

      <div
        className={styles.carouselWrapper}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className={styles.carouselContainer}>
          <div className={styles.carouselTrack}>
            <motion.div
              className={styles.carouselInner}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={onDragEnd}
            >
              {projectData.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  activeIndex={activeIndex}
                  totalCards={projectData.length}
                />
              ))}
            </motion.div>
          </div>

          <div className={styles.controls}>
            <button
              onClick={() => changeSlide(activeIndex - 1)}
              className={styles.controlButton}
              aria-label="Previous project"
            >
              <ChevronLeftIcon className={styles.controlIcon} />
            </button>

            <div className={styles.indicators}>
              {projectData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => changeSlide(index)}
                  className={`${styles.indicator} ${
                    activeIndex === index ? styles.indicatorActive : ""
                  }`}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => changeSlide(activeIndex + 1)}
              className={styles.controlButton}
              aria-label="Next project"
            >
              <ChevronRightIcon className={styles.controlIcon} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index, activeIndex, totalCards }) {
  let offset = index - activeIndex;
  if (offset > totalCards / 2) offset -= totalCards;
  else if (offset < -totalCards / 2) offset += totalCards;

  const isVisible = Math.abs(offset) <= 1;
  const isCenter = offset === 0;

  const animate = {
    x: `${offset * 55}%`,
    scale: offset === 0 ? 1 : 0.8,
    zIndex: totalCards - Math.abs(offset),
    opacity: isVisible ? 1 : 0,
    transition: { type: "spring", stiffness: 260, damping: 30 },
  };

  return (
    <motion.div className={styles.projectCard} animate={animate} initial={false}>
      <div className={`${styles.projectImageWrapper} ${isCenter ? styles.centerImage : styles.sideImage}`}>
        <img
          src={project.imageUrl}
          alt={project.title}
          className={styles.projectImage}
          onError={(e) => {
            const target = e.target;
            target.onerror = null;
            target.src = "https://placehold.co/800x500/1e1e1e/ffffff?text=Image+Missing";
          }}
        />
      </div>
      <p
        className={`${styles.projectTitle} ${
          offset === 0 ? styles.projectTitleActive : ""
        }`}
      >
        {project.title}
      </p>
    </motion.div>
  );
}
