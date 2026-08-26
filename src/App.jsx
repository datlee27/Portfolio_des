import { useState, useEffect } from 'react';
import GlobalStyles from './styles/GlobalStyles';
import Design1App from './designs/design1/Design1App';
import Design2App from './designs/design2/Design2App';
import Design3App from './designs/design3/Design3App';
import Design4App from './designs/design4/Design4App';
import DesignSwitcher from './components/DesignSwitcher';

function getInitialDesign() {
  if (typeof window === 'undefined') return 'des1';
  const path = window.location.pathname.toLowerCase();
  const search = new URLSearchParams(window.location.search);
  const designParam = search.get('design');

  if (path.includes('des4') || designParam === '4' || designParam === 'des4') {
    return 'des4';
  }
  if (path.includes('des3') || designParam === '3' || designParam === 'des3') {
    return 'des3';
  }
  if (path.includes('des2') || designParam === '2' || designParam === 'des2') {
    return 'des2';
  }
  return 'des1';
}

export default function App() {
  const [design, setDesign] = useState(getInitialDesign);

  useEffect(() => {
    const handlePopState = () => {
      setDesign(getInitialDesign());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleSelectDesign = (newDesign) => {
    setDesign(newDesign);
    const targetPath = newDesign === 'des4' ? '/des4' : newDesign === 'des3' ? '/des3' : newDesign === 'des2' ? '/des2' : '/des1';
    window.history.pushState(null, '', targetPath);
  };

  const renderActiveDesign = () => {
    switch (design) {
      case 'des4':
        return <Design4App />;
      case 'des3':
        return <Design3App />;
      case 'des2':
        return <Design2App />;
      case 'des1':
      default:
        return <Design1App />;
    }
  };

  return (
    <>
      <GlobalStyles />
      {renderActiveDesign()}
      <DesignSwitcher currentDesign={design} onSelectDesign={handleSelectDesign} />
    </>
  );
}