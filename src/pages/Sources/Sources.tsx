import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import styles from './Sources.module.css';

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const pageVariantsReduced = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0 } },
  exit: { opacity: 0, transition: { duration: 0 } },
};

interface Source {
  category: string;
  items: { title: string; url?: string; note: string }[];
}

const SOURCES: Source[] = [
  {
    category: 'Official Regulations & Technical Documents',
    items: [
      {
        title: 'FIA Formula One Technical Regulations (current)',
        url: 'https://www.fia.com/regulation/category/110',
        note: 'All applicable technical regulations governing car design and construction.',
      },
      {
        title: 'FIA Formula One Regulations — current documents',
        url: 'https://www.fia.com/regulation/category/110/technical-regulations',
        note: 'Current technical regulations and amendments. The 2026 package is a living regulation set; consult the latest issue for exact requirements.',
      },
      {
        title: 'FIA 2026 Regulations Hub',
        url: 'https://www.fia.com/F126',
        note: 'Official overview of the 2026 regulation generation and its technical intent.',
      },
      {
        title: 'FIA 2026 regulation amendments',
        url: 'https://www.fia.com/news/fia-statement-amendments-2026-f1-regulations',
        note: 'Subsequent updates to the 2026 regulations; use this alongside the current technical-regulations index.',
      },
      {
        title: 'FIA: 2026 power unit and active aerodynamics overview',
        url: 'https://www.fia.com/news/new-era-competition-fia-showcases-future-focused-formula-1-regulations-2026-and-beyond',
        note: 'Official launch overview of the revised power unit, active aerodynamics and smaller-car targets.',
      },
    ],
  },
  {
    category: 'Official Formula 1 Sources',
    items: [
      {
        title: 'Formula1.com — Official Website',
        url: 'https://www.formula1.com',
        note: 'Official statistics, car technical specifications, and historical records.',
      },
      {
        title: 'Formula1.com — Technical Regulations',
        url: 'https://www.formula1.com/en/latest/article.understanding-the-2022-f1-technical-regulations.html',
        note: 'Used for verification of 2022 regulation changes and ground-effect philosophy.',
      },
    ],
  },
  {
    category: 'Historical & Technical References',
    items: [
      {
        title: 'The Technical History of Formula 1 (Giorgio Piola)',
        note: 'Technical illustrations and historical analysis of car development across decades.',
      },
      {
        title: 'Autocourse Annual',
        note: 'Year-by-year technical reviews providing car specification verification.',
      },
      {
        title: 'Motor Sport Magazine Archive',
        url: 'https://www.motorsportmagazine.com',
        note: 'Contemporary reporting used to verify historical details and engineering changes.',
      },
      {
        title: 'McLaren Automotive — MP4/1 Carbon Fibre History',
        url: 'https://www.mclaren.com',
        note: 'Verification of MP4/1 as the first carbon-fibre monocoque in Formula 1 (1981).',
      },
    ],
  },
  {
    category: 'Image Sources',
    items: [
      {
        title: 'Wikimedia Commons',
        url: 'https://commons.wikimedia.org',
        note: 'Primary source for historical F1 photography. Each image is used under its respective Creative Commons or public domain licence. Attribution appears on the Sources page and is available via each image\'s Wikimedia page.',
      },
    ],
  },
  {
    category: 'Image Attributions',
    items: [
      { title: 'Formula one.jpg — 2003 United States Grand Prix', url: 'https://commons.wikimedia.org/wiki/File:Formula_one.jpg', note: 'Photo by Rick Dikeman. Wikimedia Commons. CC BY-SA 3.0 and GFDL 1.2 or later. Used as a crop in the hero; no endorsement implied.' },
      { title: 'Alberto Ascari’s Ferrari 500 (1952)', url: 'https://commons.wikimedia.org/wiki/File:Alberto_Ascari%27s_1952_Ferrari_500_F1_car_(14664990902).jpg', note: 'Photo by Ben Sutherland. Wikimedia Commons. CC BY 2.0.' },
      { title: 'Cooper-Climax T51 (Goodwood, 2009)', url: 'https://commons.wikimedia.org/wiki/File:1959_Cooper_Climax_T51_Goodwood,_2009_(01).jpg', note: 'Photo by Bahnfrend. Wikimedia Commons. CC BY-SA 4.0.' },
      { title: 'Lotus 25 (Silverstone, 2013)', url: 'https://commons.wikimedia.org/wiki/File:1963_Lotus_25_R4_(54833107267).jpg', note: 'Photo by David Merrett. Wikimedia Commons. CC BY 4.0.' },
      { title: 'Lotus 79 (Goodwood, 2014)', url: 'https://commons.wikimedia.org/wiki/File:Lotus_79_at_Goodwood_2014_001.jpg', note: 'Photo by Nic Redhead. Wikimedia Commons. CC BY-SA 2.0.' },
      { title: 'McLaren MP4/4 (Goodwood, 2009)', url: 'https://commons.wikimedia.org/wiki/File:1988_McLaren-Honda_MP4_4_Goodwood,_2009_(01).jpg', note: 'Photo by Bahnfrend. Wikimedia Commons. CC BY-SA 4.0.' },
      { title: 'Williams FW14B', url: 'https://commons.wikimedia.org/wiki/File:Williams_FW14B.jpg', note: 'Photo by Mikelo. Wikimedia Commons. CC BY-SA 2.0.' },
      { title: 'Brawn GP BGP001 (Goodwood, 2009)', url: 'https://commons.wikimedia.org/wiki/File:2009_Brawn_BGP_001_Goodwood,_2009_(01).jpg', note: 'Photo by Bahnfrend. Wikimedia Commons. CC BY-SA 4.0.' },
      { title: 'Red Bull RB8 (2012)', url: 'https://commons.wikimedia.org/wiki/File:2012_Red_Bull_Racing_RB8_(14387073158).jpg', note: 'Photo by big-ashb. Wikimedia Commons. CC BY 2.0.' },
      { title: 'Mercedes W11 (Barcelona tests, 2020)', url: 'https://commons.wikimedia.org/wiki/File:2020_Formula_One_tests_Barcelona,_Mercedes-AMG_F1_W11_EQ_Performance,_Hamilton.jpg', note: 'Photo by Artes Max. Wikimedia Commons. CC BY-SA 2.0.' },
      { title: 'Red Bull RB18 (2022)', url: 'https://commons.wikimedia.org/wiki/File:2022_Red_Bull_RB18_(54833962761).jpg', note: 'Photo by David Merrett. Wikimedia Commons. CC BY 4.0.' },
      { title: 'NEX educational 2026 concept diagram', note: 'Original NEX vector illustration. Generic and not to scale; it does not depict a specific 2026 car.' },
    ],
  },
  {
    category: 'Content Disclaimer',
    items: [
      {
        title: 'Historical Accuracy Statement',
        note: 'NEX content is intended for educational and historical purposes. All technical specifications are presented as representative or approximate values where verified. Some historical records contain conflicting figures; where this applies, a range or general description is provided. Car dimensions, power outputs, and lap times from different eras are not directly comparable due to varying measurement conditions. Illustrative SVG diagrams are educational simplifications and do not represent validated engineering simulations.',
      },
      {
        title: 'Image Use',
        note: 'All images on NEX are used under their respective Creative Commons licences or are in the public domain. Licence terms are documented in this page. NEX does not claim ownership of any third-party photographic content.',
      },
    ],
  },
];

