// NEX — Technology Data
// Engineering concepts for the technology page.

export interface TechTopic {
  id: string;
  title: string;
  category: 'aero' | 'engine' | 'chassis' | 'safety' | 'tyres';
  summary: string;
  points: { year: string; detail: string }[];
}

export interface CarPart {
  id: string;
  label: string;
  description: string;
  technicalNote: string;
  position: { x: number; y: number }; // percentage of SVG viewBox
}

export const CAR_PARTS: CarPart[] = [
  {
    id: 'front-wing',
    label: 'Front Wing',
    description:
      'The front wing is the car\'s first aerodynamic interaction with airflow. It generates downforce to load the front tyres and manages airflow to downstream components. Modern multi-element front wings are among the most complex parts on the car.',
    technicalNote:
      'Regulations govern the permitted number of elements, span, and height. The 2022 regulations simplified the front wing significantly to reduce wake sensitivity.',
    position: { x: 10, y: 52 },
  },
  {
    id: 'rear-wing',
    label: 'Rear Wing',
    description:
      'The rear wing generates the majority of the car\'s aerodynamic downforce at the rear axle, balancing the front wing\'s contribution. DRS (Drag Reduction System, 2011–2025) allowed the upper flap to open on straights, reducing drag.',
    technicalNote:
      'From 2026, movable front and rear wings use low-drag straight mode and high-downforce corner mode. This replaces DRS and supports energy management; overtaking assistance is handled separately.',
    position: { x: 88, y: 38 },
  },
  {
    id: 'tyres',
    label: 'Tyres',
    description:
      'The only contact point between car and circuit. Tyre compound and thermal management dictate race strategy. Pirelli supplies five compounds for dry conditions, and two for wet/intermediate conditions.',
    technicalNote:
      '2022 regulations introduced 18-inch low-profile tyres (replacing the 13-inch rims used since 1993), reducing thermal sensitivity and improving mechanical feedback.',
    position: { x: 22, y: 75 },
  },
  {
    id: 'cockpit',
    label: 'Cockpit & Halo',
    description:
      'The cockpit contains the driver in a carbon-fibre survival cell. The Halo — a titanium structure introduced in 2018 — provides critical overhead head protection and withstands loads equivalent to a loaded double-decker bus.',
    technicalNote:
      'The Halo has been credited with protecting drivers in several incidents including Romain Grosjean\'s Bahrain 2020 fire and Zhou Guanyu\'s British GP 2022 rollover.',
    position: { x: 58, y: 35 },
  },
  {
    id: 'floor-diffuser',
    label: 'Floor & Diffuser',
    description:
      'The underfloor is the primary source of aerodynamic downforce in the 2022-generation ground-effect cars. Venturi tunnels accelerate airflow beneath the car, creating low pressure and pulling the car toward the track.',
    technicalNote:
      'The diffuser at the rear transitions airflow from the high-velocity underfloor region to ambient pressure, controlling the expansion and preserving downforce efficiency.',
    position: { x: 62, y: 72 },
  },
  {
    id: 'power-unit',
    label: 'Power Unit',
    description:
      'Since 2014, the "power unit" comprises a 1.6L V6 turbo engine (ICE), Motor Generator Unit — Kinetic (MGU-K), Motor Generator Unit — Heat (MGU-H), Energy Store, turbocharger, and control electronics. Together they produce approximately 1000 bhp.',
    technicalNote:
      'The 2026 regulations remove the MGU-H and raise the MGU-K’s maximum output to 350 kW, subject to the season’s energy-management rules. The FIA’s launch package targeted a more even electrical/combustion power split.',
    position: { x: 65, y: 55 },
  },
];

