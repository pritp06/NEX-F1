import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import styles from './NotFound.module.css';

export function NotFound() {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      className={styles.page}
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, transition: { duration: reducedMotion ? 0 : 0.2 } }}
      transition={{ duration: reducedMotion ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={styles.inner}>
        <div className={styles.number} aria-hidden="true">404</div>
        <p className={styles.label}>Page not found</p>
        <h1 className={styles.heading}>This lap is off-track.</h1>
        <p className={styles.copy}>
          The page you're looking for doesn't exist or may have moved.
          Head back to the start.
        </p>
        <div className={styles.actions}>
          <Link to="/" className={styles.btnPrimary}>Return home</Link>
          <Link to="/evolution" className={styles.btnSecondary}>Explore the evolution</Link>
        </div>
      </div>
    </motion.div>
  );
}
