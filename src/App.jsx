import React, { useState, useEffect, useCallback } from 'react';
import GlobalStyles from './styles/GlobalStyles';
import Design4App from './designs/design4/Design4App';
import AdminApp from './admin/AdminApp';
import NotFoundPage from './components/common/NotFoundPage';
import GlobalErrorBoundary from './components/common/GlobalErrorBoundary';
import OfflineIndicator from './components/common/OfflineIndicator';
import { PortfolioProvider } from './context/PortfolioContext';

function getRouteFromPath(pathname) {
  const cleanPath = (pathname || '/').trim();
  if (cleanPath === '/admin' || cleanPath.startsWith('/admin/')) return 'admin';
  if (
    cleanPath === '/' ||
    cleanPath === '' ||
    cleanPath === '/about' || cleanPath.startsWith('/about/') ||
    cleanPath === '/work' || cleanPath.startsWith('/work/') ||
    cleanPath === '/blog' || cleanPath.startsWith('/blog/') ||
    cleanPath === '/lab' || cleanPath.startsWith('/lab/')
  ) {
    return 'portfolio';
  }
  return 'not-found';
}

export default function App() {
  const [route, setRoute] = useState(() => {
    if (typeof window !== 'undefined') {
      return getRouteFromPath(window.location.pathname);
    }
    return 'portfolio';
  });

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      setRoute(getRouteFromPath(path));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = useCallback((path) => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
      setRoute(getRouteFromPath(path));
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  }, []);

  return (
    <GlobalErrorBoundary>
      <PortfolioProvider>
        <GlobalStyles />
        <OfflineIndicator />
        {route === 'admin' ? (
          <AdminApp onGoHome={() => handleNavigate('/')} />
        ) : route === 'not-found' ? (
          <NotFoundPage onNavigate={handleNavigate} />
        ) : (
          <Design4App />
        )}
      </PortfolioProvider>
    </GlobalErrorBoundary>
  );
}