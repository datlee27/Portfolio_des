import React, { useState, useEffect } from 'react';
import GlobalStyles from './styles/GlobalStyles';
import Design4App from './designs/design4/Design4App';
import AdminApp from './admin/AdminApp';
import { PortfolioProvider } from './context/PortfolioContext';

export default function App() {
  const [route, setRoute] = useState(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path === '/admin' || path.startsWith('/admin/')) return 'admin';
    }
    return 'portfolio';
  });

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/admin' || path.startsWith('/admin/')) {
        setRoute('admin');
      } else {
        setRoute('portfolio');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigateHome = () => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', '/');
    }
    setRoute('portfolio');
  };

  return (
    <PortfolioProvider>
      <GlobalStyles />
      {route === 'admin' ? (
        <AdminApp onGoHome={handleNavigateHome} />
      ) : (
        <Design4App />
      )}
    </PortfolioProvider>
  );
}