export function Sources() {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      variants={reducedMotion ? pageVariantsReduced : pageVariants}
      initial={reducedMotion ? false : 'initial'}
      animate="animate"
      exit="exit"
      className={styles.page}
    >
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.inner}>
          <p className={styles.label}>References & Credits</p>
          <h1 className={styles.heading}>Sources</h1>
          <p className={styles.subheading}>
            Historical references, official documents, image credits,
            and attribution required for content published on NEX.
          </p>
        </div>
      </header>

      {/* Sources list */}
      <div className={styles.content}>
        <div className={styles.inner}>
          {SOURCES.map(source => (
            <section key={source.category} className={styles.sourceSection} aria-labelledby={`src-${source.category}`}>
              <h2 className={styles.categoryHeading} id={`src-${source.category}`}>
                {source.category}
              </h2>
              <ul className={styles.itemList} role="list">
                {source.items.map(item => (
                  <li key={item.title} className={styles.item}>
                    <div className={styles.itemHeader}>
                      {item.url ? (
                        <a
                          href={item.url}
                          className={styles.itemTitle}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.title} ↗
                        </a>
                      ) : (
                        <span className={styles.itemTitle}>{item.title}</span>
                      )}
                    </div>
                    <p className={styles.itemNote}>{item.note}</p>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
