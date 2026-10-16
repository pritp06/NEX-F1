# NEX build report

**Developer:** Prit Patel  
**Build date:** 16 October 2026

## Delivered

- React, TypeScript, and Vite single-page site with `/`, `/evolution`, `/compare`, `/technology`, `/sources`, and a custom not-found route.
- Replaced the quiet mineral look with a high-contrast carbon palette, acid-lime and signal-red accents, oversized condensed display type, and mono technical labels.
- Homepage now opens on a scroll-reactive 3D concept car with orbit and zoom controls, animated engineering callouts, and a five-era chapter selector.
- Interactive Three.js / React Three Fiber educational car model with a profiled chassis, drag and keyboard rotation, orbit buttons, zoom buttons, automatic rotation, scroll-linked movement, and generation-based colorways. It is clearly labeled as generic and not to scale.
- Interactive 13-era timeline covering 1950–2026, car comparison selectors and reset, and selectable engineering topics/components.
- Local Wikimedia Commons photographs with linked photographer/license attribution, explicit placeholders where no matching photo is available, and the original generic 2026 SVG.
- Responsive navigation, reduced-motion behavior, focus styles, and a Vercel SPA rewrite.
- Empty root `.env`; `.gitignore` excludes environment files, dependencies, and build output.

## Motion and interaction refinement — 16 October 2026

- Added first-load typography and 3D reveals, scroll-triggered chapter reveals, a page reading-progress bar, and a scroll-linked change in the car’s orbit. The engineering SVG animates airflow paths and its system selectors change the explanation and highlighted detail.
- The car scene mounts only while its hero is near the viewport, is split into its own 3D runtime chunks, uses a capped render density, and unmounts when it leaves the viewport. Drag, arrow-key rotation and visible zoom/orbit buttons work without capturing vertical wheel scrolling.
- Updated shared navigation and the engineering page diagrams to match the new carbon, lime, and red palette. The comparison feature now uses an on-track photograph.
- Added responsive stacking for tablet/mobile headlines after the first browser pass revealed the condensed type overflowing on narrow tablet widths.
- Latest `npm run build` and `npm run lint` both passed. The shared JS entry is 253.14 kB (80.30 kB gzip); the car scene is a separate 6.73 kB chunk, with Three.js renderer modules separated from the app entry. The renderer is loaded only when the hero enters view.
- Latest browser interaction check confirmed that selecting the 2022 era updates its image, year, heading, and selected state; choosing Power Unit changes the engineering heading, explanation, and selected state. Previous inspection covered desktop/mobile layout, the 3D scene, chapter next control, and Evolution, Technology, and Compare routes.

## Verification completed

- `npm run build` — passed (TypeScript and Vite production build; 16 October 2026).
- `npm run lint` — passed with no findings (16 October 2026).
- `npm run test` — not available; `package.json` has no test script.
- Browser inspection confirmed the homepage’s 3D model, year selector, navigation, the timeline, comparison, and technology page. The 2022 era selector and Power Unit control were exercised after the redesign; both update the selected state and related content. Mobile layout was checked at 390px; desktop layout was inspected in the browser.
- Production preview served the app and direct `/evolution` navigation successfully in the earlier verification pass.
- Image files are local; missing matching vehicles use a labeled placeholder rather than a mismatched photograph.
- The 3D runtime is route-lazy and split into vendor chunks; the latest build completes without the oversized-chunk warning.
- Reduced-motion behavior is implemented. No automated WCAG contrast scan or complete requested viewport matrix was available.

## Historical and asset notes

Historical dates and regulation descriptions are linked to FIA and Formula 1 reference pages. The 2026 copy describes the 1.6-litre V6 hybrid continuing, removal of the MGU-H, increased MGU-K output, and active aerodynamic modes replacing DRS; targets are labeled as targets. The 2026 visual is identified as a generic educational illustration, not a specific car or simulation.

Wikimedia image attributions and license links are listed on `/sources`. Some comparison entries intentionally have no matching photograph and display the app fallback. The site does not claim those placeholders are historical photography.

## Remaining limits and deployment

- The requested widths (320 through 1920 px) were not all individually inspected; browser inspection covered desktop and a narrow/mobile viewport. Recheck the full viewport matrix before a high-stakes public launch.
- No automated accessibility test package or test script is configured. Keyboard interactions and reduced-motion code paths were reviewed, but a formal WCAG audit remains outstanding.
- The workspace is not currently a Git repository and no GitHub repository or Vercel deployment has been created.
- To deploy: initialize Git in this folder, create a fresh GitHub repository, add it as `origin`, commit and push the source, then import that repository in Vercel. Vercel can use the detected Vite defaults (`npm run build`, output `dist`). The included `vercel.json` rewrites direct route requests to the SPA entry point. No environment variables are currently required.
