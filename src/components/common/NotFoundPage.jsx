import React from 'react';
import ErrorPage from './ErrorPage';

export default function NotFoundPage({ onNavigate }) {
  const handleGoHome = () => {
    if (onNavigate) {
      onNavigate('/');
    } else if (typeof window !== 'undefined') {
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  const handleReload = () => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  return (
    <ErrorPage
      code={404}
      onGoHome={handleGoHome}
      onRetry={handleReload}
    />
  );
}
