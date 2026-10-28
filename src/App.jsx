import React, { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import GlobalStyles from './styles/GlobalStyles';
import Design4App from './designs/design4/Design4App';
import GlobalErrorBoundary from './components/common/GlobalErrorBoundary';
import OfflineIndicator from './components/common/OfflineIndicator';
import { PortfolioProvider } from './context/PortfolioContext';

const AdminApp = lazy(() => import('./admin/AdminApp'));
const ErrorPage = lazy(() => import('./components/common/ErrorPage'));

function getRouteInfo(pathname) {
  const cleanPath = (pathname || '/').trim();
  if (cleanPath === '/admin' || cleanPath.startsWith('/admin/')) {
    return { route: 'admin' };
  }
  if (
    cleanPath === '/' ||
    cleanPath === '' ||
    cleanPath === '/about' || cleanPath.startsWith('/about/') ||
    cleanPath === '/work' || cleanPath.startsWith('/work/') ||
    cleanPath === '/blog' || cleanPath.startsWith('/blog/') ||
    cleanPath === '/lab' || cleanPath.startsWith('/lab/')
  ) {
    return { route: 'portfolio' };
  }
  if (cleanPath === '/400') return { route: 'error', code: 400 };
  if (cleanPath === '/403') return { route: 'error', code: 403 };
  if (cleanPath === '/404') return { route: 'error', code: 404 };
  if (cleanPath === '/500') return { route: 'error', code: 500 };
  if (cleanPath.startsWith('/error')) {
    const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
    const codeParam = params ? (params.get('code') || 404) : 404;
    return { route: 'error', code: codeParam };
  }
  return { route: 'error', code: 404 };
}

export default function App() {
  const [routeInfo, setRouteInfo] = useState(() => {
    if (typeof window !== 'undefined') {
      return getRouteInfo(window.location.pathname);
    }
    return { route: 'portfolio' };
  });

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      setRouteInfo(getRouteInfo(path));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = useCallback((path) => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
      setRouteInfo(getRouteInfo(path));
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  }, []);

  return (
    <GlobalErrorBoundary>
      <PortfolioProvider>
        <GlobalStyles />
        <OfflineIndicator />
        {routeInfo.route === 'admin' ? (
          <Suspense fallback={<div style={{ minHeight: '100vh', background: '#0e0f12' }} />}>
            <AdminApp onGoHome={() => handleNavigate('/')} />
          </Suspense>
        ) : routeInfo.route === 'error' ? (
          <Suspense fallback={null}>
            <ErrorPage
              code={routeInfo.code}
              onGoHome={() => handleNavigate('/')}
              onRetry={() => window.location.reload()}
            />
          </Suspense>
        ) : (
          <Design4App />
        )}
      </PortfolioProvider>
    </GlobalErrorBoundary>
  );
}