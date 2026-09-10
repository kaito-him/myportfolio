import { useEffect, useRef, useState } from "react";
import { MdPhone, MdEmail } from "react-icons/md";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import styles from "./Contact.module.css";
import logo from "../assets/logo.png";

export default function Contact() {
  const [isLogoVisible, setIsLogoVisible] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [isSocialVisible, setIsSocialVisible] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const logoRef = useRef(null);
  const contentRef = useRef(null);
  const socialRef = useRef(null);

  useEffect(() => {
    const logoObserver = new IntersectionObserver(
      ([entry]) => {
        setIsLogoVisible(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: "0px 0px -200px 0px" }
    );

    const contentObserver = new IntersectionObserver(
      ([entry]) => {
        setIsContentVisible(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: "0px 0px -200px 0px" }
    );

    const socialObserver = new IntersectionObserver(
      ([entry]) => {
        setIsSocialVisible(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: "0px 0px -200px 0px" }
    );

    // Small delay to ensure observers are set up properly
    const timer = setTimeout(() => {
      if (logoRef.current) logoObserver.observe(logoRef.current);
      if (contentRef.current) contentObserver.observe(contentRef.current);
      if (socialRef.current) socialObserver.observe(socialRef.current);
    }, 100);

    return () => {
      clearTimeout(timer);
      if (logoRef.current) logoObserver.unobserve(logoRef.current);
      if (contentRef.current) contentObserver.unobserve(contentRef.current);
      if (socialRef.current) socialObserver.unobserve(socialRef.current);
    };
  }, []);

  const copyToClipboard = (text, e) => {
    e.preventDefault();
    navigator.clipboard.writeText(text).then(() => {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    });
  };

  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.container}>
        <div
          ref={logoRef}
          className={`${styles.logoSection} ${isLogoVisible ? styles.logoVisible : ""}`}
        >
          <img src={logo} alt="Logo" className={styles.logo} />
        </div>
        
        <div
          ref={contentRef}
          className={`${styles.contentSection} ${isContentVisible ? styles.contentVisible : ""}`}
        >
          <div className={styles.textContent}>
            <h2 className={styles.title}>Get in touch</h2>
            <p className={styles.subtitle}>I would like to hear from you!</p>
          </div>
          
          <div className={styles.contactInfo}>
            <a 
              href="tel:+21629300041" 
              className={styles.contactItem}
              onClick={(e) => copyToClipboard("+216 29 300 041", e)}
            >
              <span className={styles.iconCircle}>
                <MdPhone className={styles.reactIcon} />
              </span>
              <span className={styles.contactText}>+216 29 300 041</span>
            </a>
            
            <a 
              href="mailto:raslendhifaoui1@gmail.com" 
              className={styles.contactItem}
              onClick={(e) => copyToClipboard("raslendhifaoui1@gmail.com", e)}
            >
              <span className={styles.iconCircle}>
                <MdEmail className={styles.reactIcon} />
              </span>
              <span className={styles.contactText}>raslendhifaoui1@gmail.com</span>
            </a>
          </div>

          <div
            ref={socialRef}
            className={`${styles.socialLinks} ${isSocialVisible ? styles.socialVisible : ""}`}
          >
            <a href="https://github.com/kaito-him" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/raslen-dhifaoui-617372370/" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
              <FaLinkedin />
            </a>
            <a href="https://www.instagram.com/raslen.dhifaoui/" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
      
      <footer className={styles.footer}>
        <p className={styles.copyright}>
          © {new Date().getFullYear()} Raslen Dhifaoui. All rights reserved.
        </p>
        <p className={styles.designed}>
          Designed with <span className={styles.heart}>♥</span> by Raslen Dhifaoui
        </p>
      </footer>

      {showToast && (
        <div className={styles.toast}>
          <span>Text copied!</span>
        </div>
      )}
    </section>
  );
}
