import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer id="contact" className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <h2 className={styles.headline}>
            Let's build interfaces that <br />
            <span className="text-accent">feel intentional.</span>
          </h2>
          <a href="mailto:hello@example.com" className="cta-button">
            Get in touch
          </a>
        </div>
        
        <div className={styles.bottom}>
          <div className={styles.brand}>
            <span className="text-body">Noah</span>
            <span className="text-accent" style={{ marginLeft: '0.25rem' }}>Stephen</span>
          </div>
          
          <div className={styles.links}>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a>
            <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
          
          <div className={styles.year}>
            &copy; {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </footer>
  );
}
