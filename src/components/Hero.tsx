import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={`${styles.hero} ${styles.animateIn}`}>
      <div className={styles.content}>
        <h1 className={styles.headline}>
          <span className={styles.line1}>I build products where</span>
          <span className={`${styles.line2} text-accent`}>engineering</span>
          <span className={styles.line3}>decisions shape the experience.</span>
        </h1>
        
        <div className={styles.subtextWrapper}>
          <p className={styles.subtext}>
            Product Engineer focusing on interfaces that feel fast, intentional, and structurally clear. 
            Currently building scalable component architectures and reducing render latency for modern web applications.
          </p>
          <div className={styles.scrollIndicator}>
            <span>Scroll</span>
            <div className={styles.line}></div>
          </div>
        </div>
      </div>
    </section>
  );
}
