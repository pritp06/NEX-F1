# NEX build report

**Developer:** Prit Patel  
**Build date:** 18 October 2026

## Delivered

- React, TypeScript, and Vite single-page site with `/`, `/evolution`, `/compare`, `/technology`, `/sources`, and a custom not-found route.
- Warm-white visual system with a `#F4F0E8` canvas, paper-white surfaces, charcoal typography, racing-green controls, signal-red emphasis, oversized condensed display type, and mono technical labels.
- Homepage now opens on a scroll-reactive 3D concept car with orbit and zoom controls, animated engineering callouts, and a five-era chapter selector.
- Interactive Three.js / React Three Fiber educational car model with a profiled chassis, drag and keyboard rotation, orbit buttons, zoom buttons, automatic rotation, scroll-linked movement, and generation-based colorways. It is clearly labeled as generic and not to scale.
- Interactive 13-era timeline covering 1950–2026, car comparison selectors and reset, and selectable engineering topics/components.
- Local Wikimedia Commons photographs with linked photographer/license attribution, explicit placeholders where no matching photo is available, and the original generic 2026 SVG.
- Responsive navigation, reduced-motion behavior, focus styles, and a Vercel SPA rewrite.
- Empty root `.env`; `.gitignore` excludes environment files, dependencies, and build output.

## Motion and interaction refinement — 16 October 2026

- Added first-load typography and 3D reveals, scroll-triggered chapter reveals, a page reading-progress bar, and a scroll-linked change in the car’s orbit. The engineering SVG animates airflow paths and its system selectors change the explanation and highlighted detail.
- The car scene is split into its own 3D runtime chunks and uses a capped render density. Drag, arrow-key rotation and visible zoom/orbit buttons work without capturing vertical wheel scrolling.
- Updated shared navigation and the engineering page diagrams to match the new carbon, lime, and red palette. The comparison feature now uses an on-track photograph.
- Added responsive stacking for tablet/mobile headlines after the first browser pass revealed the condensed type overflowing on narrow tablet widths.
- Latest `npm run build` and `npm run lint` both passed. The shared JS entry is 253.14 kB (80.30 kB gzip); the car scene is a separate 6.73 kB chunk, with Three.js renderer modules separated from the app entry. The renderer was later changed to load only after a visitor activates the hero model (see performance section below).
- Latest browser interaction check confirmed that selecting the 2022 era updates its image, year, heading, and selected state; choosing Power Unit changes the engineering heading, explanation, and selected state. Previous inspection covered desktop/mobile layout, the 3D scene, chapter next control, and Evolution, Technology, and Compare routes.

## Warm-white theme update — 18 October 2026

- Reworked shared background, surface, text, border, button, navigation, focus, and overlay tokens for the warm-white palette. Updated the homepage's individually styled hero, chapter, engineering, comparison, and final sections, plus the fixed desktop/mobile navigation and technical diagram colors.
- Added scroll-to-top behavior on route changes after browser inspection showed route changes could preserve the previous page's scroll position and obscure the next page title.
- Browser checks covered `/`, `/evolution`, `/compare`, `/technology`, `/sources`, and the custom not-found route. Tested the mobile navigation, homepage 2022 era selector, homepage and Technology power-unit selectors, Technology front-wing diagram control, Evolution next-era control, comparison car selector, and comparison reset.
- Inspected warm-white rendering and readable typography in the homepage, Evolution, Technology, Sources, and not-found screenshots. Main text colors reach at least 5.66:1 against the warm canvas, and the core boundary color reaches at least 3.17:1 against the warm canvas and white surfaces. Full automated and viewport-wide contrast audits remain outstanding.
- `npm run build` and `npm run lint` passed on 18 October 2026 after the theme changes.

## Performance improvement — 18 October 2026

- Lighthouse screenshots supplied by the developer showed Performance scores of 81–82 on the deployed site; Accessibility and Best Practices were 100, and SEO was 92. These are the pre-change reference scores, not a measurement of this update.
- The homepage previously mounted the WebGL scene as soon as the hero entered the viewport, so the page-load run downloaded Three.js / React Three Fiber chunks and created a WebGL context. The hero now starts with an original, local 4 KB SVG car poster and loads the 3D scene only after the visitor selects **Explore the interactive 3D model**.
- The 3D canvas is keyboard-focusable, caps its device-pixel ratio at 1.1, and requests the default GPU power preference. The full orbit, rotation, and zoom controls remain available after activation.
- Production bundle structure confirms the 3D renderer remains in separate chunks. The React entry is 253.23 kB (80.34 kB gzip), the homepage module is 14.38 kB (4.82 kB gzip), and the poster is 3.99 kB. These are bundle sizes, not a Lighthouse score.
- A new Lighthouse result was not available in this workspace: Lighthouse CLI is not installed, and the available in-app browser could not connect to the local preview. The expected benefit is lower initial JavaScript transfer and main-thread/WebGL startup work; a score of 95–100 is not verified or guaranteed. Re-run Lighthouse on the deployed production URL in mobile mode to measure the actual result.
- Updated README performance notes to describe the deferred model and document how to measure performance without promising a fixed score.

## Verification completed

- `npm run build` — passed after the performance change (TypeScript and Vite production build; 18 October 2026).
- `npm run lint` — passed with no findings after the performance change (18 October 2026).
- `git diff --check` — clean after the performance change.
- SVG poster — parsed as valid XML; production output includes the 3.99 kB file.
- Production preview — root and direct requests for `/evolution`, `/compare`, `/technology`, `/sources`, and an unknown path returned HTTP 200. The local browser surface did not produce a rendered-DOM check in this run.
- `npm run test` — not available; `package.json` has no test script.
- Browser inspection confirmed all routes, including the custom not-found page. The 2022 era selector, Power Unit control, timeline next button, car selector and reset, and mobile menu were exercised; each updated the selected state and/or content as expected. The current browser viewport was narrow/mobile; a complete requested device-width matrix remains outstanding.
- Production preview served the app and direct `/evolution` navigation successfully in the earlier verification pass.
- Image files are local; missing matching vehicles use a labeled placeholder rather than a mismatched photograph.
- The 3D runtime is route-lazy and split into vendor chunks; the latest build completes without the oversized-chunk warning.
- Reduced-motion behavior is implemented. No automated WCAG contrast scan or complete requested viewport matrix was available.

## Historical and asset notes

Historical dates and regulation descriptions are linked to FIA and Formula 1 reference pages. The 2026 copy describes the 1.6-litre V6 hybrid continuing, removal of the MGU-H, increased MGU-K output, and active aerodynamic modes replacing DRS; targets are labeled as targets. The 2026 visual is identified as a generic educational illustration, not a specific car or simulation.

Wikimedia image attributions and license links are listed on `/sources`. Some comparison entries intentionally have no matching photograph and display the app fallback. The site does not claim those placeholders are historical photography.

## Remaining limits and deployment

- The requested widths (320 through 1920 px) were not all individually inspected; the current browser inspection covered a narrow/mobile viewport at approximately 604 px. Recheck the full viewport matrix before a high-stakes public launch.
- No automated accessibility test package or test script is configured. Keyboard interactions and reduced-motion code paths were reviewed, but a formal WCAG audit remains outstanding.
- The project is connected to `https://github.com/pritp06/NEX-F1` on branch `main`; the warm-white theme commit `895b8bb` was previously pushed. The performance update described above still needs to be committed and pushed.
- No Vercel deployment has been created. To deploy, import the GitHub repository into Vercel and use the Vite defaults (`npm run build`, output `dist`). The included `vercel.json` rewrites direct route requests to the SPA entry point. No environment variables are required.
