import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Nav } from './components/Nav/Nav';
import { Footer } from './components/Footer/Footer';

// Lazy-load pages for performance
const Home = lazy(() => import('./pages/Home/Home').then(m => ({ default: m.Home })));
const Evolution = lazy(() => import('./pages/Evolution/Evolution').then(m => ({ default: m.Evolution })));
const Compare = lazy(() => import('./pages/Compare/Compare').then(m => ({ default: m.Compare })));
const Technology = lazy(() => import('./pages/Technology/Technology').then(m => ({ default: m.Technology })));
const Sources = lazy(() => import('./pages/Sources/Sources').then(m => ({ default: m.Sources })));
const NotFound = lazy(() => import('./pages/NotFound/NotFound').then(m => ({ default: m.NotFound })));

function PageLoader() {
  return (
    <div style={{
      minHeight: '60vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--text-muted-readable)',
      fontSize: 'var(--text-sm)',
      letterSpacing: '0.1em',
      textTransform: 'uppercase'
    }}>
      Loading
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
      <Suspense fallback={<PageLoader />} key={location.pathname}>
        <div className="route-transition">
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/evolution" element={<Evolution />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/technology" element={<Technology />} />
          <Route path="/sources" element={<Sources />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </div>
      </Suspense>
  );
}

function AppLayout() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <AnimatedRoutes />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
