import styles from './SelectedWork.module.css';

const projects = [
  {
    id: 1,
    title: 'Acme AI Interface',
    impact: 'Reworked realtime synchronization logic to reduce UI lag during frequent state updates.',
    year: '2025',
  },
  {
    id: 2,
    title: 'Editorial System',
    impact: 'Migrated legacy monolithic rendering to a heavily cached static-generation strategy, improving LCP by 60%.',
    year: '2024',
  },
  {
    id: 3,
    title: 'Fintech Dashboard',
    impact: 'Implemented strict component-level error boundaries and fallback UI patterns for resilient transactional workflows.',
    year: '2024',
  },
];

export default function SelectedWork() {
  return (
    <section id="work" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>
          <span className="text-body">Selected</span>
          <span className="text-accent"> Works</span>
        </h2>
        
        <div className={styles.grid}>
          {projects.map((project, index) => (
            <div key={project.id} className={`${styles.projectCard} ${styles[`card${index + 1}`]}`}>
              <div className={styles.imageFrame}>
                <div className={styles.imageWrapper}>
                  <div className={styles.placeholderImage}>
                    <span className="text-accent">{project.title} Preview</span>
                  </div>
                </div>
              </div>
              <div className={styles.details}>
                <div className={styles.textContent}>
                  <h3 className={styles.title}>{project.title}</h3>
                  <p className={styles.impact}>{project.impact}</p>
                </div>
                <div className={styles.meta}>
                  <span>{project.year}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
