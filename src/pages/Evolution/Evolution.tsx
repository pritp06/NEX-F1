import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ERAS, getAdjacentEras } from '../../data/eras';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import styles from './Evolution.module.css';

// ── Animation variants ─────────────────────────────────────────

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  exit:    { opacity: 0, transition: { duration: 0.25 } },
};

const panelVariants = {
  enter: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? 48 : -48,
  }),
  center: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? -48 : 48,
    transition: { duration: 0.25, ease: [0.4, 0, 1, 1] },
  }),
};

const panelVariantsReduced = {
  enter:  { opacity: 0 },
  center: { opacity: 1, transition: { duration: 0.3 } },
  exit:   { opacity: 0, transition: { duration: 0.2 } },
};

// ── FallbackImage ──────────────────────────────────────────────

function FallbackImage({
  src,
  alt,
  eraTitle,
  eraColor,
  className,
}: {
  src: string;
  alt: string;
  eraTitle: string;
  eraColor: string;
  className?: string;
}) {
  const [errored, setErrored] = useState(false);

  if (errored || !src) {
    return (
      <div
        className={`${styles.imageFallback} ${className ?? ''}`}
        style={{
          background: `linear-gradient(135deg, var(--surface-1) 0%, ${eraColor}40 100%)`,
        }}
        role="img"
        aria-label={`${eraTitle} — illustrative placeholder; no matching period photograph available.`}
      >
        <span className={styles.imageFallbackIcon} aria-hidden="true">◉</span>
        <span className={styles.imageFallbackText}>{eraTitle}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      onError={() => setErrored(true)}
    />
  );
}

// ── Evolution ──────────────────────────────────────────────────

export function Evolution() {
  const reducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const era = ERAS[activeIndex];
  const { prev, next } = getAdjacentEras(era.id);

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > activeIndex ? 1 : -1);
      setActiveIndex(index);
    },
    [activeIndex],
  );

  const goPrev = useCallback(() => {
    if (activeIndex > 0) goTo(activeIndex - 1);
  }, [activeIndex, goTo]);

  const goNext = useCallback(() => {
    if (activeIndex < ERAS.length - 1) goTo(activeIndex + 1);
  }, [activeIndex, goTo]);

  const variants = reducedMotion ? panelVariantsReduced : panelVariants;

  return (
    <motion.main
      className={styles.page}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Page Header */}
      <header className={styles.pageHeader}>
        <div className={styles.headerInner}>
          <p className={styles.headerEyebrow}>NEX — F1 History</p>
          <h1 className={styles.pageTitle}>The Evolution</h1>
          <p className={styles.pageSubtitle}>Formula 1 cars, 1950–2026</p>
        </div>
      </header>

      {/* Era Navigator */}
      <nav className={styles.eraNav} aria-label="Select Formula 1 era">
        <div className={styles.eraNavTrack}>
          {ERAS.map((e, i) => (
            <button
              key={e.id}
              className={`${styles.eraNavBtn} ${i === activeIndex ? styles.eraNavBtnActive : ''}`}
              onClick={() => goTo(i)}
              aria-pressed={i === activeIndex}
              aria-label={`${e.years}: ${e.title}`}
            >
              <span className={styles.eraNavYear}>{e.years.slice(0, 4)}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Era Panel */}
      <section className={styles.panelSection} aria-live="polite" aria-atomic="true">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.article
            key={era.id}
            className={styles.eraPanel}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            aria-label={`${era.years}: ${era.title}`}
          >
            {/* Left: content */}
            <div className={styles.eraPanelContent}>
              <span className={styles.eraYears}>{era.years}</span>
              <h2 className={styles.eraTitle}>{era.title}</h2>
              <p className={styles.eraSubtitle}>{era.subtitle}</p>
              <p className={styles.eraDescription}>{era.description}</p>

              {/* Spec grid */}
              <dl className={styles.specGrid} aria-label="Technical specifications">
                <div className={styles.specItem}>
                  <dt className={styles.specLabel}>Engine</dt>
                  <dd className={styles.specValue}>{era.engineSpec}</dd>
                </div>
                <div className={styles.specItem}>
                  <dt className={styles.specLabel}>Aerodynamics</dt>
                  <dd className={styles.specValue}>{era.aerodynamics}</dd>
                </div>
                <div className={styles.specItem}>
                  <dt className={styles.specLabel}>Chassis</dt>
                  <dd className={styles.specValue}>{era.chassis}</dd>
                </div>
              </dl>

              {/* Safety & regulation notes */}
              {(era.safetyNote || era.regulationNote) && (
                <div className={styles.notesRow}>
                  {era.safetyNote && (
                    <aside className={styles.noteCard}>
                      <span className={styles.noteIcon} aria-hidden="true">⚑</span>
                      <span className={styles.noteLabel}>Safety</span>
                      <p className={styles.noteText}>{era.safetyNote}</p>
                    </aside>
                  )}
                  {era.regulationNote && (
                    <aside className={styles.noteCard}>
                      <span className={styles.noteIcon} aria-hidden="true">§</span>
                      <span className={styles.noteLabel}>Regulation</span>
                      <p className={styles.noteText}>{era.regulationNote}</p>
                    </aside>
                  )}
                </div>
              )}

              {/* Key details */}
              <ul className={styles.detailList} aria-label="Key era details">
                {era.details.map((detail, idx) => (
                  <li key={idx} className={styles.detailItem}>
                    <span className={styles.detailBullet} aria-hidden="true">—</span>
                    {detail}
                  </li>
                ))}
              </ul>

              {/* CTA links */}
              <div className={styles.ctaRow}>
                <Link to="/compare" className={styles.ctaLink}>
                  Compare eras <span aria-hidden="true">→</span>
                </Link>
                <Link to="/technology" className={styles.ctaLinkSecondary}>
                  Explore technology <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>

            {/* Right: image */}
            <div className={styles.eraPanelImage}>
              <figure className={styles.imageWrapper}>
                <FallbackImage
                  src={era.imageUrl}
                  alt={era.imageAlt}
                  eraTitle={era.title}
                  eraColor={era.accentColor}
                  className={styles.eraImage}
                />
                {era.imageCredit && (
                  <figcaption className={styles.imageCredit}>
                    {era.imageCredit}
                  </figcaption>
                )}
              </figure>
            </div>
          </motion.article>
        </AnimatePresence>
      </section>

      {/* Navigation Arrows */}
      <nav className={styles.arrowNav} aria-label="Era navigation">
        <button
          className={styles.arrowBtn}
          onClick={goPrev}
          disabled={!prev}
          aria-label={prev ? `Previous era: ${prev.years} — ${prev.title}` : 'No previous era'}
        >
          <span aria-hidden="true">←</span>
          {prev && <span className={styles.arrowLabel}>{prev.years}</span>}
        </button>

        <span
          className={styles.eraCounter}
          aria-label={`Era ${activeIndex + 1} of ${ERAS.length}`}
          aria-live="polite"
        >
          {String(activeIndex + 1).padStart(2, '0')}
          <span className={styles.eraCounterSep} aria-hidden="true"> / </span>
          {String(ERAS.length).padStart(2, '0')}
        </span>

        <button
          className={styles.arrowBtn}
          onClick={goNext}
          disabled={!next}
          aria-label={next ? `Next era: ${next.years} — ${next.title}` : 'No next era'}
        >
          {next && <span className={styles.arrowLabel}>{next.years}</span>}
          <span aria-hidden="true">→</span>
        </button>
      </nav>
    </motion.main>
  );
}
