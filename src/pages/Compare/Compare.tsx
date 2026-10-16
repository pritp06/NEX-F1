import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { COMPARISON_CARS, COMPARISON_DIMENSIONS } from '../../data/comparisons';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import styles from './Compare.module.css';

// ── Defaults ───────────────────────────────────────────────────

const DEFAULT_LEFT  = 'alfa-158';
const DEFAULT_RIGHT = 'red-bull-rb19';

// ── Animation variants ─────────────────────────────────────────

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  exit:    { opacity: 0, transition: { duration: 0.25 } },
};

const cardVariants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

const cardVariantsReduced = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3 } },
};

// ── FallbackImage ──────────────────────────────────────────────

function FallbackImage({
  src,
  alt,
  carName,
  carColor,
  className,
}: {
  src: string;
  alt: string;
  carName: string;
  carColor: string;
  className?: string;
}) {
  const [errored, setErrored] = useState(false);

  if (errored || !src) {
    return (
      <div
        className={`${styles.imageFallback} ${className ?? ''}`}
        style={{
          background: `linear-gradient(135deg, var(--surface-2) 0%, ${carColor}50 100%)`,
          borderTop: `3px solid ${carColor}`,
        }}
        role="img"
        aria-label={`${carName} — illustrative placeholder; no matching car photograph available.`}
      >
        <span className={styles.imageFallbackIcon} aria-hidden="true">◉</span>
        <span className={styles.imageFallbackText}>{carName}</span>
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

// ── CarSelector ────────────────────────────────────────────────

function CarSelector({
  id,
  label,
  selectedId,
  disabledId,
  onChange,
}: {
  id: string;
  label: string;
  selectedId: string;
  disabledId: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className={styles.selectorWrapper}>
      <label htmlFor={id} className={styles.selectorLabel}>
        {label}
      </label>
      <div className={styles.selectWrap}>
        <select
          id={id}
          className={styles.select}
          value={selectedId}
          onChange={(e) => onChange(e.target.value)}
          aria-label={`Select ${label.toLowerCase()} car`}
        >
          {COMPARISON_CARS.map((car) => (
            <option
              key={car.id}
              value={car.id}
              disabled={car.id === disabledId}
            >
              {car.name} ({car.years})
            </option>
          ))}
        </select>
        <span className={styles.selectChevron} aria-hidden="true">▾</span>
      </div>
    </div>
  );
}

// ── Compare ────────────────────────────────────────────────────

export function Compare() {
  const reducedMotion = useReducedMotion();
  const [leftId,  setLeftId]  = useState(DEFAULT_LEFT);
  const [rightId, setRightId] = useState(DEFAULT_RIGHT);

  const leftCar  = COMPARISON_CARS.find((c) => c.id === leftId)!;
  const rightCar = COMPARISON_CARS.find((c) => c.id === rightId)!;

  const isSame = leftId === rightId;

  const handleReset = useCallback(() => {
    setLeftId(DEFAULT_LEFT);
    setRightId(DEFAULT_RIGHT);
  }, []);

  const cv = reducedMotion ? cardVariantsReduced : cardVariants;

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
          <p className={styles.headerEyebrow}>NEX — F1 Comparison</p>
          <h1 className={styles.pageTitle}>Generation Comparison</h1>
          <p className={styles.pageSubtitle}>
            Select two cars from different eras and compare their specifications
          </p>
        </div>
      </header>

      {/* Selectors row */}
      <section className={styles.selectorsSection} aria-label="Car selection">
        <div className={styles.selectorsInner}>
          <CarSelector
            id="left-car-select"
            label="Car A"
            selectedId={leftId}
            disabledId={rightId}
            onChange={setLeftId}
          />

          <div className={styles.vsChip} aria-hidden="true">VS</div>

          <CarSelector
            id="right-car-select"
            label="Car B"
            selectedId={rightId}
            disabledId={leftId}
            onChange={setRightId}
          />

          <button
            className={styles.resetBtn}
            onClick={handleReset}
            aria-label="Reset to default comparison"
            title="Reset to defaults"
          >
            ↺ Reset
          </button>
        </div>
      </section>

      {/* Same car warning */}
      {isSame && (
        <div className={styles.warningBanner} role="alert" aria-live="polite">
          <span className={styles.warningIcon} aria-hidden="true">⚠</span>
          Select two different cars to compare
        </div>
      )}

      {!isSame && (
        <>
          {/* Car cards */}
          <section className={styles.carsSection} aria-label="Selected cars">
            <div className={styles.carsGrid}>
              {/* Left car */}
              <motion.div
                key={leftCar.id}
                className={styles.carCard}
                style={{ '--car-color': leftCar.color } as React.CSSProperties}
                variants={cv}
                initial="initial"
                animate="animate"
              >
                <div className={styles.carCardAccent} style={{ background: leftCar.color }} />
                <div className={styles.carImageWrapper}>
                  <FallbackImage
                    src={leftCar.imageUrl}
                    alt={leftCar.imageAlt}
                    carName={leftCar.name}
                    carColor={leftCar.color}
                    className={styles.carImage}
                  />
                  {leftCar.imageCredit && (
                    <span className={styles.carImageCredit}>{leftCar.imageCredit}</span>
                  )}
                </div>
                <div className={styles.carCardBody}>
                  <span className={styles.carYears}>{leftCar.years}</span>
                  <h2 className={styles.carName}>{leftCar.name}</h2>
                </div>
              </motion.div>

              {/* Right car */}
              <motion.div
                key={rightCar.id}
                className={styles.carCard}
                style={{ '--car-color': rightCar.color } as React.CSSProperties}
                variants={cv}
                initial="initial"
                animate="animate"
              >
                <div className={styles.carCardAccent} style={{ background: rightCar.color }} />
                <div className={styles.carImageWrapper}>
                  <FallbackImage
                    src={rightCar.imageUrl}
                    alt={rightCar.imageAlt}
                    carName={rightCar.name}
                    carColor={rightCar.color}
                    className={styles.carImage}
                  />
                  {rightCar.imageCredit && (
                    <span className={styles.carImageCredit}>{rightCar.imageCredit}</span>
                  )}
                </div>
                <div className={styles.carCardBody}>
                  <span className={styles.carYears}>{rightCar.years}</span>
                  <h2 className={styles.carName}>{rightCar.name}</h2>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Comparison table */}
          <section className={styles.tableSection} aria-label="Specification comparison table">
            <div className={styles.tableWrapper}>
              <table className={styles.compTable} aria-label={`Comparison: ${leftCar.name} vs ${rightCar.name}`}>
                <thead>
                  <tr>
                    <th scope="col" className={styles.thDimension}>Specification</th>
                    <th scope="col" className={styles.thCar}>
                      <span className={styles.thColorDot} style={{ background: leftCar.color }} aria-hidden="true" />
                      {leftCar.name}
                      <span className={styles.thYears}>{leftCar.years}</span>
                    </th>
                    <th scope="col" className={styles.thCar}>
                      <span className={styles.thColorDot} style={{ background: rightCar.color }} aria-hidden="true" />
                      {rightCar.name}
                      <span className={styles.thYears}>{rightCar.years}</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_DIMENSIONS.map((dim, idx) => (
                    <tr
                      key={dim.key}
                      className={idx % 2 === 0 ? styles.trEven : styles.trOdd}
                    >
                      <th scope="row" className={styles.tdDimension}>{dim.label}</th>
                      <td className={styles.tdValue}>
                        {leftCar[dim.key as keyof typeof leftCar] as string}
                      </td>
                      <td className={styles.tdValue}>
                        {rightCar[dim.key as keyof typeof rightCar] as string}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Disclaimer */}
            <p className={styles.disclaimer}>
              Specifications shown are representative values where verified. Direct numerical
              comparison may not be possible across eras due to different measurement conditions.
            </p>
          </section>

          {/* Key facts */}
          <section className={styles.factsSection} aria-label="Key facts">
            <div className={styles.factsGrid}>
              <div className={styles.factsCard}>
                <h3 className={styles.factsHeading}>
                  <span className={styles.factsColorDot} style={{ background: leftCar.color }} aria-hidden="true" />
                  {leftCar.name}
                </h3>
                <ul className={styles.factsList}>
                  {leftCar.facts.map((fact, i) => (
                    <li key={i} className={styles.factsItem}>
                      <span className={styles.factsBullet} aria-hidden="true">—</span>
                      {fact}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.factsCard}>
                <h3 className={styles.factsHeading}>
                  <span className={styles.factsColorDot} style={{ background: rightCar.color }} aria-hidden="true" />
                  {rightCar.name}
                </h3>
                <ul className={styles.factsList}>
                  {rightCar.facts.map((fact, i) => (
                    <li key={i} className={styles.factsItem}>
                      <span className={styles.factsBullet} aria-hidden="true">—</span>
                      {fact}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </>
      )}
    </motion.main>
  );
}
