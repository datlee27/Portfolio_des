import { useContext } from 'react';
import PortfolioContext from './PortfolioContext';

export function usePortfolio() {
  return useContext(PortfolioContext);
}

export default usePortfolio;
