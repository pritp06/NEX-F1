# NEX — Formula 1, in motion

NEX is an immersive, interactive visual history of Formula 1 car design from the championship's 1950 beginning through the 2026 regulation generation. It is designed as an editorial portfolio experience: follow the ideas that changed the shape, speed, and safety of the car.

The homepage centers on an interactive 3D concept car and scroll-led story chapters. Historical photography, engineering diagrams, and concise explanations support the experience across the site's timeline, comparison, and technology sections.

## Experience NEX

| Route | What you can explore |
| --- | --- |
| `/` | 3D concept car, interactive era chapters, engineering systems, and routes into the archive |
| `/evolution` | Interactive timeline of major car generations from 1950 to 2026 |
| `/compare` | Select and compare cars from different periods across their design and engineering |
| `/technology` | Explanations of aerodynamics, power units, chassis, tyres, and safety |
| `/sources` | Historical references and photography credits |
| Any unknown route | Custom not-found page |

## Technology

- React 19 and TypeScript
- Vite 8
- React Router for client-side routes
- Three.js with React Three Fiber for the interactive 3D concept car
- Framer Motion and CSS for page, chapter, and interface motion
- CSS Modules and shared CSS tokens for page styling

The Three.js scene and route pages are code-split. The homepage mounts the 3D scene when it approaches the viewport and unmounts it when it leaves, keeping its rendering work scoped to the hero experience.

## Run locally

Requirements: Node.js compatible with the installed Vite version and npm.

```sh
npm install
npm run dev
```

Vite prints a local address after the development server starts. Open that address in a browser. The app has no external API dependency and does not require credentials.

## Available scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local Vite development server |
| `npm run build` | Run the TypeScript project build and create the production site in `dist/` |
| `npm run preview` | Serve the production build locally for review |
| `npm run lint` | Run Oxlint over the project |

There is currently no test script configured in `package.json`.

## Project structure

```text
public/
  images/                 Local historical photos and educational artwork
src/
  components/             Shared navigation, footer, and 3D car scene
  data/                   Era, comparison, and engineering content
  hooks/                  Reduced-motion and intersection-observer hooks
  pages/                  Home, Evolution, Compare, Technology, Sources, NotFound
  styles/                 Shared design tokens, global styles, typography
  App.tsx                 Shared layout and route definitions
  main.tsx                React application entry point
index.html                Document metadata and application mount point
vercel.json               SPA route rewrite for direct links and refreshes
BUILD_REPORT.md           Implementation, verification, and deployment report
```

Historical content is kept separately from page presentation in `src/data/`. Shared colors, spacing, and motion tokens live under `src/styles/`.

## Motion, 3D, and accessibility

- The homepage car can be rotated by dragging or keyboard controls; on-screen orbit and zoom controls are also available.
- Scrolling through the hero changes the car's orientation. Era chapters and engineering topics update the related text and imagery when selected.
- CSS and Framer Motion provide restrained entrance, route, and interaction transitions.
- The site reads the system `prefers-reduced-motion` setting and reduces decorative movement and the 3D scene's automatic and scroll-linked motion.
- Controls use visible focus styling and semantic labels. The design adapts its timeline, navigation, and page layouts for narrow screens.

The 3D car is an original educational concept illustration. It is not a dimensionally accurate model or a replica of a specific regulated car. Engineering diagrams are explanatory illustrations, not aerodynamic or mechanical simulations.

## Historical content and image credits

The timeline and comparison content are maintained in the data files and cite official FIA and Formula 1 material alongside historical references. Regulation details can change as governing documents are updated; the Sources page links to current FIA materials, including the 2026 regulation resources.

Historical photographs are stored locally in `public/images/` so the site does not rely on arbitrary image hotlinks. Photographer, license, and source links are provided on `/sources` where available. The original educational SVG is identified as an illustration, not a photograph of an actual 2026 car.

## Environment configuration

No environment variables are needed to run or build the website. A root `.env` file is present and intentionally empty. Environment files are excluded by `.gitignore`; do not add secrets or expose private values through client-side `VITE_*` variables.

## Production build and Vercel

Create and inspect a local production build:

```sh
npm run build
npm run preview
```

Vite writes static production files to `dist/`. The root `vercel.json` rewrites incoming paths to `/index.html`, allowing client-side routes such as `/evolution` to load directly and survive refreshes.

To publish through Vercel:

1. Create a Git repository for this project and push it to a new GitHub repository.
2. Import that GitHub repository into Vercel.
3. Use Vite's detected settings: build command `npm run build`, output directory `dist`, and no environment variables.
4. Deploy and verify the home page and direct refreshes on `/evolution`, `/compare`, `/technology`, and `/sources`.

No GitHub repository or Vercel deployment is included by this project configuration. See [BUILD_REPORT.md](./BUILD_REPORT.md) for the latest verification status and outstanding checks.
