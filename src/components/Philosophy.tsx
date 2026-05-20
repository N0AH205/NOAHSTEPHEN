import styles from './Philosophy.module.css';

export default function Philosophy() {
  return (
    <section id="philosophy" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.textBlock}>
          <h2 className={styles.title}>
            The <span className="text-accent">Taste</span> Layer
          </h2>
          <p className={styles.paragraph}>
            A great portfolio isn't about how many 3D globes or particle backgrounds you can stack. 
            It's about restraint. It's the conviction to let excellent typography, subtle motion, and structural clarity speak for themselves.
          </p>
          <p className={styles.paragraph}>
            I believe that consistency in small decisions—typography choices, spacing rhythm, and interaction behavior—is what actually creates a distinct, premium identity.
          </p>
          <a href="#contact" className={styles.darkCta}>
            Let's build something intentional
          </a>
        </div>
      </div>
    </section>
  );
}
