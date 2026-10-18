import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useIntersection } from '../../hooks/useIntersection';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import './Home.css';

const CarScene = lazy(() => import('../../components/CarScene/CarScene').then((module) => ({ default: module.CarScene })));

const moments = [
  { year: 1950, name: 'The beginning', tag: 'A simpler silhouette', copy: 'Before wings and carbon fibre, the racing car was a long nose, a steel frame and a driver out in the open.', image: '/images/f1-1952-ferrari-500.jpg', alt: 'Ferrari 500, a front-engined Grand Prix car from the early championship years', color: '#76612b' },
  { year: 1962, name: 'The monocoque', tag: 'One shell changes everything', copy: 'Lotus made the body do structural work. A lighter, stiffer shell changed how a racing car could be built.', image: '/images/f1-1962-lotus-25.jpg', alt: 'Lotus 25, the aluminium monocoque design associated with the 1962 season', color: '#506311' },
  { year: 1978, name: 'The floor becomes a wing', tag: 'Ground effect', copy: 'The underside became an aerodynamic surface. The Lotus 79 turned the track itself into part of the design.', image: '/images/f1-1978-lotus-79.jpg', alt: 'Lotus 79 ground-effect car at speed', color: '#8b5a00' },
  { year: 1988, name: 'Power, compressed', tag: 'The turbo peak', copy: 'Turbocharged 1.5-litre engines pushed the limits of power, packaging and fuel strategy.', image: '/images/f1-1988-mclaren-mp4-4.jpg', alt: 'McLaren MP4/4 from the 1988 turbo era', color: '#a93428' },
  { year: 2022, name: 'Air from underneath', tag: 'Ground effect returns', copy: 'Venturi tunnels returned beneath the floor, with regulations designed to reduce the aerodynamic wake.', image: '/images/f1-2022-red-bull-rb18.jpg', alt: 'Red Bull RB18, representative of the 2022 ground-effect generation', color: '#315d70' },
];

