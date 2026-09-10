import styles from "./NotFound.module.css";
import errorImage from "../assets/404.png";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <img src={errorImage} alt="404 Error" className={styles.errorImage} />
        <h1 className={styles.title}>PAGE NOT FOUND!</h1>
        <p className={styles.subtitle}>
          KURAPIKA IS DROWNING IN AN<br />INDESCRIBABLE EMPTINESS
        </p>
      </div>
    </div>
  );
}
