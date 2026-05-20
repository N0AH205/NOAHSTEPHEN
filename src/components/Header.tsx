import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <span className="text-body">Noah</span>
          <span className="text-accent" style={{ marginLeft: '0.25rem' }}>Stephen</span>
        </div>
        <nav className={styles.nav}>
          <a href="#work" className="text-body">Work</a>
          <a href="#philosophy" className="text-body">Philosophy</a>
          <a href="#contact" className="cta-button">Contact</a>
        </nav>
      </div>
    </header>
  );
}
