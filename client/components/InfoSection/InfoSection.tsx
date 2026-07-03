import styles from "./InfoSection.module.css";

export default function InfoSection({
  id,
  title,
  text,
}: {
  id: string;
  title: string;
  text: string;
}) {
  return (
    <section id={id} className={styles.section}>
      <h2 className={styles.heading}>{title}</h2>

      <div className={styles.content}>
        <div className={styles.text}>
          <p>{text}</p>
        </div>

        <div className={styles.imageWrapper}>
          <img
            src="/justina-2.jpeg"
            alt="Justina"
            className={styles.image}
          />
        </div>
      </div>
    </section>
  );
}
