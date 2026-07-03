import styles from "./InfoHighlight.module.css";

export default function InfoHighlight({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.wrapper}>
      <img className={styles.image} src="heroSectionImg.jpg" alt="" />
      {children}
    </div>
  );
}
