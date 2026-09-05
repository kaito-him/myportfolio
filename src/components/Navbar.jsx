import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import styles from "./Navbar.module.css";

const LINKS = [
  { label: "home", href: "/" },
  { label: "education", href: "#education" },
  { label: "projects", href: "#projects" },
  { label: "interests", href: "#interests" },
  { label: "contact", href: "#contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("home");

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
              onClick={() => setActive(link.label)}
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
