import Image from "next/image";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <>
      <section id="top" className={styles.hero}>
        <video autoPlay loop muted playsInline>
          <source
            src="https://ohujxhgkbzswgybanxze.supabase.co/storage/v1/object/public/videos/hero%20video.mp4"
            type="video/mp4"
          />
        </video>

        <div className={styles.overlay} />

        <div className={styles.content}>
          <p className={styles.eyebrow}>Ets.Pellaton</p>
          <h1 className={styles.title}>
            "Shaping contemporary perspectives"
          </h1>
        </div>
      </section>

      <section className={styles.afterHero}>
        <div className={styles.imageWrapper}>
          <Image
            src="/heroSectionImg.jpg"
            alt="Œuvre exposée à la galerie"
            fill
            priority
            className={styles.image}
          />

          <div className={styles.imageOverlay} />

          <div className={styles.imageContent}>
            <p className={styles.imageEyebrow}>Ets.Pellaton</p>
            <h2 className={styles.imageTitle}>
              Ets. Pellaton is an online gallery dedicated to discovering, representing and connecting exceptional emerging artists with collectors seeking meaningful contemporary art
            </h2>
          </div>
        </div>
      </section>
    </>
  );
}