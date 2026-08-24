import styled from 'styled-components';

const FilterWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 12px;
  margin-bottom: 36px;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const FilterButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 18px;
  border-radius: 100px;
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  transition: all 0.2s ease;
  cursor: pointer;
  border: 1px solid ${props => (props.$active ? 'rgba(99, 102, 241, 0.6)' : 'rgba(255, 255, 255, 0.08)')};
  background: ${props => (props.$active ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255, 255, 255, 0.03)')};
  color: ${props => (props.$active ? '#ffffff' : '#94a3b8')};
  box-shadow: ${props => (props.$active ? '0 0 16px rgba(99, 102, 241, 0.3)' : 'none')};

  &:hover {
    background: ${props => (props.$active ? 'rgba(99, 102, 241, 0.25)' : 'rgba(255, 255, 255, 0.07)')};
    color: #ffffff;
    border-color: ${props => (props.$active ? 'rgba(99, 102, 241, 0.8)' : 'rgba(255, 255, 255, 0.2)')};
  }
`;

const BadgeCount = styled.span`
  font-size: 11px;
  padding: 1px 6px;
  border-radius: 10px;
  background: ${props => (props.$active ? '#6366f1' : 'rgba(255, 255, 255, 0.1)')};
  color: ${props => (props.$active ? '#ffffff' : '#94a3b8')};
`;

export default function FilterBar({ categories, activeFilter, onSelectFilter, getCount }) {
  return (
    <FilterWrapper>
      {categories.map((cat) => {
        const count = getCount(cat);
        const isActive = activeFilter === cat;
        return (
          <FilterButton
            key={cat}
            $active={isActive}
            onClick={() => onSelectFilter(cat)}
          >
            <span>{cat}</span>
            <BadgeCount $active={isActive}>{count}</BadgeCount>
          </FilterButton>
        );
      })}
    </FilterWrapper>
  );
}
