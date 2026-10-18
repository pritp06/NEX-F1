import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CAR_PARTS, TECH_TOPICS } from '../../data/technology';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useIntersection } from '../../hooks/useIntersection';
import styles from './Technology.module.css';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

// ── Aero SVG Diagram ──────────────────────────────────────────
function AeroDiagram() {
  const [highlight, setHighlight] = useState<string | null>(null);
  const isH = (id: string) => highlight === id;

  const zones = [
    { id: 'front-wing', label: 'Front Wing', desc: 'Generates downforce and manages airflow to the undertray and sidepods. Multiple elements tune the balance between downforce and drag.' },
    { id: 'diffuser', label: 'Diffuser', desc: 'Expands airflow from high-velocity under-car flow to ambient pressure. Creates the low-pressure zone that pulls the car toward the track.' },
    { id: 'rear-wing', label: 'Rear Wing', desc: 'Generates downforce at the rear axle. Higher angle = more downforce, more drag. DRS opens the flap to reduce drag on straights.' },
    { id: 'floor', label: 'Venturi Floor', desc: 'In ground-effect cars, the shaped floor accelerates airflow and creates a large low-pressure zone beneath the entire car \u2014 the dominant downforce source.' },
    { id: 'sidepod', label: 'Sidepods', desc: 'House the radiators and manage airflow to the underfloor and rear diffuser. Shape changed dramatically from 2022 as teams optimised ground-effect flow.' },
  ];

  return (
    <div className={styles.aeroDiagramWrap}>
      <svg viewBox="0 0 560 220" className={styles.aeroSvg} aria-label="F1 aerodynamics educational diagram">
        {/* Defs */}
        <defs>
          <marker id="arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
            <path d="M 0 0 L 8 4 L 0 8 Z" fill="#a93428" opacity="1"/>
          </marker>
          <marker id="arrowBlue" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
            <path d="M 0 0 L 8 4 L 0 8 Z" fill="#3f5518" opacity="0.5"/>
          </marker>
        </defs>

        {/* Ground */}
        <line x1="0" y1="185" x2="560" y2="185" stroke="#66716b" strokeWidth="1.5"/>
        <text x="8" y="198" fontSize="8" fill="#414946" fontFamily="Arial,sans-serif">Track surface</text>

        {/* Car body */}
        <path d="M 80 135 L 120 110 L 200 105 L 330 100 L 390 108 L 420 120 L 420 155 L 330 158 L 200 158 L 120 155 Z"
          fill="#141e22" stroke="#66716b" strokeWidth="1.5"/>
        {/* Cockpit */}
        <path d="M 255 100 L 275 82 L 320 80 L 340 100" fill="#202a2f" stroke="#66716b" strokeWidth="1"/>
        {/* Halo */}
        <path d="M 260 98 Q 297 74 334 88" fill="none" stroke="#c1cbca" strokeWidth="2.5" strokeLinecap="round"/>

        {/* Front wing */}
        <g
          style={{ cursor: 'pointer' }}
          onClick={() => setHighlight(highlight === 'front-wing' ? null : 'front-wing')}
        >
          <rect x="28" y="150" width="65" height="7" rx="1"
            fill={isH('front-wing') ? 'rgba(201,255,47,0.2)' : 'rgba(20,30,34,0.8)'}
            stroke={isH('front-wing') ? '#a93428' : '#66716b'} strokeWidth="1.5"/>
          <rect x="35" y="157" width="52" height="4" rx="1"
            fill={isH('front-wing') ? 'rgba(201,255,47,0.15)' : '#141e22'}
            stroke={isH('front-wing') ? '#a93428' : '#66716b'} strokeWidth="1"/>
          <text x="60" y="175" textAnchor="middle" fontSize="9" fill={isH('front-wing') ? '#3f5518' : '#414946'} fontFamily="Arial,sans-serif" fontWeight="600">Front Wing</text>
        </g>

        {/* Rear wing */}
        <g
          style={{ cursor: 'pointer' }}
          onClick={() => setHighlight(highlight === 'rear-wing' ? null : 'rear-wing')}
        >
          <rect x="440" y="72" width="70" height="10" rx="1"
            fill={isH('rear-wing') ? 'rgba(201,255,47,0.2)' : 'rgba(20,30,34,0.8)'}
            stroke={isH('rear-wing') ? '#a93428' : '#66716b'} strokeWidth="1.5"/>
          <rect x="450" y="82" width="50" height="5" rx="1"
            fill={isH('rear-wing') ? 'rgba(201,255,47,0.1)' : '#141e22'}
            stroke={isH('rear-wing') ? '#a93428' : '#66716b'} strokeWidth="1"/>
          <line x1="475" y1="87" x2="475" y2="115" stroke="#66716b" strokeWidth="1"/>
          <text x="475" y="62" textAnchor="middle" fontSize="9" fill={isH('rear-wing') ? '#3f5518' : '#414946'} fontFamily="Arial,sans-serif" fontWeight="600">Rear Wing</text>
        </g>

        {/* Venturi floor */}
        <g
          style={{ cursor: 'pointer' }}
          onClick={() => setHighlight(highlight === 'floor' ? null : 'floor')}
        >
          <path d="M 130 155 L 400 155 L 415 165 L 115 165 Z"
            fill={isH('floor') ? 'rgba(201,255,47,0.18)' : 'rgba(20,30,34,0.6)'}
            stroke={isH('floor') ? '#a93428' : '#66716b'} strokeWidth="1.5"/>
          <text x="270" y="176" textAnchor="middle" fontSize="9" fill={isH('floor') ? '#3f5518' : '#414946'} fontFamily="Arial,sans-serif" fontWeight="600">Venturi Floor</text>
        </g>

        {/* Diffuser */}
        <g
          style={{ cursor: 'pointer' }}
          onClick={() => setHighlight(highlight === 'diffuser' ? null : 'diffuser')}
        >
          <path d="M 400 155 L 445 148 L 445 166 L 400 165 Z"
            fill={isH('diffuser') ? 'rgba(201,255,47,0.2)' : 'rgba(20,30,34,0.6)'}
            stroke={isH('diffuser') ? '#a93428' : '#66716b'} strokeWidth="1.5"/>
          <text x="430" y="140" textAnchor="middle" fontSize="9" fill={isH('diffuser') ? '#3f5518' : '#414946'} fontFamily="Arial,sans-serif" fontWeight="600">Diffuser</text>
        </g>

        {/* Sidepods */}
        <g
          style={{ cursor: 'pointer' }}
          onClick={() => setHighlight(highlight === 'sidepod' ? null : 'sidepod')}
        >
          <path d="M 200 105 L 330 100 L 330 155 L 200 158 Z"
            fill={isH('sidepod') ? 'rgba(201,255,47,0.12)' : 'rgba(255,255,255,0.02)'}
            stroke={isH('sidepod') ? '#a93428' : 'transparent'} strokeWidth="1.5"/>
          <text x="265" y="92" textAnchor="middle" fontSize="9" fill={isH('sidepod') ? '#3f5518' : '#414946'} fontFamily="Arial,sans-serif" fontWeight="600">Sidepods</text>
        </g>

        {/* Airflow arrows */}
        {/* Incoming flow */}
        <line x1="8" y1="130" x2="28" y2="130" stroke="#a93428" strokeWidth="1.5" opacity="0.8" markerEnd="url(#arrow)"/>
        <line x1="8" y1="155" x2="28" y2="155" stroke="#a93428" strokeWidth="1.5" opacity="0.8" markerEnd="url(#arrow)"/>
        {/* Under car flow */}
        <path d="M 130 170 Q 270 172 400 168" fill="none" stroke="#3f5518" strokeWidth="1.5" opacity="0.65" markerEnd="url(#arrowBlue)" strokeDasharray="4,3"/>
        {/* Over car flow */}
        <path d="M 120 95 Q 270 75 420 90" fill="none" stroke="#3f5518" strokeWidth="1.5" opacity="0.55" markerEnd="url(#arrowBlue)" strokeDasharray="4,3"/>
        {/* Downforce arrow */}
        <line x1="270" y1="60" x2="270" y2="92" stroke="#a93428" strokeWidth="1.5" opacity="0.6" markerEnd="url(#arrow)"/>
        <text x="278" y="76" fontSize="7" fill="#a93428" fontFamily="Arial,sans-serif" opacity="0.7">Downforce</text>

        {/* Label: educational */}
        <text x="280" y="213" textAnchor="middle" fontSize="7.5" fill="#414946" fontFamily="Arial,sans-serif" fontStyle="italic">Simplified educational diagram — not a validated aerodynamic simulation</text>
      </svg>

      {/* Detail panel */}
      {highlight && (
        <motion.div
          key={highlight}
          className={styles.aeroPanel}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <span className={styles.aeroPanelLabel}>
            {zones.find(z => z.id === highlight)?.label}
          </span>
          <p className={styles.aeroPanelDesc}>
            {zones.find(z => z.id === highlight)?.desc}
          </p>
        </motion.div>
      )}

      {!highlight && (
        <p className={styles.aeroHint}>Click any component to learn about its aerodynamic role</p>
      )}

      {/* Zone buttons for accessibility */}
      <div className={styles.aeroZones}>
        {zones.map(z => (
          <button
            key={z.id}
            className={`${styles.aeroZoneBtn} ${highlight === z.id ? styles.aeroZoneBtnActive : ''}`}
            onClick={() => setHighlight(highlight === z.id ? null : z.id)}
          >
            {z.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Tech Topic Timeline ───────────────────────────────────────
function TechTimeline({ topicId }: { topicId: string }) {
  const topic = TECH_TOPICS.find(t => t.id === topicId);
  if (!topic) return null;

  return (
    <div className={styles.techTimeline}>
      {topic.points.map((pt, i) => (
        <div key={i} className={styles.techPoint}>
          <div className={styles.techPointDot} />
          <div className={styles.techPointContent}>
            <span className={styles.techPointYear}>{pt.year}</span>
            <p className={styles.techPointDetail}>{pt.detail}</p>
          </div>
          {i < topic.points.length - 1 && <div className={styles.techPointLine} />}
        </div>
      ))}
    </div>
  );
}

// ── Technology Page ───────────────────────────────────────────
export function Technology() {
  const prefersReduced = useReducedMotion();
  const [activeTopic, setActiveTopic] = useState('aero-evolution');
  const [ref1, vis1] = useIntersection<HTMLElement>({ threshold: 0.05 });
  const [ref2, vis2] = useIntersection<HTMLElement>({ threshold: 0.05 });

  const topicLabels: Record<string, string> = {
    'aero-evolution': 'Aerodynamics',
    'engine-evolution': 'Power Units',
    'safety-evolution': 'Safety',
    'chassis-evolution': 'Chassis',
    'tyres-evolution': 'Tyres & Wheels',
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={styles.page}
    >
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <motion.p
            className={styles.label}
            initial={prefersReduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Engineering Explained
          </motion.p>
          <motion.h1
            className={styles.heading}
            initial={prefersReduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Technology
          </motion.h1>
          <motion.p
            className={styles.subheading}
            initial={prefersReduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            The engineering concepts that shaped Formula 1 car design
          </motion.p>
        </div>
      </header>

      {/* Section 1: Aerodynamics */}
      <section className={styles.section} ref={ref1 as React.RefObject<HTMLElement>} aria-labelledby="aero-heading">
        <div className={styles.sectionInner}>
          <motion.div
            variants={fadeUp}
            initial={prefersReduced ? 'visible' : 'hidden'}
            animate={vis1 ? 'visible' : 'hidden'}
          >
            <p className={styles.sectionLabel}>Section 01</p>
            <h2 className={styles.sectionHeading} id="aero-heading">Aerodynamics</h2>
            <p className={styles.sectionIntro}>
              An F1 car's aerodynamic package generates downforce — vertical force pressing
              the car into the track — while managing drag. The balance between these forces
              defines performance. Click the diagram components below to explore each zone.
            </p>
          </motion.div>
          <AeroDiagram />
        </div>
      </section>

      <div className={styles.divider} />

      {/* Section 2: Topic Timelines */}
      <section className={styles.section} ref={ref2 as React.RefObject<HTMLElement>} aria-labelledby="topics-heading">
        <div className={styles.sectionInner}>
          <motion.div
            variants={fadeUp}
            initial={prefersReduced ? 'visible' : 'hidden'}
            animate={vis2 ? 'visible' : 'hidden'}
          >
            <p className={styles.sectionLabel}>Section 02</p>
            <h2 className={styles.sectionHeading} id="topics-heading">Evolution by discipline</h2>
          </motion.div>

          <div className={styles.topicLayout}>
            {/* Topic nav */}
            <nav className={styles.topicNav} aria-label="Technology topics">
              {Object.entries(topicLabels).map(([id, label]) => (
                <button
                  key={id}
                  className={`${styles.topicBtn} ${activeTopic === id ? styles.topicBtnActive : ''}`}
                  onClick={() => setActiveTopic(id)}
                  aria-pressed={activeTopic === id}
                >
                  {label}
                </button>
              ))}
            </nav>

            {/* Timeline */}
            <div className={styles.topicContent}>
              {TECH_TOPICS.filter(t => t.id === activeTopic).map(topic => (
                <motion.div
                  key={topic.id}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h3 className={styles.topicTitle}>{topic.title}</h3>
                  <p className={styles.topicSummary}>{topic.summary}</p>
                  <TechTimeline topicId={topic.id} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Car parts reference */}
      <section className={styles.partsSection} aria-labelledby="parts-heading">
        <div className={styles.sectionInner}>
          <p className={styles.sectionLabel}>Section 03</p>
          <h2 className={styles.sectionHeading} id="parts-heading">Key components</h2>
          <div className={styles.partsGrid}>
            {CAR_PARTS.map(part => (
              <div key={part.id} className={styles.partCard}>
                <h3 className={styles.partCardTitle}>{part.label}</h3>
                <p className={styles.partCardDesc}>{part.description}</p>
                <div className={styles.partCardNote}>
                  <span className={styles.partCardNoteLabel}>Technical note</span>
                  <p className={styles.partCardNoteText}>{part.technicalNote}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-link */}
      <div className={styles.crossLinks}>
        <div className={styles.sectionInner}>
          <div className={styles.crossLinksRow}>
            <Link to="/evolution" className={styles.crossLink}>
              <span className={styles.crossLinkLabel}>Historical journey</span>
              <span className={styles.crossLinkTitle}>Explore the evolution →</span>
            </Link>
            <Link to="/compare" className={styles.crossLink}>
              <span className={styles.crossLinkLabel}>Side by side</span>
              <span className={styles.crossLinkTitle}>Compare the cars →</span>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
