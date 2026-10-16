// NEX — Car Comparison Data
// Verified specifications for car generation comparisons.

export interface CarSpec {
  id: string;
  name: string;
  years: string;
  chassis: string;
  engine: string;
  power: string;
  weight: string;
  tyres: string;
  aero: string;
  safety: string;
  imageUrl: string;
  imageAlt: string;
  imageCredit?: string;
  color: string;
  facts: string[];
}

export const COMPARISON_CARS: CarSpec[] = [
  {
    id: 'alfa-158',
    name: 'Alfa Romeo 158/159',
    years: '1950–1951',
    chassis: 'Tubular ladder-frame steel; narrow open cockpit',
    engine: 'Supercharged 1.5L straight-8 (Alfetta); 350–425 bhp',
    power: '~350–425 bhp (qualifying)',
    weight: '~700 kg (including driver, fuel)',
    tyres: 'Cross-ply narrow tyres; ~5.5 inches front, 7 inches rear',
    aero: 'Streamlined torpedo body; no downforce concept; purely drag-minimising',
    safety: 'No seatbelt, no roll bar, no crash structure; driver exposure',
    imageUrl: '',
    imageAlt: 'No verified matching photograph is available for this comparison entry',
    imageCredit: 'Illustrative placeholder; no matching car photograph available.',
    color: '#8B4513',
    facts: [
      'Pre-war design adapted for post-war championship',
      'Juan Manuel Fangio and Nino Farina drove for the team',
      'Undefeated in the 1950 season',
    ],
  },
  {
    id: 'lotus-25',
    name: 'Lotus 25',
    years: '1962–1963',
    chassis: 'First monocoque (aluminium stressed-skin) in F1',
    engine: 'Coventry Climax FWMV 1.5L V8; ~175–195 bhp',
    power: '~175–195 bhp',
    weight: '~450 kg (with driver, no fuel)',
    tyres: 'Cross-ply; wider than 1950s but still narrow by modern standards',
    aero: 'Slim, streamlined body; no wings; low frontal area priority',
    safety: 'Seatbelt optional; no roll hoop; monocoque improved crash stiffness versus space frame',
    imageUrl: '/images/f1-1962-lotus-25.jpg',
    imageAlt: 'Lotus 25 at Silverstone Classic 2013',
    imageCredit: 'David Merrett / Wikimedia Commons / CC BY 4.0',
    color: '#1a5276',
    facts: [
      'First monocoque chassis in Formula 1 history',
      'Jim Clark won the 1963 World Championship in the Lotus 25',
      'Colin Chapman\'s radical design; 30% stiffer than any previous F1 car',
    ],
  },
  {
    id: 'lotus-79',
    name: 'Lotus 79',
    years: '1978',
    chassis: 'Aluminium monocoque; full-length side-pod Venturi tunnels with skirts',
    engine: 'Ford-Cosworth DFV 3.0L V8; ~480 bhp',
    power: '~480 bhp',
    weight: '~595 kg (minimum, no fuel)',
    tyres: 'Radial tyres; wider Goodyear slicks; 18 inches front, 20 inches rear',
    aero: 'Ground-effect side pods with sliding skirts; massive aerodynamic downforce from underbody',
    safety: 'Seatbelt, roll hoop; limited fire suppression; crash structures rudimentary',
    imageUrl: '/images/f1-1978-lotus-79.jpg',
    imageAlt: 'Lotus 79 at Goodwood Festival of Speed 2014',
    imageCredit: 'Nic Redhead / Wikimedia Commons / CC BY-SA 2.0',
    color: '#1a2f1a',
    facts: [
      'Most complete realisation of the ground-effect concept in F1',
      'Mario Andretti won the 1978 championship',
      'Side skirts created vacuum beneath car; lateral grip vastly exceeded expectations',
    ],
  },
  {
    id: 'mclaren-mp4-4',
    name: 'McLaren MP4/4',
    years: '1988',
    chassis: 'Carbon-fibre composite monocoque; full safety cell',
    engine: 'Honda RA168E 1.5L V6 turbo; ~685 bhp (race), ~900+ bhp (qualifying)',
    power: '~685 bhp race / 900+ bhp qualifying',
    weight: '~540 kg (minimum with driver)',
    tyres: 'Slick radials; Goodyear; 13-inch rims',
    aero: 'Flat-bottom rule (1983); high front/rear wing elements; side pod radiator packaging optimised',
    safety: 'Carbon-fibre monocoque; seatbelt; full fire suppression system; improved rollover protection',
    imageUrl: '/images/f1-1988-mclaren-mp4-4.jpg',
    imageAlt: 'McLaren MP4/4 at Goodwood Festival of Speed 2008',
    imageCredit: 'Bahnfrend / Wikimedia Commons / CC BY-SA 4.0',
    color: '#c0392b',
    facts: [
      'Won 15 of 16 races in 1988 — the most dominant single season',
      'Senna and Prost drove; the most intense teammate rivalry in F1 history',
      'Designed by Gordon Murray and Steve Nichols',
    ],
  },
  {
    id: 'ferrari-f2002',
    name: 'Ferrari F2002',
    years: '2002–2003',
    chassis: 'Carbon-fibre composite monocoque; advanced crash structures; high nose concept',
    engine: 'Ferrari Tipo 051 3.0L V10; ~820 bhp at 18,000+ rpm',
    power: '~820 bhp at 18,000 rpm',
    weight: '~600 kg (minimum with driver)',
    tyres: 'Grooved dry weather tyres; 13-inch rims; Bridgestone; bridgestone',
    aero: 'High nose; complex front wing; barge boards and turning vanes; Ferrari\'s aerodynamic evolution',
    safety: 'HANS device in use; advanced safety cell; multi-layer fireproof racing suits',
    imageUrl: '',
    imageAlt: 'No verified matching photograph is available for this comparison entry',
    imageCredit: 'Illustrative placeholder; no matching car photograph available.',
    color: '#922b21',
    facts: [
      'Won 15 of 17 races; Schumacher secured title with 6 races remaining',
      'Designed by Rory Byrne; widely considered the best F1 car of the V10 era',
      'Last full season of the V10-grooved-tyre formula',
    ],
  },
  {
    id: 'mercedes-w11',
    name: 'Mercedes W11',
    years: '2020',
    chassis: 'Carbon-fibre composite monocoque; Halo head protection; DAS dual-axis steering',
    engine: '1.6L V6 turbo-hybrid; MGU-K + MGU-H + Energy Store; ~1000 bhp combined',
    power: '~1000 bhp (combined ICE + ERS)',
    weight: '~746 kg (minimum with driver, 2020 regulation)',
    tyres: '13-inch Pirelli; five compounds; multiple thermal management strategies',
    aero: 'Ground-effect-free (no Venturi floor); complex front and rear wing; beam wing; DAS system (banned 2021)',
    safety: 'Halo mandatory (2018+); advanced impact structures; biometric monitoring; improved fire systems',
    imageUrl: '/images/f1-2020-mercedes-w11.jpg',
    imageAlt: 'Lewis Hamilton in the Mercedes W11 during 2020 pre-season testing',
    imageCredit: 'Artes Max / Wikimedia Commons / CC BY-SA 2.0',
    color: '#00897b',
    facts: [
      'Widely considered the most dominant F1 car in the statistical record',
      'Won 13 of 17 races; Hamilton equalled Schumacher\'s 7 world titles',
      'DAS (Dual Axis Steering) exploited a regulation loophole; banned for 2021',
    ],
  },
  {
    id: 'red-bull-rb19',
    name: 'Red Bull RB19',
    years: '2023',
    chassis: 'Carbon-fibre composite; Halo; ground-effect Venturi floor; 18-inch wheels',
    engine: '1.6L V6 turbo-hybrid (RBPTH001); ~1000 bhp combined; Red Bull Powertrains',
    power: '~1000 bhp estimated (combined ICE + ERS)',
    weight: '~798 kg (minimum with driver, 2023 regulation)',
    tyres: '18-inch Pirelli low-profile; six compounds; reduced overheating sensitivity vs 13-inch',
    aero: 'Ground-effect Venturi tunnels; simplified top-body wings; no bargeboards; adjustable rear wing used for DRS in designated zones',
    safety: 'Halo; improved side-impact structures; enhanced biometric gloves; improved medical access protocols',
    imageUrl: '/images/f1-2022-red-bull-rb18.jpg',
    imageAlt: 'Red Bull RB18 (predecessor to RB19) at Bahrain Grand Prix 2022',
    imageCredit: 'David Merrett / Wikimedia Commons / CC BY 4.0',
    color: '#1565c0',
    facts: [
      'Won 21 of 22 races — the most statistically dominant season in F1 history',
      'Verstappen\'s third consecutive championship; fastest on virtually every circuit',
      'Ground-effect aerodynamics from underbody; radically different from 2021 car',
    ],
  },
];

export const COMPARISON_DIMENSIONS = [
  { key: 'chassis', label: 'Chassis' },
  { key: 'engine', label: 'Power Unit' },
  { key: 'power', label: 'Power Output' },
  { key: 'weight', label: 'Weight' },
  { key: 'tyres', label: 'Tyres' },
  { key: 'aero', label: 'Aerodynamics' },
  { key: 'safety', label: 'Safety' },
] as const;