const components = [
  { id: 'aero', label: 'AERODYNAMICS', title: 'Make the air work.', copy: 'Wings and the floor trade drag for downforce: the force that presses tyres into the circuit.', mark: '01' },
  { id: 'power', label: 'POWER UNIT', title: 'Energy, reclaimed.', copy: 'Today’s hybrid power unit combines a turbocharged V6 with electrical energy recovery and deployment.', mark: '02' },
  { id: 'safety', label: 'SURVIVAL CELL', title: 'Speed needs a shell.', copy: 'The carbon-fibre monocoque surrounds the driver. The halo adds another barrier above the cockpit.', mark: '03' },
];

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const [ref, visible] = useIntersection<HTMLDivElement>({ rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  return <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} ${className}`} style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}>{children}</div>;
}

export function Home() {
  const [activeMoment, setActiveMoment] = useState(2);
  const [activePart, setActivePart] = useState(components[0]);
  const progressRef = useRef<HTMLSpanElement>(null);
  const [modelRef, modelVisible] = useIntersection<HTMLDivElement>({ threshold: 0, rootMargin: '160px 0px 160px 0px', once: false });
  const reducedMotion = useReducedMotion();
  const moment = moments[activeMoment];

  useEffect(() => {
    const progress = progressRef.current;
    if (!progress) return;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, []);

  return (
    <div className="home-redesign">
      <div className="scroll-progress" aria-hidden="true"><span ref={progressRef} /></div>
      <section className="speed-hero" aria-labelledby="hero-title">
        <div className="hero-texture" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow"><span className="live-dot" /> THE NEX MOTORSPORT ARCHIVE <span className="eyebrow-line" /> 1950—2026</p>
          <p className="hero-overline"><span>FORMULA 1 / DESIGN STUDY</span><span>01 — 05</span></p>
          <h1 id="hero-title">Racing<br /><em>rewritten.</em></h1>
          <p className="hero-deck">Seventy-six years. One evolving machine.<br />A visual journey through the ideas that changed speed.</p>
          <div className="hero-actions"><Link to="/evolution" className="action-primary">Start the journey <span aria-hidden="true">↗</span></Link><Link to="/compare" className="action-quiet"><span aria-hidden="true">⇄</span> Compare eras</Link></div>
          <div className="hero-nudge"><span className="nudge-line" /><span>SCROLL TO ENTER THE STORY</span><span aria-hidden="true">↓</span></div>
        </div>

        <div ref={modelRef} className="hero-machine" aria-label="Interactive 3D concept Formula 1 car">
          <div className="machine-orbit orbit-one" aria-hidden="true" /><div className="machine-orbit orbit-two" aria-hidden="true" />
          <div className="machine-coordinate" aria-hidden="true">NEX / CFD—01<br />46° 31′ 12″ N</div>
          <div className="machine-year" aria-hidden="true">76</div>
          {modelVisible ? <Suspense fallback={<img className="machine-fallback" src={moment.image} alt="" />}>{!reducedMotion && <CarScene year={2026} autoRotate />}{reducedMotion && <CarScene year={2026} autoRotate={false} />}</Suspense> : <img className="machine-fallback" src={moment.image} alt="" />}
          <div className="machine-caption"><span>NX—01 / CONCEPT MACHINE</span><span>DRAG TO ORBIT</span></div>
          <span className="machine-spec spec-front">01 / AERO</span><span className="machine-spec spec-rear">02 / HYBRID</span>
          <div className="hero-color-swipe" aria-hidden="true" />
        </div>

        <div className="hero-bottomline"><span>ENGINEERING IN MOTION</span><span>1950 <i /> 2026</span><span>SCROLL 01 / 04</span></div>
      </section>

      <section className="chapter-section" aria-labelledby="chapter-title">
        <Reveal className="chapter-heading-wrap"><div className="chapter-heading"><p className="eyebrow"><span>01</span> / THE SHAPE OF SPEED</p><h2 id="chapter-title">A new answer.<br /><em>Every generation.</em></h2><p className="chapter-intro">Pick a moment. Watch the machine change. Follow the idea that changed it.</p></div></Reveal>
        <div className="chapter-feature" key={moment.year} style={{ '--chapter-color': moment.color } as React.CSSProperties}>
          <div className="chapter-image"><img src={moment.image} alt={moment.alt} loading="lazy" decoding="async" /><div className="chapter-image-shade" /><span className="chapter-tag">{moment.year} / {moment.tag}</span><span className="chapter-giant-year" aria-hidden="true">{moment.year}</span></div>
          <div className="chapter-copy"><p className="eyebrow">A DESIGN TURNING POINT <span className="eyebrow-line" /> {String(activeMoment + 1).padStart(2, '0')} / 05</p><h3>{moment.name}</h3><p>{moment.copy}</p><Link to="/evolution" className="text-link">Enter the full timeline <span>↗</span></Link><div className="chapter-progress"><span style={{ width: `${(activeMoment + 1) * 20}%` }} /></div><div className="chapter-controls"><button type="button" onClick={() => setActiveMoment((activeMoment + moments.length - 1) % moments.length)} aria-label="Previous era">←</button><span>{String(activeMoment + 1).padStart(2, '0')} <i>/</i> 05</span><button type="button" onClick={() => setActiveMoment((activeMoment + 1) % moments.length)} aria-label="Next era">→</button></div></div>
        </div>
        <div className="chapter-selector" role="group" aria-label="Select a Formula 1 history moment">{moments.map((item, index) => <button key={item.year} type="button" className={index === activeMoment ? 'is-active' : ''} aria-pressed={index === activeMoment} onClick={() => setActiveMoment(index)}><span className="selector-year">{item.year}</span><span className="selector-name">{item.tag}</span><span className="selector-mark" aria-hidden="true">↗</span></button>)}</div>
      </section>

      <section className="engineering-section" aria-labelledby="engineering-title">
        <Reveal className="engineering-intro-wrap"><div className="engineering-intro"><p className="eyebrow"><span>02</span> / UNDER THE SKIN</p><h2 id="engineering-title">Speed has<br /><em>a system.</em></h2><p>Every visible curve is connected to an invisible force. Select a system and see the thought behind it.</p><Link to="/technology" className="text-link">Explore the engineering <span>↗</span></Link></div></Reveal>
        <div className="engineering-visual">
          <div className="blueprint-grid" aria-hidden="true" />
          <svg className={`flow-diagram part-${activePart.id}`} viewBox="0 0 800 440" role="img" aria-labelledby="diagram-title diagram-desc">
            <title id="diagram-title">Educational Formula 1 engineering diagram</title><desc id="diagram-desc">A simplified original side profile of a Formula 1 car, with animated airflow lines underneath and above the car.</desc>
            <defs><linearGradient id="carLine" x1="0" x2="1"><stop offset="0" stopColor="#3f5518"/><stop offset="1" stopColor="#a93428"/></linearGradient></defs>
            <path className="flow-line flow-a" d="M20 122 C150 120 200 170 330 166 S570 152 780 166"/><path className="flow-line flow-b" d="M20 202 C142 198 208 214 300 210 S590 208 780 216"/><path className="flow-line flow-c" d="M20 292 C142 278 205 286 310 286 S590 278 780 296"/>
            <path className="car-outline" d="M116 270 L160 260 L235 254 Q270 205 314 202 L362 208 L406 244 L570 252 L637 264 L675 268 L677 280 L614 284 L577 309 L536 310 L513 286 L288 286 L265 316 L225 316 L204 285 L118 282 Z"/>
            <path className="car-detail" d="M272 254 L298 218 L348 220 L385 253 M389 254 L462 256 M467 258 L525 261 M145 273 L207 274 M600 265 L657 269"/>
            <circle className="wheel" cx="246" cy="294" r="34"/><circle className="wheel-inner" cx="246" cy="294" r="12"/><circle className="wheel" cx="554" cy="290" r="34"/><circle className="wheel-inner" cx="554" cy="290" r="12"/>
            <path className="halo" d="M309 215 Q330 175 360 213"/><path className="downforce" d="M410 301 V360 M514 300 V360"/><path className="downforce-arrow" d="M400 349 L410 364 L420 349 M504 349 L514 364 L524 349"/>
            <text className="diagram-label label-aero" x="66" y="95">PRESSURE / FLOW</text><text className="diagram-label label-floor" x="442" y="390">FLOOR LOAD</text><text className="diagram-label" x="600" y="95">CONCEPT / NOT TO SCALE</text>
          </svg>
          <div className="engineering-readout" aria-live="polite"><span>{activePart.mark} / {activePart.label}</span><h3>{activePart.title}</h3><p>{activePart.copy}</p></div>
          <div className="engineering-tabs" role="group" aria-label="Choose an engineering system">{components.map((part) => <button key={part.id} type="button" aria-pressed={activePart.id === part.id} className={activePart.id === part.id ? 'is-active' : ''} onClick={() => setActivePart(part)}><span>{part.mark}</span>{part.label}</button>)}</div>
        </div>
      </section>

      <Reveal className="comparison-break">
        <div className="comparison-visual"><img src="/images/f1-2020-mercedes-w11.jpg" alt="Mercedes W11 on track during the 2020 Formula 1 season" loading="lazy" decoding="async" /><span className="comparison-image-label">2020 / W11</span><span className="comparison-x" aria-hidden="true">×</span></div>
        <div className="comparison-copy"><p className="eyebrow"><span>03</span> / TWO MACHINES, ONE FRAME</p><h2>See what<br />time <em>changes.</em></h2><p>Put two eras side by side. Compare the chassis, the power, the aero and the safety thinking that shaped each one.</p><Link to="/compare" className="action-primary">Build a comparison <span>↗</span></Link></div>
      </Reveal>

      <footer className="home-finale"><div className="finale-noise" aria-hidden="true"/><p className="eyebrow"><span>04</span> / THE NEXT CHAPTER</p><h2>Not a finish.<br /><em>A starting grid.</em></h2><div className="finale-bottom"><span>FORMULA 1 / 1950—2026 / STILL MOVING</span><Link to="/evolution" aria-label="Continue exploring the F1 timeline">↗</Link></div><div className="finale-year" aria-hidden="true">NEX</div></footer>
    </div>
  );
}
