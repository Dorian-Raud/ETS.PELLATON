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
      <p className={styles.text}>{text}</p>
    </section>
  );
}
