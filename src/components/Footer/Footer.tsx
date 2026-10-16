import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const FOOTER_LINKS = [
  { to: '/evolution', label: 'Evolution' },
  { to: '/compare', label: 'Compare' },
  { to: '/technology', label: 'Technology' },
  { to: '/sources', label: 'Sources' },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <span className={styles.wordmark}>NEX</span>
            <p className={styles.tagline}>
              The Evolution of Formula 1, 1950–2026
            </p>
          </div>
          <nav className={styles.nav} aria-label="Footer navigation">
            <ul className={styles.links} role="list">
              {FOOTER_LINKS.map(link => (
                <li key={link.to}>
                  <Link to={link.to} className={styles.link}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className={styles.divider} />

        <div className={styles.bottom}>
          <p className={styles.copy}>
            Built by Prit Patel. Content for educational and historical purposes.
            F1 car images sourced from Wikimedia Commons under their respective licenses.
          </p>
          <Link to="/sources" className={styles.sourceLink}>
            Image credits & sources →
          </Link>
        </div>
      </div>
    </footer>
  );
}
