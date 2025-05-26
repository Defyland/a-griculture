import React from 'react';
import styled from 'styled-components';
import { Button } from '../atoms';
import { SearchInput } from '../atoms/SearchInput';

interface FilterOption {
  label: string;
  value: string;
}

interface ViewOption {
  icon: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

interface SearchBarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  placeholder?: string;
  filters?: {
    label: string;
    options: FilterOption[];
    value: string;
    onChange: (value: string) => void;
  }[];
  viewOptions?: ViewOption[];
  onClearSearch?: () => void;
}

const SearchBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const SearchInputContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    max-width: 500px;
  }
`;

const ClearButton = styled(Button)`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  height: 38px;
`;

const ControlsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

const ViewToggleContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-left: auto;
`;

const ViewToggleButton = styled.button<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme, isActive }) => isActive ? theme.colors.primaryAlpha : 'transparent'};
  color: ${({ theme, isActive }) => isActive ? theme.colors.primary : theme.colors.textSecondary};
  border: 1px solid ${({ theme, isActive }) => isActive ? theme.colors.primary : theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background-color: ${({ theme, isActive }) => isActive ? theme.colors.primaryAlpha : theme.colors.backgroundDarker};
  }
`;

const FilterButton = styled.select`
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.small};
  cursor: pointer;
  height: 38px;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const SearchBar: React.FC<SearchBarProps> = ({
  searchValue,
  onSearchChange,
  placeholder = 'Pesquisar...',
  filters,
  viewOptions,
  onClearSearch
}) => {
  return (
    <SearchBarContainer>
      <SearchInputContainer>
        <SearchInput
          type="text"
          value={searchValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value)}
          placeholder={placeholder}
        />
        {searchValue && onClearSearch && (
          <ClearButton
            variant="text"
            onClick={onClearSearch}
          >
            ✕
          </ClearButton>
        )}
      </SearchInputContainer>
      
      {(filters || viewOptions) && (
        <ControlsRow>
          {filters && filters.map((filter, index) => (
            <FilterButton
              key={index}
              value={filter.value}
              onChange={(e) => filter.onChange(e.target.value)}
            >
              <option value="">{filter.label}</option>
              {filter.options.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </FilterButton>
          ))}
          
          {viewOptions && (
            <ViewToggleContainer>
              {viewOptions.map((option, index) => (
                <ViewToggleButton
                  key={index}
                  isActive={option.isActive}
                  onClick={option.onClick}
                >
                  {option.icon} {option.label}
                </ViewToggleButton>
              ))}
            </ViewToggleContainer>
          )}
        </ControlsRow>
      )}
    </SearchBarContainer>
  );
};

export default SearchBar; 