export const TECH_TOPICS: TechTopic[] = [
  {
    id: 'aero-evolution',
    title: 'Aerodynamic Evolution',
    category: 'aero',
    summary: 'From streamlined torpedo shapes to sophisticated ground-effect machines.',
    points: [
      { year: '1950s', detail: 'Streamlined bodies aimed at minimising drag; no concept of downforce' },
      { year: '1968', detail: 'Aerodynamic wings appear on Lotus 49B and Ferrari 312; downforce concept enters F1' },
      { year: '1977', detail: 'Lotus 78 introduces Venturi-tunnel ground effect; enormous downforce with minimal drag' },
      { year: '1983', detail: 'Flat-bottom rule bans ground-effect skirts; teams focus on wing aerodynamics' },
      { year: '1990s', detail: 'Complex barge board arrays, turning vanes, and multi-element wings reach peak complexity' },
      { year: '2022', detail: 'Ground-effect returns via Venturi tunnels; bargeboards banned; simplified top-body aero' },
      { year: '2026', detail: 'Movable front and rear wings use straight and corner modes; DRS is replaced, with overtaking assistance handled separately' },
    ],
  },
  {
    id: 'engine-evolution',
    title: 'Power Unit Evolution',
    category: 'engine',
    summary: 'From supercharged straight-eights to 1000bhp turbo-hybrid power units.',
    points: [
      { year: '1950', detail: 'Supercharged 1.5L or NA 4.5L; Alfa Romeo 158/159 dominates' },
      { year: '1954', detail: '2.5L naturally aspirated; Mercedes W196 straight-eight returns' },
      { year: '1966', detail: '3.0L formula; Ford-Cosworth DFV V8 debut (1967) democratises F1 engines' },
      { year: '1977', detail: 'Renault introduces turbo; 1.5L turbocharged era builds toward dominance' },
      { year: '1989', detail: 'Turbo ban; 3.5L NA; 3.0L V10 era (1995) produces ~820bhp at 19,000rpm' },
      { year: '2006', detail: '2.4L V8 replaces V10; 19,000rpm limit; ~750bhp' },
      { year: '2014', detail: '1.6L V6 turbo-hybrid PU; MGU-K + MGU-H + ES; ~1000bhp combined' },
      { year: '2026', detail: 'New PU architecture; MGU-H removed; enlarged MGU-K; ~50% electrical target' },
    ],
  },
  {
    id: 'safety-evolution',
    title: 'Safety Through the Decades',
    category: 'safety',
    summary: 'From minimal protection to a comprehensive survival architecture.',
    points: [
      { year: '1950s', detail: 'No seatbelts, no roll bars, cotton overalls; drivers rarely survived major accidents' },
      { year: '1960s', detail: 'Jackie Stewart leads safety campaign; Armco barriers and catch fencing introduced' },
      { year: '1981', detail: 'McLaren MP4/1 — first carbon-fibre monocoque; dramatically improved crashworthiness' },
      { year: '1994', detail: 'Senna and Ratzenberger deaths at Imola; FIA commissions comprehensive safety review' },
      { year: '2003', detail: 'HANS (Head and Neck Support) device made mandatory; prevents head and neck injuries' },
      { year: '2018', detail: 'Halo titanium head protection structure becomes mandatory on all F1 cars' },
      { year: '2020+', detail: 'Biometric gloves, improved medical protocols, faster medical intervention' },
    ],
  },
  {
    id: 'chassis-evolution',
    title: 'Chassis Construction',
    category: 'chassis',
    summary: 'From welded steel tubes to carbon-fibre survival cells.',
    points: [
      { year: '1950s', detail: 'Tubular ladder-frame steel chassis; narrow and flexible' },
      { year: '1959', detail: 'Space-frame multi-tube construction; Cooper and Lotus refine the concept' },
      { year: '1962', detail: 'Lotus 25 introduces aluminium monocoque — stressed-skin shell replaces tube frame' },
      { year: '1981', detail: 'McLaren MP4/1: first carbon-fibre composite monocoque in F1 history' },
      { year: '1990s', detail: 'Carbon-fibre becomes universal; advanced crash structures at front and rear' },
      { year: '2018', detail: 'Halo integrated into survival cell structure; increased front crash structure depth' },
      { year: '2022', detail: 'Improved side-impact structures; enhanced deformable zones; 18-inch wheel regulations' },
    ],
  },
  {
    id: 'tyres-evolution',
    title: 'Tyres and Wheels',
    category: 'tyres',
    summary: 'How rubber and rim design changed racing over seven decades.',
    points: [
      { year: '1950s', detail: 'Narrow cross-ply tyres on small rims; minimal contact patch; low speeds by comparison' },
      { year: '1977', detail: 'Wider slick radial tyres appear; Goodyear and Michelin compete; grip increases sharply' },
      { year: '1998', detail: 'Grooved dry-weather tyres mandated; designed to reduce lateral grip and cornering speeds' },
      { year: '2009', detail: 'Slick tyres return; multiple Pirelli compounds; strategic tyre-management racing' },
      { year: '2011', detail: 'Pirelli becomes sole supplier; intentionally designed tyre degradation shapes strategy' },
      { year: '2022', detail: '18-inch Pirelli tyres introduced; low-profile sidewalls; reduced thermal sensitivity' },
    ],
  },
];
