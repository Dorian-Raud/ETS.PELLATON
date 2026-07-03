import Image from "next/image";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section id="top" className={styles.hero}>
      {/* <Image
        src="/heroSectionImg.jpg"
        alt="Œuvre exposée à la galerie"
        fill
        priority
        className={styles.image}
      /> */}
      <video
        autoPlay
        loop
        muted
        playsInline>
        <source
          src="https://ohujxhgkbzswgybanxze.supabase.co/storage/v1/object/public/videos/hero%20video.mp4"
          type="video/mp4" />

      </video>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <p className={styles.eyebrow}>Galerie d&apos;art contemporain</p>
        <h1 className={styles.title}>L&apos;art, sans détour</h1>
      </div>
    </section>
  );
}
