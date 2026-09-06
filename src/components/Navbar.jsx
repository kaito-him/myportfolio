import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import styles from "./Navbar.module.css";

const LINKS = [
  { label: "home", href: "/", id: "home" },
  { label: "education", href: "/education", id: "education" },
  { label: "projects", href: "/projects", id: "projects" },
  { label: "interests", href: "/interests", id: "interests" },
  { label: "contact", href: "/contact", id: "contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("home");
  const navigate = useNavigate();
  const location = useLocation();

  // Handle smooth scrolling and URL update on click
  const handleNavClick = (e, link) => {
    e.preventDefault();
    
    setActive(link.label);
    
    // Update URL
    navigate(link.href, { replace: true });
    
    // Smooth scroll to section or top
    if (link.label === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.getElementById(link.id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  // Detect scroll position and update URL + active state
  useEffect(() => {
    const handleScroll = () => {
      const sections = LINKS.map(link => ({
        id: link.id,
        label: link.label,
        href: link.href,
        element: document.getElementById(link.id)
      })).filter(section => section.element);

      // Find which section is currently in view
      let currentSection = "home";
      
      for (const section of sections) {
        const rect = section.element.getBoundingClientRect();
        // Check if section is in the viewport (with some offset for better UX)
        if (rect.top <= 150 && rect.bottom >= 150) {
          currentSection = section.label;
          break;
        }
      }

      // Update active state
      setActive(currentSection);
      
      // Update URL if it's different
      const expectedPath = currentSection === "home" ? "/" : `/${currentSection}`;
      const currentPath = location.pathname;
      
      if (currentPath !== expectedPath) {
        navigate(expectedPath, { replace: true });
      }
    };

    // Add scroll listener with throttling for performance
    let timeoutId;
    const throttledScroll = () => {
      if (timeoutId) return;
      timeoutId = setTimeout(() => {
        handleScroll();
        timeoutId = null;
      }, 100);
    };

    window.addEventListener("scroll", throttledScroll);
    
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", throttledScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [navigate, location.pathname]);

  // Handle initial load with path
  useEffect(() => {
    const path = location.pathname;
    if (path !== "/") {
      const section = path.substring(1); // Remove leading /
      const element = document.getElementById(section);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
        setActive(section);
      }
    }
  }, []);

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.logoWrap} aria-label="Home">
        <img src={logo} alt="Logo" className={styles.logo} />
      </Link>

      <ul className={styles.navList}>
        {LINKS.map((link) => (
          <li key={link.label} className={styles.navItem}>
            <a
              href={link.href}
              className={`${styles.navLink} ${
                active === link.label ? styles.active : ""
              }`}
              onClick={(e) => handleNavClick(e, link)}
            >
              {link.label}
              {active === link.label && (
                <span className={styles.underline} aria-hidden="true" />
              )}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
