import React from 'react';
import { Button } from '../atoms';
import type { FilterSearchBarProps } from './types/FilterSearchBar.types';
import {
  Container,
  TopSection,
  ViewToggleContainer,
  ViewToggleButton,
  SearchContainer,
  SearchInput,
  FiltersContainer,
  SortButton,
  FilterSelect
} from './styles/FilterSearchBar.styles';

const FilterSearchBar: React.FC<FilterSearchBarProps> = ({
  searchPlaceholder = "Pesquisar...",
  searchTerm,
  onSearchChange,
  sortOptions = [],
  sortField,
  sortDirection = 'asc',
  onSortChange,
  viewOptions = [],
  currentView,
  onViewChange,
  filterOptions = [],
  filterValues = {},
  onFilterChange,
  searchOnly = false
}) => {
  return (
    <Container>
      <TopSection>
        {viewOptions.length > 0 && onViewChange && (
          <ViewToggleContainer>
            {viewOptions.map(option => (
              <ViewToggleButton
                key={option.id}
                $active={currentView === option.id}
                onClick={() => onViewChange(option.id)}
              >
                <span role="img" aria-label={option.label}>{option.icon}</span> {option.label}
              </ViewToggleButton>
            ))}
          </ViewToggleContainer>
        )}

        <SearchContainer>
          <SearchInput
            type="text"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          
          {searchTerm && (
            <Button 
              variant="text" 
              size="small" 
              onClick={() => onSearchChange('')}
            >
              Limpar
            </Button>
          )}
        </SearchContainer>
      </TopSection>
      
      {!searchOnly && (
        <FiltersContainer>
          {sortOptions.length > 0 && onSortChange && (
            <>
              {sortOptions.map(option => (
                <SortButton
                  key={option.field}
                  $active={sortField === option.field}
                  onClick={() => onSortChange(option.field)}
                >
                  {option.label} {sortField === option.field && (sortDirection === 'asc' ? '↑' : '↓')}
                </SortButton>
              ))}
            </>
          )}
          
          {filterOptions.length > 0 && onFilterChange && (
            <>
              {filterOptions.map(filter => (
                <div key={filter.id}>
                  <FilterSelect
                    value={filterValues[filter.id] || ''}
                    onChange={(e) => onFilterChange(filter.id, e.target.value)}
                  >
                    {filter.options.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </FilterSelect>
                </div>
              ))}
            </>
          )}
        </FiltersContainer>
      )}
    </Container>
  );
};

export default FilterSearchBar; 